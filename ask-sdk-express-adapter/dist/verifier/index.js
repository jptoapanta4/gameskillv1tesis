"use strict";
/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampVerifier = exports.SkillRequestSignatureVerifier = exports.REQUIRED_NODE_VERSION = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const crypto = require("crypto");
const client = require("https");
const node_forge_1 = require("node-forge");
const url = require("url");
const semver_1 = require("semver");
const helper_1 = require("./helper");
/**
 * Provide constant value
 * For more info, check `link <https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html#checking-the-signature-of-the-request>
 */
exports.REQUIRED_NODE_VERSION = "12.3.0";
const VALID_SIGNING_CERT_CHAIN_PROTOCOL = 'https:';
const VALID_SIGNING_CERT_CHAIN_URL_HOST_NAME = 's3.amazonaws.com';
const VALID_SIGNING_CERT_CHAIN_URL_PATH_PREFIX = '/echo.api/';
const SIGNATURE_CERT_CHAIN_URL_HEADER = 'SignatureCertChainUrl';
const SIGNATURE_HEADER = 'Signature-256';
const SIGNATURE_FORMAT = 'base64';
const CERT_CHAIN_URL_PORT = 443;
const CERT_CHAIN_DOMAIN = 'echo-api.amazon.com';
const CHARACTER_ENCODING = 'utf8';
const MAXIMUM_NORMAL_REQUEST_TOLERANCE_IN_MILLIS = 150000;
const MAXIMUM_SKILL_EVENT_TOLERANCE_IN_MILLIS = 3600000;
const ALEXA_SKILL_EVENT_LIST = new Set([
    'AlexaSkillEvent.SkillEnabled',
    'AlexaSkillEvent.SkillDisabled',
    'AlexaSkillEvent.SkillPermissionChanged',
    'AlexaSkillEvent.SkillPermissionAccepted',
    'AlexaSkillEvent.SkillAccountLinked'
]);
/**
 * Implementation of Verifier which provides a utility method to verify the signature of a skill request.
 */
class SkillRequestSignatureVerifier {
    constructor() {
        this.certCache = new Map();
    }
    /**
     * Verifies the certificate authenticity.
     *
     * This verifier uses the crypto module pki functions to validate the signature chain in the input request.
     * The verification follows the mechanism explained here :
     * https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html#checking-the-signature-of-the-request
     * @param {string} requestEnvelope Request body of the input POST request in string format
     * @param {IncomingHttpHeaders} headers Headers of the input POST request
     */
    async verify(requestEnvelope, headers) {
        // throw error if signature or signatureCertChainUrl are not present
        let signatureCertChainUrl;
        let signature;
        for (const key of Object.keys(headers)) {
            const keyInLowerCase = key.toLocaleLowerCase();
            if (keyInLowerCase === SIGNATURE_CERT_CHAIN_URL_HEADER.toLowerCase()) {
                signatureCertChainUrl = headers[key];
            }
            else if (keyInLowerCase === SIGNATURE_HEADER.toLowerCase()) {
                signature = headers[key];
            }
        }
        if (!signatureCertChainUrl) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, 'Missing Certificate for the skill request');
        }
        if (!signature) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, 'Missing Signature for the skill request');
        }
        try {
            // retrieve validated certification chain in pem format, then check if signature and request body are matched
            const pemCert = await this._validateUrlAndRetrieveCertChain(signatureCertChainUrl);
            this._validateRequestBody(pemCert, signature, requestEnvelope);
        }
        catch (err) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, err.message);
        }
    }
    /**
     *  Validate Url and retrieve certificate chain
     *
     *  This method validates if the URL is valid and loads
     *  the certificate chain, before returning it.
     * @private
     * @param {string} signatureCertChainUrl URL for retrieving certificate chain
     * @return {Promise<string>}
     */
    async _validateUrlAndRetrieveCertChain(signatureCertChainUrl) {
        this._validateCertificateUrl(signatureCertChainUrl);
        const pemCert = await this._loadCertChain(signatureCertChainUrl);
        return pemCert;
    }
    /**
     * Validate the URL containing the certificate chain
     *
     * This method validates if the URL provided adheres to the format mentioned here :
     * https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html#cert-verify-signature-certificate-url
     * @private
     * @param {string} signatureCertChainUrl URL for retrieving certificate chain
     */
    _validateCertificateUrl(signatureCertChainUrl) {
        const urlObj = url.parse(signatureCertChainUrl);
        // Validate the protocol
        const protocol = urlObj.protocol;
        if (protocol.toLowerCase() !== VALID_SIGNING_CERT_CHAIN_PROTOCOL) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, `SignatureCertChainUrl contains an unsupported protocol ${protocol}.`
                + ` Expecting ${VALID_SIGNING_CERT_CHAIN_PROTOCOL}`);
        }
        // Validate the hostname
        const hostname = urlObj.hostname;
        if (hostname !== VALID_SIGNING_CERT_CHAIN_URL_HOST_NAME) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, `SignatureCertChainUrl has invalid host name: ${hostname}.`
                + ` Expecting ${VALID_SIGNING_CERT_CHAIN_URL_HOST_NAME}`);
        }
        // Validate the path prefix
        const path = urlObj.pathname;
        if (!path.startsWith(VALID_SIGNING_CERT_CHAIN_URL_PATH_PREFIX)) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, `SignatureCertChainUrl has invalid path: ${path}.`
                + ` Expecting the path to start with ${VALID_SIGNING_CERT_CHAIN_URL_PATH_PREFIX}`);
        }
        // Validate the port uses the default of 443 for HTTPS if explicitly defined in the URL
        const port = Number(urlObj.port);
        if (port && port !== CERT_CHAIN_URL_PORT) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, `SignatureCertChainUrl has invalid port: ${port}.`
                + ` Expecting ${CERT_CHAIN_URL_PORT}`);
        }
    }
    /**
     * Load certificate chain
     *
     * This method loads the certificate chain from the certificate
     * cache. If there is a cache miss, the certificate chain is
     * loaded from the certificate URL. If certificate chain is
     * loaded from URL, validate it before return.
     * @private
     * @param {string} signatureCertChainUrl URL for retrieving certificate chain
     * @return {Promise<string>}
     */
    async _loadCertChain(signatureCertChainUrl) {
        // try to get cert chain in cache
        if (this.certCache.has(signatureCertChainUrl)) {
            return this.certCache.get(signatureCertChainUrl);
        }
        // if there is a cache miss, load cert chain from certificate Url
        const pemCert = await this._getCertChainByUrl(signatureCertChainUrl);
        // validate the cert chain loaded from url, if it is valid, update cache
        this._validateCertChain(pemCert);
        this.certCache.set(signatureCertChainUrl, pemCert);
        return pemCert;
    }
    /**
     * Loads the certificate chain from the URL.
     *
     * This method use the validated certificate url to retrieve certificate chain
     * @private
     * @param {string} signatureCertChainUrl URL for retrieving certificate chain
     * @return {Promise<string>}
     */
    _getCertChainByUrl(signatureCertChainUrl) {
        return new Promise((resolve, reject) => {
            const clientRequest = client.get(signatureCertChainUrl, (resp) => {
                let data = '';
                let statusCode;
                if (!resp || resp.statusCode !== 200) {
                    statusCode = resp ? resp.statusCode : 0;
                    reject(new Error(`Unable to load x509 certificate from URL: ${signatureCertChainUrl}. Response status code: ${statusCode}`));
                }
                // A chunk of data has been received.
                resp.setEncoding(CHARACTER_ENCODING);
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                // The whole response has been received.
                resp.on('end', () => {
                    resolve(data);
                });
            });
            clientRequest.on('error', (err) => {
                reject(new Error(err.message));
            });
            clientRequest.end();
        });
    }
    /**
     * Validate certificate chain
     *
     * This method uses the crypto module pki functions to validate the signature chain
     * It checks if the passed in certificate chain is valid,
     * i.e it is not expired and the Alexa domain is present in the
     * SAN extensions of the certificate chain.
     * @private
     * @param {string} pemCert Certificate chain in pem format
     */
    _validateCertChain(pemCert) {
        const cert = node_forge_1.pki.certificateFromPem(pemCert);
        // check the before/after dates on the certificate are still valid for the present time
        const now = new Date().getTime();
        const notAfter = new Date(cert.validity.notAfter).getTime();
        const notBefore = new Date(cert.validity.notBefore).getTime();
        if (!(now <= notAfter && now >= notBefore)) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, 'Signing Certificate expired or not started');
        }
        // verify Echo API's hostname is specified as one of subject alternative names on the signing certificate
        const subjectAltNameExtension = cert.getExtension('subjectAltName');
        const keyName = 'altNames';
        const domainExist = (domain) => domain.value === CERT_CHAIN_DOMAIN;
        if (!subjectAltNameExtension[keyName].some(domainExist)) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, `${CERT_CHAIN_DOMAIN} domain missing in Signature Certificate Chain.`);
        }
        // check whether the node version is greater or equal to 12.3.0
        if (!(0, semver_1.gte)(process.version, exports.REQUIRED_NODE_VERSION)) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, `ask-sdk-express-adapter package require node version ${exports.REQUIRED_NODE_VERSION} or later, your current node version is ${process.version}. Please update your node version.`);
        }
        const caStore = (0, helper_1.generateCAStore)(require('tls').rootCertificates);
        const certChain = (0, helper_1.generateCertificatesArray)(pemCert);
        // Use the pki.verifyCertificateChain function from Node-forge to
        // validate that all certificates in the chain combine to create a chain of trust to a trusted root CA certificate
        // TODO: Implement certificate revocation check which is missed in pki.verifyCertificateChain function
        try {
            node_forge_1.pki.verifyCertificateChain(caStore, certChain);
        }
        catch (e) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, e.message);
        }
    }
    /**
     * Validate the request body hash with signature
     *
     * This method checks if the hash value of the request body
     * matches with the hash value of the signature
     * @param pemCert Certificate chain in pem format
     * @param signature Encrypted signature of the request
     * @param requestEnvelope Request body of the input POST request in string format
     */
    _validateRequestBody(pemCert, signature, requestEnvelope) {
        const verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(requestEnvelope, CHARACTER_ENCODING);
        if (!verifier.verify(pemCert, signature, SIGNATURE_FORMAT)) {
            throw new Error('request body and signature does not match');
        }
    }
}
exports.SkillRequestSignatureVerifier = SkillRequestSignatureVerifier;
/**
 * Implementation of Verifier which provides a utility method to handle
 * the request timestamp verification of the input request.
 */
class TimestampVerifier {
    constructor(tolerance = MAXIMUM_NORMAL_REQUEST_TOLERANCE_IN_MILLIS) {
        if (tolerance > MAXIMUM_NORMAL_REQUEST_TOLERANCE_IN_MILLIS) {
            console.warn(`ask-sdk-express-adapter TimestampVerifier: Provided tolerance value ${tolerance} exceeds the maximum allowed value ${MAXIMUM_NORMAL_REQUEST_TOLERANCE_IN_MILLIS}, Maximum value will be used instead.`);
            tolerance = MAXIMUM_NORMAL_REQUEST_TOLERANCE_IN_MILLIS;
        }
        if (tolerance < 0) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, `Negative tolerance values not supported`);
        }
        this.toleranceInMillis = tolerance;
    }
    /**
     * Verifies the certificate authenticity.
     *
     * The verify method retrieves the request timestamp and check if
     * it falls in the limit set by the tolerance, by checking with
     * the current timestamp. The verification follows the mechanism explained here :
     * https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html#checking-the-signature-of-the-request
     * @param {string} requestEnvelope Request envelope of the input POST request in string format
     * @return {Promise<void>}
     */
    async verify(requestEnvelope) {
        const requestEnvelopeJson = JSON.parse(requestEnvelope);
        if (!(requestEnvelopeJson.request && requestEnvelopeJson.request.timestamp)) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, 'Timestamp is not present in request');
        }
        const requestTimeStamp = new Date(requestEnvelopeJson.request.timestamp);
        const localNow = new Date();
        if (requestTimeStamp.getTime() + this.toleranceInMillis < localNow.getTime()) {
            // If the request is a skill event, check whether the time delta exceed the maximum tolerance for skill event
            if (ALEXA_SKILL_EVENT_LIST.has((0, ask_sdk_core_1.getRequestType)(requestEnvelopeJson))
                && (requestTimeStamp.getTime() + MAXIMUM_SKILL_EVENT_TOLERANCE_IN_MILLIS >= localNow.getTime())) {
                return;
            }
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, 'Timestamp verification failed');
        }
    }
}
exports.TimestampVerifier = TimestampVerifier;
//# sourceMappingURL=index.js.map