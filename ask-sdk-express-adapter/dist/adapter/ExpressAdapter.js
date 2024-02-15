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
exports.ExpressAdapter = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const body_parser_1 = require("body-parser");
const util_1 = require("../util");
const verifier_1 = require("../verifier");
/**
 * Express adapter class
 */
class ExpressAdapter {
    /**
     * Constructor
     *
     * @param {Skill} skill ask-sdk-core custom skill instance
     * @param {boolean} verifySignature boolean flag decide if certificate signature verifier is needed
     * @param {boolean} verifyTimeStamp boolean flag decide if timestamp verifier is needed
     * @param {Verifier[]} verifiers Array of user customized Verifier instances
     */
    constructor(skill, verifySignature = true, verifyTimeStamp = true, verifiers = []) {
        this.skill = skill;
        this.verifiers = verifiers;
        if (!this.skill) {
            throw (0, ask_sdk_core_1.createAskSdkError)(this.constructor.name, 'The input skill cannot be empty');
        }
        skill.appendAdditionalUserAgent('ask-express-adapter');
        if (verifySignature) {
            verifiers.push(new verifier_1.SkillRequestSignatureVerifier());
        }
        if (verifyTimeStamp) {
            verifiers.push(new verifier_1.TimestampVerifier());
        }
    }
    /**
     * Get pre-defined request handlers
     *
     * This function return an array of pre-defined request handlers
     * which are supposed to be registered on users' express application, including:
     * 1: text parser 2: async function to get response envelope after verification, then send result back
     * Example usage: app.post('/', new ExpressAdapter(skill).getASKRequestHandler());
     */
    getRequestHandlers() {
        const requestHandlers = [];
        requestHandlers.push((req, res, next) => {
            if (req.body) {
                res.statusCode = 500;
                res.send('Error in processing request. Do not register any parsers before using the adapter');
                return;
            }
            next();
        });
        requestHandlers.push((0, body_parser_1.text)({
            type: '*/*',
        }));
        requestHandlers.push(async (req, res) => {
            try {
                const responseEnvelope = await (0, util_1.asyncVerifyRequestAndDispatch)(req.headers, req.body, this.skill, this.verifiers);
                res.json(responseEnvelope);
            }
            catch (err) {
                res.statusCode = err.name === 'AskSdk.Request verification failed Error' ? 400 : 500;
                res.send(`${err.name}, ${err.message}`);
            }
        });
        return requestHandlers;
    }
}
exports.ExpressAdapter = ExpressAdapter;
//# sourceMappingURL=ExpressAdapter.js.map