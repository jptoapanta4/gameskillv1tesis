"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var services;
(function (services) {
    /**
     * Class to be used as the base class for the generated service clients.
     */
    var BaseServiceClient = /** @class */ (function () {
        /**
         * Creates new instance of the BaseServiceClient
         * @param {ApiConfiguration} apiConfiguration configuration parameter to provide dependencies to service client instance
         */
        function BaseServiceClient(apiConfiguration) {
            this.requestInterceptors = [];
            this.responseInterceptors = [];
            this.apiConfiguration = apiConfiguration;
        }
        BaseServiceClient.isCodeSuccessful = function (responseCode) {
            return responseCode >= 200 && responseCode < 300;
        };
        BaseServiceClient.buildUrl = function (endpoint, path, queryParameters, pathParameters) {
            var processedEndpoint = endpoint.endsWith('/') ? endpoint.substr(0, endpoint.length - 1) : endpoint;
            var pathWithParams = this.interpolateParams(path, pathParameters);
            var isConstantQueryPresent = pathWithParams.includes('?');
            var queryString = this.buildQueryString(queryParameters, isConstantQueryPresent);
            return processedEndpoint + pathWithParams + queryString;
        };
        BaseServiceClient.interpolateParams = function (path, params) {
            if (!params) {
                return path;
            }
            var result = path;
            params.forEach(function (paramValue, paramName) {
                result = result.replace('{' + paramName + '}', encodeURIComponent(paramValue));
            });
            return result;
        };
        BaseServiceClient.buildQueryString = function (params, isQueryStart) {
            if (!params) {
                return '';
            }
            var sb = [];
            if (isQueryStart) {
                sb.push('&');
            }
            else {
                sb.push('?');
            }
            params.forEach(function (obj) {
                sb.push(encodeURIComponent(obj.key));
                sb.push('=');
                sb.push(encodeURIComponent(obj.value));
                sb.push('&');
            });
            sb.pop();
            return sb.join('');
        };
        /**
         * Sets array of functions that is going to be executed before the request is send
         * @param {Function} requestInterceptor request interceptor function
         * @returns {BaseServiceClient}
         */
        BaseServiceClient.prototype.withRequestInterceptors = function () {
            var requestInterceptors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                requestInterceptors[_i] = arguments[_i];
            }
            for (var _a = 0, requestInterceptors_1 = requestInterceptors; _a < requestInterceptors_1.length; _a++) {
                var interceptor = requestInterceptors_1[_a];
                this.requestInterceptors.push(interceptor);
            }
            return this;
        };
        /**
         * Sets array of functions that is going to be executed after the request is send
         * @param {Function} responseInterceptor response interceptor function
         * @returns {BaseServiceClient}
         */
        BaseServiceClient.prototype.withResponseInterceptors = function () {
            var responseInterceptors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                responseInterceptors[_i] = arguments[_i];
            }
            for (var _a = 0, responseInterceptors_1 = responseInterceptors; _a < responseInterceptors_1.length; _a++) {
                var interceptor = responseInterceptors_1[_a];
                this.responseInterceptors.push(interceptor);
            }
            return this;
        };
        /**
         * Invocation wrapper to implement service operations in generated classes
         * @param method HTTP method, such as 'POST', 'GET', 'DELETE', etc.
         * @param endpoint base API url
         * @param path the path pattern with possible placeholders for path parameters in form {paramName}
         * @param pathParams path parameters collection
         * @param queryParams query parameters collection
         * @param headerParams headers collection
         * @param bodyParam if body parameter is present it is provided here, otherwise null or undefined
         * @param errors maps recognized status codes to messages
         * @param nonJsonBody if the body is in JSON format
         */
        BaseServiceClient.prototype.invoke = function (method, endpoint, path, pathParams, queryParams, headerParams, bodyParam, errors, nonJsonBody) {
            return __awaiter(this, void 0, void 0, function () {
                var request, apiClient, response, _i, _a, requestInterceptor, _b, _c, responseInterceptor, err_1, body, contentType, isJson, apiResponse, err;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            request = {
                                url: BaseServiceClient.buildUrl(endpoint, path, queryParams, pathParams),
                                method: method,
                                headers: headerParams,
                            };
                            if (bodyParam != null) {
                                request.body = nonJsonBody ? bodyParam : JSON.stringify(bodyParam);
                            }
                            apiClient = this.apiConfiguration.apiClient;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 11, , 12]);
                            _i = 0, _a = this.requestInterceptors;
                            _d.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            requestInterceptor = _a[_i];
                            return [4 /*yield*/, requestInterceptor(request)];
                        case 3:
                            _d.sent();
                            _d.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [4 /*yield*/, apiClient.invoke(request)];
                        case 6:
                            response = _d.sent();
                            _b = 0, _c = this.responseInterceptors;
                            _d.label = 7;
                        case 7:
                            if (!(_b < _c.length)) return [3 /*break*/, 10];
                            responseInterceptor = _c[_b];
                            return [4 /*yield*/, responseInterceptor(response)];
                        case 8:
                            _d.sent();
                            _d.label = 9;
                        case 9:
                            _b++;
                            return [3 /*break*/, 7];
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            err_1 = _d.sent();
                            err_1.message = "Call to service failed: " + err_1.message;
                            throw err_1;
                        case 12:
                            try {
                                contentType = response.headers.find(function (h) { return h.key === 'content-type'; });
                                isJson = !contentType || contentType.value.includes('application/json');
                                body = response.body && isJson ? JSON.parse(response.body) : response.body;
                                // converting to undefined if empty string
                                body = body || undefined;
                            }
                            catch (err) {
                                throw new SyntaxError("Failed trying to parse the response body: " + response.body);
                            }
                            if (BaseServiceClient.isCodeSuccessful(response.statusCode)) {
                                apiResponse = {
                                    headers: response.headers,
                                    body: body,
                                    statusCode: response.statusCode,
                                };
                                return [2 /*return*/, apiResponse];
                            }
                            err = new Error('Unknown error');
                            err.name = 'ServiceError';
                            err['statusCode'] = response.statusCode; // tslint:disable-line:no-string-literal
                            err['response'] = body; // tslint:disable-line:no-string-literal
                            if (errors && errors.has(response.statusCode)) {
                                err.message = errors.get(response.statusCode);
                            }
                            throw err;
                    }
                });
            });
        };
        return BaseServiceClient;
    }());
    services.BaseServiceClient = BaseServiceClient;
    /**
     * Class to be used to call Amazon LWA to retrieve access tokens.
     */
    var LwaServiceClient = /** @class */ (function (_super) {
        __extends(LwaServiceClient, _super);
        function LwaServiceClient(options) {
            var _this = _super.call(this, options.apiConfiguration) || this;
            if (options.authenticationConfiguration == null) {
                throw new Error('AuthenticationConfiguration cannot be null or undefined.');
            }
            _this.grantType = options.grantType ? options.grantType : LwaServiceClient.CLIENT_CREDENTIALS_GRANT_TYPE;
            _this.authenticationConfiguration = options.authenticationConfiguration;
            _this.tokenStore = {};
            return _this;
        }
        LwaServiceClient.prototype.getAccessTokenForScope = function (scope) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (scope == null) {
                        throw new Error('Scope cannot be null or undefined.');
                    }
                    return [2 /*return*/, this.getAccessToken(scope)];
                });
            });
        };
        LwaServiceClient.prototype.getAccessToken = function (scope) {
            return __awaiter(this, void 0, void 0, function () {
                var cacheKey, accessToken, accessTokenRequest, accessTokenResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cacheKey = scope ? scope : LwaServiceClient.REFRESH_ACCESS_TOKEN;
                            accessToken = this.tokenStore[cacheKey];
                            if (accessToken && accessToken.expiry > Date.now() + LwaServiceClient.EXPIRY_OFFSET_MILLIS) {
                                return [2 /*return*/, accessToken.token];
                            }
                            accessTokenRequest = {
                                clientId: this.authenticationConfiguration.clientId,
                                clientSecret: this.authenticationConfiguration.clientSecret,
                            };
                            if (scope && this.authenticationConfiguration.refreshToken) {
                                throw new Error('Cannot support both refreshToken and scope.');
                            }
                            else if (scope == null && this.authenticationConfiguration.refreshToken == null) {
                                throw new Error('Either refreshToken or scope must be specified.');
                            }
                            else if (scope == null) {
                                accessTokenRequest.refreshToken = this.authenticationConfiguration.refreshToken;
                            }
                            else {
                                accessTokenRequest.scope = scope;
                            }
                            return [4 /*yield*/, this.generateAccessToken(accessTokenRequest)];
                        case 1:
                            accessTokenResponse = _a.sent();
                            this.tokenStore[cacheKey] = {
                                token: accessTokenResponse.access_token,
                                expiry: Date.now() + accessTokenResponse.expires_in * 1000,
                            };
                            return [2 /*return*/, accessTokenResponse.access_token];
                    }
                });
            });
        };
        LwaServiceClient.prototype.generateAccessToken = function (accessTokenRequest) {
            return __awaiter(this, void 0, void 0, function () {
                var authEndpoint, queryParams, headerParams, pathParams, paramInfo, bodyParams, errorDefinitions, apiResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            authEndpoint = this.authenticationConfiguration.authEndpoint || LwaServiceClient.AUTH_ENDPOINT;
                            if (accessTokenRequest == null) {
                                throw new Error("Required parameter accessTokenRequest was null or undefined when calling generateAccessToken.");
                            }
                            queryParams = [];
                            headerParams = [];
                            headerParams.push({ key: 'Content-type', value: 'application/x-www-form-urlencoded' });
                            pathParams = new Map();
                            paramInfo = this.grantType === LwaServiceClient.LWA_CREDENTIALS_GRANT_TYPE ? "&refresh_token=" + accessTokenRequest.refreshToken : "&scope=" + accessTokenRequest.scope;
                            bodyParams = "grant_type=" + this.grantType + "&client_secret=" + accessTokenRequest.clientSecret + "&client_id=" + accessTokenRequest.clientId + paramInfo;
                            errorDefinitions = new Map();
                            errorDefinitions.set(200, 'Token request sent.');
                            errorDefinitions.set(400, 'Bad Request');
                            errorDefinitions.set(401, 'Authentication Failed');
                            errorDefinitions.set(500, 'Internal Server Error');
                            return [4 /*yield*/, this.invoke('POST', authEndpoint, '/auth/O2/token', pathParams, queryParams, headerParams, bodyParams, errorDefinitions, true)];
                        case 1:
                            apiResponse = _a.sent();
                            return [2 /*return*/, apiResponse.body];
                    }
                });
            });
        };
        LwaServiceClient.EXPIRY_OFFSET_MILLIS = 60000;
        LwaServiceClient.REFRESH_ACCESS_TOKEN = 'refresh_access_token';
        LwaServiceClient.CLIENT_CREDENTIALS_GRANT_TYPE = 'client_credentials';
        LwaServiceClient.LWA_CREDENTIALS_GRANT_TYPE = 'refresh_token';
        LwaServiceClient.AUTH_ENDPOINT = 'https://api.amazon.com';
        return LwaServiceClient;
    }(BaseServiceClient));
    services.LwaServiceClient = LwaServiceClient;
})(services = exports.services || (exports.services = {}));
/**
 * function creating an AskSdk user agent.
 * @param packageVersion
 * @param customUserAgent
 */
function createUserAgent(packageVersion, customUserAgent) {
    var customUserAgentString = customUserAgent ? (' ' + customUserAgent) : '';
    return "ask-node-model/" + packageVersion + " Node/" + process.version + customUserAgentString;
}
exports.createUserAgent = createUserAgent;
(function (services) {
    var datastore;
    (function (datastore) {
        /**
         *
        */
        var DatastoreServiceClient = /** @class */ (function (_super) {
            __extends(DatastoreServiceClient, _super);
            function DatastoreServiceClient(apiConfiguration, authenticationConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.lwaServiceClient = new services.LwaServiceClient({
                    apiConfiguration: apiConfiguration,
                    authenticationConfiguration: authenticationConfiguration,
                });
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Send DataStore commands to Alexa device.
             * @param {services.datastore.v1.CommandsRequest} commandsRequest
             */
            DatastoreServiceClient.prototype.callCommandsV1 = function (commandsRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, accessToken, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                __operationId__ = 'callCommandsV1';
                                // verify required parameter 'commandsRequest' is not null or undefined
                                if (commandsRequest == null) {
                                    throw new Error("Required parameter commandsRequest was null or undefined when calling " + __operationId__ + ".");
                                }
                                queryParams = [];
                                headerParams = [];
                                headerParams.push({ key: 'User-Agent', value: this.userAgent });
                                if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                                    headerParams.push({ key: 'Content-type', value: 'application/json' });
                                }
                                pathParams = new Map();
                                return [4 /*yield*/, this.lwaServiceClient.getAccessTokenForScope("alexa::datastore")];
                            case 1:
                                accessToken = _a.sent();
                                authorizationValue = "Bearer " + accessToken;
                                headerParams.push({ key: "Authorization", value: authorizationValue });
                                resourcePath = "/v1/datastore/commands";
                                errorDefinitions = new Map();
                                errorDefinitions.set(200, "Multiple CommandsDispatchResults in response.");
                                errorDefinitions.set(400, "Request validation fails.");
                                errorDefinitions.set(401, "Not Authorized.");
                                errorDefinitions.set(403, "The skill is not allowed to execute commands.");
                                errorDefinitions.set(429, "The client has made more calls than the allowed limit.");
                                errorDefinitions.set(0, "Unexpected error.");
                                return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, commandsRequest, errorDefinitions)];
                        }
                    });
                });
            };
            /**
             * Send DataStore commands to Alexa device.
             * @param {services.datastore.v1.CommandsRequest} commandsRequest
             */
            DatastoreServiceClient.prototype.commandsV1 = function (commandsRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callCommandsV1(commandsRequest)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Cancel pending DataStore commands.
             * @param {string} queuedResultId A unique identifier to query result for queued delivery for offline devices (DEVICE_UNAVAILABLE).
             */
            DatastoreServiceClient.prototype.callCancelCommandsV1 = function (queuedResultId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, accessToken, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                __operationId__ = 'callCancelCommandsV1';
                                // verify required parameter 'queuedResultId' is not null or undefined
                                if (queuedResultId == null) {
                                    throw new Error("Required parameter queuedResultId was null or undefined when calling " + __operationId__ + ".");
                                }
                                queryParams = [];
                                headerParams = [];
                                headerParams.push({ key: 'User-Agent', value: this.userAgent });
                                pathParams = new Map();
                                pathParams.set('queuedResultId', queuedResultId);
                                return [4 /*yield*/, this.lwaServiceClient.getAccessTokenForScope("alexa::datastore")];
                            case 1:
                                accessToken = _a.sent();
                                authorizationValue = "Bearer " + accessToken;
                                headerParams.push({ key: "Authorization", value: authorizationValue });
                                resourcePath = "/v1/datastore/queue/{queuedResultId}/cancel";
                                errorDefinitions = new Map();
                                errorDefinitions.set(204, "Success. No content.");
                                errorDefinitions.set(400, "Request validation fails.");
                                errorDefinitions.set(401, "Not Authorized.");
                                errorDefinitions.set(403, "The skill is not allowed to call this API commands.");
                                errorDefinitions.set(404, "Unable to find the pending request.");
                                errorDefinitions.set(429, "The client has made more calls than the allowed limit.");
                                errorDefinitions.set(0, "Unexpected error.");
                                return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                        }
                    });
                });
            };
            /**
             * Cancel pending DataStore commands.
             * @param {string} queuedResultId A unique identifier to query result for queued delivery for offline devices (DEVICE_UNAVAILABLE).
             */
            DatastoreServiceClient.prototype.cancelCommandsV1 = function (queuedResultId) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callCancelCommandsV1(queuedResultId)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Query statuses of deliveries to offline devices returned by commands API.
             * @param {string} queuedResultId A unique identifier to query result for queued delivery for offline devices (DEVICE_UNAVAILABLE).
             * @param {number} maxResults Maximum number of CommandsDispatchResult items to return.
             * @param {string} nextToken The value of nextToken in the response to fetch next page. If not specified, the request fetches result for the first page.
             */
            DatastoreServiceClient.prototype.callQueuedResultV1 = function (queuedResultId, maxResults, nextToken) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, maxResultsValues, nextTokenValues, headerParams, pathParams, accessToken, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                __operationId__ = 'callQueuedResultV1';
                                // verify required parameter 'queuedResultId' is not null or undefined
                                if (queuedResultId == null) {
                                    throw new Error("Required parameter queuedResultId was null or undefined when calling " + __operationId__ + ".");
                                }
                                queryParams = [];
                                if (maxResults != null) {
                                    maxResultsValues = Array.isArray(maxResults) ? maxResults : [maxResults];
                                    maxResultsValues.forEach(function (val) { return queryParams.push({ key: 'maxResults', value: val.toString() }); });
                                }
                                if (nextToken != null) {
                                    nextTokenValues = Array.isArray(nextToken) ? nextToken : [nextToken];
                                    nextTokenValues.forEach(function (val) { return queryParams.push({ key: 'nextToken', value: val }); });
                                }
                                headerParams = [];
                                headerParams.push({ key: 'User-Agent', value: this.userAgent });
                                pathParams = new Map();
                                pathParams.set('queuedResultId', queuedResultId);
                                return [4 /*yield*/, this.lwaServiceClient.getAccessTokenForScope("alexa::datastore")];
                            case 1:
                                accessToken = _a.sent();
                                authorizationValue = "Bearer " + accessToken;
                                headerParams.push({ key: "Authorization", value: authorizationValue });
                                resourcePath = "/v1/datastore/queue/{queuedResultId}";
                                errorDefinitions = new Map();
                                errorDefinitions.set(200, "Unordered array of CommandsDispatchResult and pagination details.");
                                errorDefinitions.set(400, "Request validation fails.");
                                errorDefinitions.set(401, "Not Authorized.");
                                errorDefinitions.set(403, "The skill is not allowed to call this API commands.");
                                errorDefinitions.set(429, "The client has made more calls than the allowed limit.");
                                errorDefinitions.set(0, "Unexpected error.");
                                return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                        }
                    });
                });
            };
            /**
             * Query statuses of deliveries to offline devices returned by commands API.
             * @param {string} queuedResultId A unique identifier to query result for queued delivery for offline devices (DEVICE_UNAVAILABLE).
             * @param {number} maxResults Maximum number of CommandsDispatchResult items to return.
             * @param {string} nextToken The value of nextToken in the response to fetch next page. If not specified, the request fetches result for the first page.
             */
            DatastoreServiceClient.prototype.queuedResultV1 = function (queuedResultId, maxResults, nextToken) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callQueuedResultV1(queuedResultId, maxResults, nextToken)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            return DatastoreServiceClient;
        }(services.BaseServiceClient));
        datastore.DatastoreServiceClient = DatastoreServiceClient;
    })(datastore = services.datastore || (services.datastore = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var deviceAddress;
    (function (deviceAddress) {
        /**
         *
        */
        var DeviceAddressServiceClient = /** @class */ (function (_super) {
            __extends(DeviceAddressServiceClient, _super);
            function DeviceAddressServiceClient(apiConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Gets the country and postal code of a device
             * @param {string} deviceId The device Id for which to get the country and postal code
             */
            DeviceAddressServiceClient.prototype.callGetCountryAndPostalCode = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetCountryAndPostalCode';
                        // verify required parameter 'deviceId' is not null or undefined
                        if (deviceId == null) {
                            throw new Error("Required parameter deviceId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('deviceId', deviceId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/devices/{deviceId}/settings/address/countryAndPostalCode";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully get the country and postal code of the deviceId");
                        errorDefinitions.set(204, "No content could be queried out");
                        errorDefinitions.set(403, "The authentication token is invalid or doesn&#39;t have access to the resource");
                        errorDefinitions.set(405, "The method is not supported");
                        errorDefinitions.set(429, "The request is throttled");
                        errorDefinitions.set(0, "Unexpected error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the country and postal code of a device
             * @param {string} deviceId The device Id for which to get the country and postal code
             */
            DeviceAddressServiceClient.prototype.getCountryAndPostalCode = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetCountryAndPostalCode(deviceId)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the address of a device
             * @param {string} deviceId The device Id for which to get the address
             */
            DeviceAddressServiceClient.prototype.callGetFullAddress = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetFullAddress';
                        // verify required parameter 'deviceId' is not null or undefined
                        if (deviceId == null) {
                            throw new Error("Required parameter deviceId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('deviceId', deviceId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/devices/{deviceId}/settings/address";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully get the address of the device");
                        errorDefinitions.set(204, "No content could be queried out");
                        errorDefinitions.set(403, "The authentication token is invalid or doesn&#39;t have access to the resource");
                        errorDefinitions.set(405, "The method is not supported");
                        errorDefinitions.set(429, "The request is throttled");
                        errorDefinitions.set(0, "Unexpected error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the address of a device
             * @param {string} deviceId The device Id for which to get the address
             */
            DeviceAddressServiceClient.prototype.getFullAddress = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetFullAddress(deviceId)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            return DeviceAddressServiceClient;
        }(services.BaseServiceClient));
        deviceAddress.DeviceAddressServiceClient = DeviceAddressServiceClient;
    })(deviceAddress = services.deviceAddress || (services.deviceAddress = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var directive;
    (function (directive) {
        /**
         *
        */
        var DirectiveServiceClient = /** @class */ (function (_super) {
            __extends(DirectiveServiceClient, _super);
            function DirectiveServiceClient(apiConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Send directives to Alexa.
             * @param {services.directive.SendDirectiveRequest} sendDirectiveRequest Represents the request object to send in the payload.
             */
            DirectiveServiceClient.prototype.callEnqueue = function (sendDirectiveRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callEnqueue';
                        // verify required parameter 'sendDirectiveRequest' is not null or undefined
                        if (sendDirectiveRequest == null) {
                            throw new Error("Required parameter sendDirectiveRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                            headerParams.push({ key: 'Content-type', value: 'application/json' });
                        }
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/directives";
                        errorDefinitions = new Map();
                        errorDefinitions.set(204, "Directive sent successfully.");
                        errorDefinitions.set(400, "Directive not valid.");
                        errorDefinitions.set(401, "Not Authorized.");
                        errorDefinitions.set(403, "The skill is not allowed to send directives at the moment.");
                        errorDefinitions.set(0, "Unexpected error.");
                        return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, sendDirectiveRequest, errorDefinitions)];
                    });
                });
            };
            /**
             * Send directives to Alexa.
             * @param {services.directive.SendDirectiveRequest} sendDirectiveRequest Represents the request object to send in the payload.
             */
            DirectiveServiceClient.prototype.enqueue = function (sendDirectiveRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callEnqueue(sendDirectiveRequest)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return DirectiveServiceClient;
        }(services.BaseServiceClient));
        directive.DirectiveServiceClient = DirectiveServiceClient;
    })(directive = services.directive || (services.directive = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var endpointEnumeration;
    (function (endpointEnumeration) {
        /**
         *
        */
        var EndpointEnumerationServiceClient = /** @class */ (function (_super) {
            __extends(EndpointEnumerationServiceClient, _super);
            function EndpointEnumerationServiceClient(apiConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * This API is invoked by the skill to retrieve endpoints connected to the Echo device.
             */
            EndpointEnumerationServiceClient.prototype.callGetEndpoints = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetEndpoints';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/endpoints";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully retrieved the list of connected endpoints.");
                        errorDefinitions.set(400, "Bad request. Returned when a required parameter is not present or badly formatted.");
                        errorDefinitions.set(401, "Unauthenticated. Returned when the request is not authenticated.");
                        errorDefinitions.set(403, "Forbidden. Returned when the request is authenticated but does not have sufficient permission.");
                        errorDefinitions.set(500, "Server Error. Returned when the server encountered an error processing the request.");
                        errorDefinitions.set(503, "Service Unavailable. Returned when the server is not ready to handle the request.");
                        errorDefinitions.set(0, "Unexpected error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * This API is invoked by the skill to retrieve endpoints connected to the Echo device.
             */
            EndpointEnumerationServiceClient.prototype.getEndpoints = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetEndpoints()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            return EndpointEnumerationServiceClient;
        }(services.BaseServiceClient));
        endpointEnumeration.EndpointEnumerationServiceClient = EndpointEnumerationServiceClient;
    })(endpointEnumeration = services.endpointEnumeration || (services.endpointEnumeration = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var listManagement;
    (function (listManagement) {
        /**
         *
        */
        var ListManagementServiceClient = /** @class */ (function (_super) {
            __extends(ListManagementServiceClient, _super);
            function ListManagementServiceClient(apiConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Retrieves the metadata for all customer lists, including the customer’s default lists.
             */
            ListManagementServiceClient.prototype.callGetListsMetadata = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetListsMetadata';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Retrieves the metadata for all customer lists, including the customer’s default lists.
             */
            ListManagementServiceClient.prototype.getListsMetadata = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetListsMetadata()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * This API deletes a customer custom list.
             * @param {string} listId Value of the customer’s listId retrieved from a getListsMetadata call
             */
            ListManagementServiceClient.prototype.callDeleteList = function (listId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callDeleteList';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists/{listId}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("DELETE", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * This API deletes a customer custom list.
             * @param {string} listId Value of the customer’s listId retrieved from a getListsMetadata call
             */
            ListManagementServiceClient.prototype.deleteList = function (listId) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callDeleteList(listId)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * This API deletes an item in the specified list.
             * @param {string} listId The customer’s listId is retrieved from a getListsMetadata call.
             * @param {string} itemId The customer’s itemId is retrieved from a GetList call.
             */
            ListManagementServiceClient.prototype.callDeleteListItem = function (listId, itemId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callDeleteListItem';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'itemId' is not null or undefined
                        if (itemId == null) {
                            throw new Error("Required parameter itemId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        pathParams.set('itemId', itemId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists/{listId}/items/{itemId}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("DELETE", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * This API deletes an item in the specified list.
             * @param {string} listId The customer’s listId is retrieved from a getListsMetadata call.
             * @param {string} itemId The customer’s itemId is retrieved from a GetList call.
             */
            ListManagementServiceClient.prototype.deleteListItem = function (listId, itemId) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callDeleteListItem(listId, itemId)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * This API can be used to retrieve single item with in any list by listId and itemId. This API can read list items from an archived list. Attempting to read list items from a deleted list return an ObjectNotFound 404 error.
             * @param {string} listId Retrieved from a call to getListsMetadata
             * @param {string} itemId itemId within a list is retrieved from a getList call
             */
            ListManagementServiceClient.prototype.callGetListItem = function (listId, itemId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetListItem';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'itemId' is not null or undefined
                        if (itemId == null) {
                            throw new Error("Required parameter itemId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        pathParams.set('itemId', itemId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists/{listId}/items/{itemId}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * This API can be used to retrieve single item with in any list by listId and itemId. This API can read list items from an archived list. Attempting to read list items from a deleted list return an ObjectNotFound 404 error.
             * @param {string} listId Retrieved from a call to getListsMetadata
             * @param {string} itemId itemId within a list is retrieved from a getList call
             */
            ListManagementServiceClient.prototype.getListItem = function (listId, itemId) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetListItem(listId, itemId)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * API used to update an item value or item status.
             * @param {string} listId Customer’s listId
             * @param {string} itemId itemId to be updated in the list
             * @param {services.listManagement.UpdateListItemRequest} updateListItemRequest
             */
            ListManagementServiceClient.prototype.callUpdateListItem = function (listId, itemId, updateListItemRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callUpdateListItem';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'itemId' is not null or undefined
                        if (itemId == null) {
                            throw new Error("Required parameter itemId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'updateListItemRequest' is not null or undefined
                        if (updateListItemRequest == null) {
                            throw new Error("Required parameter updateListItemRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                            headerParams.push({ key: 'Content-type', value: 'application/json' });
                        }
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        pathParams.set('itemId', itemId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists/{listId}/items/{itemId}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(409, "Conflict");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("PUT", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, updateListItemRequest, errorDefinitions)];
                    });
                });
            };
            /**
             * API used to update an item value or item status.
             * @param {string} listId Customer’s listId
             * @param {string} itemId itemId to be updated in the list
             * @param {services.listManagement.UpdateListItemRequest} updateListItemRequest
             */
            ListManagementServiceClient.prototype.updateListItem = function (listId, itemId, updateListItemRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callUpdateListItem(listId, itemId, updateListItemRequest)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * This API creates an item in an active list or in a default list.
             * @param {string} listId The customer’s listId retrieved from a getListsMetadata call.
             * @param {services.listManagement.CreateListItemRequest} createListItemRequest
             */
            ListManagementServiceClient.prototype.callCreateListItem = function (listId, createListItemRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callCreateListItem';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'createListItemRequest' is not null or undefined
                        if (createListItemRequest == null) {
                            throw new Error("Required parameter createListItemRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                            headerParams.push({ key: 'Content-type', value: 'application/json' });
                        }
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists/{listId}/items";
                        errorDefinitions = new Map();
                        errorDefinitions.set(201, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("POST", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, createListItemRequest, errorDefinitions)];
                    });
                });
            };
            /**
             * This API creates an item in an active list or in a default list.
             * @param {string} listId The customer’s listId retrieved from a getListsMetadata call.
             * @param {services.listManagement.CreateListItemRequest} createListItemRequest
             */
            ListManagementServiceClient.prototype.createListItem = function (listId, createListItemRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callCreateListItem(listId, createListItemRequest)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * This API updates a custom list. Only the list name or state can be updated. An Alexa customer can turn an archived list into an active one.
             * @param {string} listId Value of the customer’s listId retrieved from a getListsMetadata call.
             * @param {services.listManagement.UpdateListRequest} updateListRequest
             */
            ListManagementServiceClient.prototype.callUpdateList = function (listId, updateListRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callUpdateList';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'updateListRequest' is not null or undefined
                        if (updateListRequest == null) {
                            throw new Error("Required parameter updateListRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                            headerParams.push({ key: 'Content-type', value: 'application/json' });
                        }
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists/{listId}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "List not found");
                        errorDefinitions.set(409, "Conflict");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("PUT", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, updateListRequest, errorDefinitions)];
                    });
                });
            };
            /**
             * This API updates a custom list. Only the list name or state can be updated. An Alexa customer can turn an archived list into an active one.
             * @param {string} listId Value of the customer’s listId retrieved from a getListsMetadata call.
             * @param {services.listManagement.UpdateListRequest} updateListRequest
             */
            ListManagementServiceClient.prototype.updateList = function (listId, updateListRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callUpdateList(listId, updateListRequest)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Retrieves the list metadata including the items in the list with requested status.
             * @param {string} listId Retrieved from a call to GetListsMetadata to specify the listId in the request path.
             * @param {string} status Specify the status of the list.
             */
            ListManagementServiceClient.prototype.callGetList = function (listId, status) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetList';
                        // verify required parameter 'listId' is not null or undefined
                        if (listId == null) {
                            throw new Error("Required parameter listId was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'status' is not null or undefined
                        if (status == null) {
                            throw new Error("Required parameter status was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('listId', listId);
                        pathParams.set('status', status);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists/{listId}/{status}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(404, "Not Found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Retrieves the list metadata including the items in the list with requested status.
             * @param {string} listId Retrieved from a call to GetListsMetadata to specify the listId in the request path.
             * @param {string} status Specify the status of the list.
             */
            ListManagementServiceClient.prototype.getList = function (listId, status) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetList(listId, status)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * This API creates a custom list. The new list name must be different than any existing list name.
             * @param {services.listManagement.CreateListRequest} createListRequest
             */
            ListManagementServiceClient.prototype.callCreateList = function (createListRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callCreateList';
                        // verify required parameter 'createListRequest' is not null or undefined
                        if (createListRequest == null) {
                            throw new Error("Required parameter createListRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                            headerParams.push({ key: 'Content-type', value: 'application/json' });
                        }
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/householdlists";
                        errorDefinitions = new Map();
                        errorDefinitions.set(201, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(409, "Conflict");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(0, "Internal Server Error");
                        return [2 /*return*/, this.invoke("POST", "https://api.amazonalexa.com/", resourcePath, pathParams, queryParams, headerParams, createListRequest, errorDefinitions)];
                    });
                });
            };
            /**
             * This API creates a custom list. The new list name must be different than any existing list name.
             * @param {services.listManagement.CreateListRequest} createListRequest
             */
            ListManagementServiceClient.prototype.createList = function (createListRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callCreateList(createListRequest)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            return ListManagementServiceClient;
        }(services.BaseServiceClient));
        listManagement.ListManagementServiceClient = ListManagementServiceClient;
    })(listManagement = services.listManagement || (services.listManagement = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var monetization;
    (function (monetization) {
        /**
         *
        */
        var MonetizationServiceClient = /** @class */ (function (_super) {
            __extends(MonetizationServiceClient, _super);
            function MonetizationServiceClient(apiConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Gets In-Skill Products based on user's context for the Skill.
             * @param {string} acceptLanguage User&#39;s locale/language in context
             * @param {string} purchasable Filter products based on whether they are purchasable by the user or not. * &#39;PURCHASABLE&#39; - Products that are purchasable by the user. * &#39;NOT_PURCHASABLE&#39; - Products that are not purchasable by the user.
             * @param {string} entitled Filter products based on whether they are entitled to the user or not. * &#39;ENTITLED&#39; - Products that the user is entitled to. * &#39;NOT_ENTITLED&#39; - Products that the user is not entitled to.
             * @param {string} productType Product type. * &#39;SUBSCRIPTION&#39; - Once purchased, customers will own the content for the subscription period. * &#39;ENTITLEMENT&#39; - Once purchased, customers will own the content forever. * &#39;CONSUMABLE&#39; - Once purchased, customers will be entitled to the content until it is consumed. It can also be re-purchased.
             * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element, the value of which can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that In-Skill Products API understands. Token has expiry of 24 hours.
             * @param {number} maxResults sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 100 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned because maxResults was exceeded, the response contains isTruncated &#x3D; true.
             */
            MonetizationServiceClient.prototype.callGetInSkillProducts = function (acceptLanguage, purchasable, entitled, productType, nextToken, maxResults) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, purchasableValues, entitledValues, productTypeValues, nextTokenValues, maxResultsValues, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetInSkillProducts';
                        // verify required parameter 'acceptLanguage' is not null or undefined
                        if (acceptLanguage == null) {
                            throw new Error("Required parameter acceptLanguage was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        if (purchasable != null) {
                            purchasableValues = Array.isArray(purchasable) ? purchasable : [purchasable];
                            purchasableValues.forEach(function (val) { return queryParams.push({ key: 'purchasable', value: val }); });
                        }
                        if (entitled != null) {
                            entitledValues = Array.isArray(entitled) ? entitled : [entitled];
                            entitledValues.forEach(function (val) { return queryParams.push({ key: 'entitled', value: val }); });
                        }
                        if (productType != null) {
                            productTypeValues = Array.isArray(productType) ? productType : [productType];
                            productTypeValues.forEach(function (val) { return queryParams.push({ key: 'productType', value: val }); });
                        }
                        if (nextToken != null) {
                            nextTokenValues = Array.isArray(nextToken) ? nextToken : [nextToken];
                            nextTokenValues.forEach(function (val) { return queryParams.push({ key: 'nextToken', value: val }); });
                        }
                        if (maxResults != null) {
                            maxResultsValues = Array.isArray(maxResults) ? maxResults : [maxResults];
                            maxResultsValues.forEach(function (val) { return queryParams.push({ key: 'maxResults', value: val.toString() }); });
                        }
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        headerParams.push({ key: 'Accept-Language', value: acceptLanguage });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/users/~current/skills/~current/inSkillProducts";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Returns a list of In-Skill products on success.");
                        errorDefinitions.set(400, "Invalid request");
                        errorDefinitions.set(401, "The authentication token is invalid or doesn&#39;t have access to make this request");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets In-Skill Products based on user's context for the Skill.
             * @param {string} acceptLanguage User&#39;s locale/language in context
             * @param {string} purchasable Filter products based on whether they are purchasable by the user or not. * &#39;PURCHASABLE&#39; - Products that are purchasable by the user. * &#39;NOT_PURCHASABLE&#39; - Products that are not purchasable by the user.
             * @param {string} entitled Filter products based on whether they are entitled to the user or not. * &#39;ENTITLED&#39; - Products that the user is entitled to. * &#39;NOT_ENTITLED&#39; - Products that the user is not entitled to.
             * @param {string} productType Product type. * &#39;SUBSCRIPTION&#39; - Once purchased, customers will own the content for the subscription period. * &#39;ENTITLEMENT&#39; - Once purchased, customers will own the content forever. * &#39;CONSUMABLE&#39; - Once purchased, customers will be entitled to the content until it is consumed. It can also be re-purchased.
             * @param {string} nextToken When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element, the value of which can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that In-Skill Products API understands. Token has expiry of 24 hours.
             * @param {number} maxResults sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 100 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned because maxResults was exceeded, the response contains isTruncated &#x3D; true.
             */
            MonetizationServiceClient.prototype.getInSkillProducts = function (acceptLanguage, purchasable, entitled, productType, nextToken, maxResults) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetInSkillProducts(acceptLanguage, purchasable, entitled, productType, nextToken, maxResults)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Get In-Skill Product information based on user context for the Skill.
             * @param {string} acceptLanguage User&#39;s locale/language in context
             * @param {string} productId Product Id.
             */
            MonetizationServiceClient.prototype.callGetInSkillProduct = function (acceptLanguage, productId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetInSkillProduct';
                        // verify required parameter 'acceptLanguage' is not null or undefined
                        if (acceptLanguage == null) {
                            throw new Error("Required parameter acceptLanguage was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'productId' is not null or undefined
                        if (productId == null) {
                            throw new Error("Required parameter productId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        headerParams.push({ key: 'Accept-Language', value: acceptLanguage });
                        pathParams = new Map();
                        pathParams.set('productId', productId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/users/~current/skills/~current/inSkillProducts/{productId}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Returns an In-Skill Product on success.");
                        errorDefinitions.set(400, "Invalid request.");
                        errorDefinitions.set(401, "The authentication token is invalid or doesn&#39;t have access to make this request");
                        errorDefinitions.set(404, "Requested resource not found.");
                        errorDefinitions.set(500, "Internal Server Error.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Get In-Skill Product information based on user context for the Skill.
             * @param {string} acceptLanguage User&#39;s locale/language in context
             * @param {string} productId Product Id.
             */
            MonetizationServiceClient.prototype.getInSkillProduct = function (acceptLanguage, productId) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetInSkillProduct(acceptLanguage, productId)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Returns transactions of all in skill products purchases of the customer
             * @param {string} acceptLanguage User&#39;s locale/language in context
             * @param {string} productId Product Id.
             * @param {string} status Transaction status for in skill product purchases. * &#39;PENDING_APPROVAL_BY_PARENT&#39; - The transaction is pending approval from parent. * &#39;APPROVED_BY_PARENT&#39; - The transaction was approved by parent and fulfilled successfully.. * &#39;DENIED_BY_PARENT&#39; - The transaction was declined by parent and hence not fulfilled. * &#39;EXPIRED_NO_ACTION_BY_PARENT&#39; - The transaction was expired due to no response from parent and hence not fulfilled. * &#39;ERROR&#39; - The transaction was not fullfiled as there was an error while processing the transaction.
             * @param {string} fromLastModifiedTime Filter transactions based on last modified time stamp, FROM duration in format (UTC ISO 8601) i.e. yyyy-MM-dd&#39;T&#39;HH:mm:ss.SSS&#39;Z&#39;
             * @param {string} toLastModifiedTime Filter transactions based on last modified time stamp, TO duration in format (UTC ISO 8601) i.e. yyyy-MM-dd&#39;T&#39;HH:mm:ss.SSS&#39;Z&#39;
             * @param {string} nextToken When response to this API call is truncated, the response also includes the nextToken in metadata, the value of which can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that In-Skill Products API understands. Token has expiry of 24 hours.
             * @param {number} maxResults sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 100 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned because maxResults was exceeded, the response contains nextToken which can be used to fetch next set of result.
             */
            MonetizationServiceClient.prototype.callGetInSkillProductsTransactions = function (acceptLanguage, productId, status, fromLastModifiedTime, toLastModifiedTime, nextToken, maxResults) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, productIdValues, statusValues, fromLastModifiedTimeValues, toLastModifiedTimeValues, nextTokenValues, maxResultsValues, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetInSkillProductsTransactions';
                        // verify required parameter 'acceptLanguage' is not null or undefined
                        if (acceptLanguage == null) {
                            throw new Error("Required parameter acceptLanguage was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        if (productId != null) {
                            productIdValues = Array.isArray(productId) ? productId : [productId];
                            productIdValues.forEach(function (val) { return queryParams.push({ key: 'productId', value: val }); });
                        }
                        if (status != null) {
                            statusValues = Array.isArray(status) ? status : [status];
                            statusValues.forEach(function (val) { return queryParams.push({ key: 'status', value: val }); });
                        }
                        if (fromLastModifiedTime != null) {
                            fromLastModifiedTimeValues = Array.isArray(fromLastModifiedTime) ? fromLastModifiedTime : [fromLastModifiedTime];
                            fromLastModifiedTimeValues.forEach(function (val) { return queryParams.push({ key: 'fromLastModifiedTime', value: val.toString() }); });
                        }
                        if (toLastModifiedTime != null) {
                            toLastModifiedTimeValues = Array.isArray(toLastModifiedTime) ? toLastModifiedTime : [toLastModifiedTime];
                            toLastModifiedTimeValues.forEach(function (val) { return queryParams.push({ key: 'toLastModifiedTime', value: val.toString() }); });
                        }
                        if (nextToken != null) {
                            nextTokenValues = Array.isArray(nextToken) ? nextToken : [nextToken];
                            nextTokenValues.forEach(function (val) { return queryParams.push({ key: 'nextToken', value: val }); });
                        }
                        if (maxResults != null) {
                            maxResultsValues = Array.isArray(maxResults) ? maxResults : [maxResults];
                            maxResultsValues.forEach(function (val) { return queryParams.push({ key: 'maxResults', value: val.toString() }); });
                        }
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        headerParams.push({ key: 'Accept-Language', value: acceptLanguage });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/users/~current/skills/~current/inSkillProductsTransactions";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Returns a list of transactions of all in skill products purchases in last 30 days on success.");
                        errorDefinitions.set(400, "Invalid request");
                        errorDefinitions.set(401, "The authentication token is invalid or doesn&#39;t have access to make this request");
                        errorDefinitions.set(403, "Forbidden request");
                        errorDefinitions.set(404, "Product id doesn&#39;t exist / invalid / not found.");
                        errorDefinitions.set(412, "Non-Child Directed Skill is not supported.");
                        errorDefinitions.set(429, "The request is throttled.");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Returns transactions of all in skill products purchases of the customer
             * @param {string} acceptLanguage User&#39;s locale/language in context
             * @param {string} productId Product Id.
             * @param {string} status Transaction status for in skill product purchases. * &#39;PENDING_APPROVAL_BY_PARENT&#39; - The transaction is pending approval from parent. * &#39;APPROVED_BY_PARENT&#39; - The transaction was approved by parent and fulfilled successfully.. * &#39;DENIED_BY_PARENT&#39; - The transaction was declined by parent and hence not fulfilled. * &#39;EXPIRED_NO_ACTION_BY_PARENT&#39; - The transaction was expired due to no response from parent and hence not fulfilled. * &#39;ERROR&#39; - The transaction was not fullfiled as there was an error while processing the transaction.
             * @param {string} fromLastModifiedTime Filter transactions based on last modified time stamp, FROM duration in format (UTC ISO 8601) i.e. yyyy-MM-dd&#39;T&#39;HH:mm:ss.SSS&#39;Z&#39;
             * @param {string} toLastModifiedTime Filter transactions based on last modified time stamp, TO duration in format (UTC ISO 8601) i.e. yyyy-MM-dd&#39;T&#39;HH:mm:ss.SSS&#39;Z&#39;
             * @param {string} nextToken When response to this API call is truncated, the response also includes the nextToken in metadata, the value of which can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that In-Skill Products API understands. Token has expiry of 24 hours.
             * @param {number} maxResults sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 100 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned because maxResults was exceeded, the response contains nextToken which can be used to fetch next set of result.
             */
            MonetizationServiceClient.prototype.getInSkillProductsTransactions = function (acceptLanguage, productId, status, fromLastModifiedTime, toLastModifiedTime, nextToken, maxResults) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetInSkillProductsTransactions(acceptLanguage, productId, status, fromLastModifiedTime, toLastModifiedTime, nextToken, maxResults)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Returns whether or not voice purchasing is enabled for the skill
             */
            MonetizationServiceClient.prototype.callGetVoicePurchaseSetting = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetVoicePurchaseSetting';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/users/~current/skills/~current/settings/voicePurchasing.enabled";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Returns a boolean value for voice purchase setting on success.");
                        errorDefinitions.set(400, "Invalid request.");
                        errorDefinitions.set(401, "The authentication token is invalid or doesn&#39;t have access to make this request");
                        errorDefinitions.set(500, "Internal Server Error.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Returns whether or not voice purchasing is enabled for the skill
             */
            MonetizationServiceClient.prototype.getVoicePurchaseSetting = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetVoicePurchaseSetting()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            return MonetizationServiceClient;
        }(services.BaseServiceClient));
        monetization.MonetizationServiceClient = MonetizationServiceClient;
    })(monetization = services.monetization || (services.monetization = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var proactiveEvents;
    (function (proactiveEvents) {
        /**
         *
        */
        var ProactiveEventsServiceClient = /** @class */ (function (_super) {
            __extends(ProactiveEventsServiceClient, _super);
            function ProactiveEventsServiceClient(apiConfiguration, authenticationConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.lwaServiceClient = new services.LwaServiceClient({
                    apiConfiguration: apiConfiguration,
                    authenticationConfiguration: authenticationConfiguration,
                });
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Create a new proactive event in live stage.
             * @param {services.proactiveEvents.CreateProactiveEventRequest} createProactiveEventRequest Request to create a new proactive event.
             */
            ProactiveEventsServiceClient.prototype.callCreateProactiveEvent = function (createProactiveEventRequest, stage) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, accessToken, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                __operationId__ = 'callCreateProactiveEvent';
                                // verify required parameter 'createProactiveEventRequest' is not null or undefined
                                if (createProactiveEventRequest == null) {
                                    throw new Error("Required parameter createProactiveEventRequest was null or undefined when calling " + __operationId__ + ".");
                                }
                                queryParams = [];
                                headerParams = [];
                                headerParams.push({ key: 'User-Agent', value: this.userAgent });
                                if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                                    headerParams.push({ key: 'Content-type', value: 'application/json' });
                                }
                                pathParams = new Map();
                                return [4 /*yield*/, this.lwaServiceClient.getAccessTokenForScope("alexa::proactive_events")];
                            case 1:
                                accessToken = _a.sent();
                                authorizationValue = "Bearer " + accessToken;
                                headerParams.push({ key: "Authorization", value: authorizationValue });
                                resourcePath = "/v1/proactiveEvents";
                                if (stage === 'DEVELOPMENT') {
                                    resourcePath += '/stages/development';
                                }
                                errorDefinitions = new Map();
                                errorDefinitions.set(202, "Request accepted");
                                errorDefinitions.set(400, "A required parameter is not present or is incorrectly formatted, or the requested creation of a resource has already been completed by a previous request. ");
                                errorDefinitions.set(403, "The authentication token is invalid or doesn&#39;t have authentication to access the resource");
                                errorDefinitions.set(409, "A skill attempts to create duplicate events using the same referenceId for the same customer.");
                                errorDefinitions.set(429, "The client has made more calls than the allowed limit.");
                                errorDefinitions.set(500, "The ProactiveEvents service encounters an internal error for a valid request.");
                                errorDefinitions.set(0, "Unexpected error");
                                return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, createProactiveEventRequest, errorDefinitions)];
                        }
                    });
                });
            };
            /**
             * Create a new proactive event in live stage.
             * @param {services.proactiveEvents.CreateProactiveEventRequest} createProactiveEventRequest Request to create a new proactive event.
             */
            ProactiveEventsServiceClient.prototype.createProactiveEvent = function (createProactiveEventRequest, stage) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callCreateProactiveEvent(createProactiveEventRequest, stage)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return ProactiveEventsServiceClient;
        }(services.BaseServiceClient));
        proactiveEvents.ProactiveEventsServiceClient = ProactiveEventsServiceClient;
    })(proactiveEvents = services.proactiveEvents || (services.proactiveEvents = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var reminderManagement;
    (function (reminderManagement) {
        /**
         *
        */
        var ReminderManagementServiceClient = /** @class */ (function (_super) {
            __extends(ReminderManagementServiceClient, _super);
            function ReminderManagementServiceClient(apiConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * This API is invoked by the skill to delete a single reminder.
             * @param {string} alertToken
             */
            ReminderManagementServiceClient.prototype.callDeleteReminder = function (alertToken) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callDeleteReminder';
                        // verify required parameter 'alertToken' is not null or undefined
                        if (alertToken == null) {
                            throw new Error("Required parameter alertToken was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('alertToken', alertToken);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/reminders/{alertToken}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(401, "UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder.");
                        errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("DELETE", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * This API is invoked by the skill to delete a single reminder.
             * @param {string} alertToken
             */
            ReminderManagementServiceClient.prototype.deleteReminder = function (alertToken) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callDeleteReminder(alertToken)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * This API is invoked by the skill to get a single reminder.
             * @param {string} alertToken
             */
            ReminderManagementServiceClient.prototype.callGetReminder = function (alertToken) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetReminder';
                        // verify required parameter 'alertToken' is not null or undefined
                        if (alertToken == null) {
                            throw new Error("Required parameter alertToken was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('alertToken', alertToken);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/reminders/{alertToken}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(401, "UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder.");
                        errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * This API is invoked by the skill to get a single reminder.
             * @param {string} alertToken
             */
            ReminderManagementServiceClient.prototype.getReminder = function (alertToken) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetReminder(alertToken)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * This API is invoked by the skill to update a reminder.
             * @param {string} alertToken
             * @param {services.reminderManagement.ReminderRequest} reminderRequest
             */
            ReminderManagementServiceClient.prototype.callUpdateReminder = function (alertToken, reminderRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callUpdateReminder';
                        // verify required parameter 'alertToken' is not null or undefined
                        if (alertToken == null) {
                            throw new Error("Required parameter alertToken was null or undefined when calling " + __operationId__ + ".");
                        }
                        // verify required parameter 'reminderRequest' is not null or undefined
                        if (reminderRequest == null) {
                            throw new Error("Required parameter reminderRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                            headerParams.push({ key: 'Content-type', value: 'application/json' });
                        }
                        pathParams = new Map();
                        pathParams.set('alertToken', alertToken);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/reminders/{alertToken}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(404, "NotFoundException e.g. Retured when reminder is not found");
                        errorDefinitions.set(409, "UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder.");
                        errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("PUT", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, reminderRequest, errorDefinitions)];
                    });
                });
            };
            /**
             * This API is invoked by the skill to update a reminder.
             * @param {string} alertToken
             * @param {services.reminderManagement.ReminderRequest} reminderRequest
             */
            ReminderManagementServiceClient.prototype.updateReminder = function (alertToken, reminderRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callUpdateReminder(alertToken, reminderRequest)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * This API is invoked by the skill to get a all reminders created by the caller.
             */
            ReminderManagementServiceClient.prototype.callGetReminders = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetReminders';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/reminders";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(401, "UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder.");
                        errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * This API is invoked by the skill to get a all reminders created by the caller.
             */
            ReminderManagementServiceClient.prototype.getReminders = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetReminders()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * This API is invoked by the skill to create a new reminder.
             * @param {services.reminderManagement.ReminderRequest} reminderRequest
             */
            ReminderManagementServiceClient.prototype.callCreateReminder = function (reminderRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callCreateReminder';
                        // verify required parameter 'reminderRequest' is not null or undefined
                        if (reminderRequest == null) {
                            throw new Error("Required parameter reminderRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                            headerParams.push({ key: 'Content-type', value: 'application/json' });
                        }
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/reminders";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(429, "RateExceededException e.g. When the skill is throttled for exceeding the max rate");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(503, "Service Unavailable");
                        errorDefinitions.set(504, "Gateway Timeout");
                        return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, reminderRequest, errorDefinitions)];
                    });
                });
            };
            /**
             * This API is invoked by the skill to create a new reminder.
             * @param {services.reminderManagement.ReminderRequest} reminderRequest
             */
            ReminderManagementServiceClient.prototype.createReminder = function (reminderRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callCreateReminder(reminderRequest)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            return ReminderManagementServiceClient;
        }(services.BaseServiceClient));
        reminderManagement.ReminderManagementServiceClient = ReminderManagementServiceClient;
    })(reminderManagement = services.reminderManagement || (services.reminderManagement = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var skillMessaging;
    (function (skillMessaging) {
        /**
         *
        */
        var SkillMessagingServiceClient = /** @class */ (function (_super) {
            __extends(SkillMessagingServiceClient, _super);
            function SkillMessagingServiceClient(apiConfiguration, authenticationConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.lwaServiceClient = new services.LwaServiceClient({
                    apiConfiguration: apiConfiguration,
                    authenticationConfiguration: authenticationConfiguration,
                });
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Send a message request to a skill for a specified user.
             * @param {string} userId The user Id for the specific user to send the message
             * @param {services.skillMessaging.SendSkillMessagingRequest} sendSkillMessagingRequest Message Request to be sent to the skill.
             */
            SkillMessagingServiceClient.prototype.callSendSkillMessage = function (userId, sendSkillMessagingRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, accessToken, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                __operationId__ = 'callSendSkillMessage';
                                // verify required parameter 'userId' is not null or undefined
                                if (userId == null) {
                                    throw new Error("Required parameter userId was null or undefined when calling " + __operationId__ + ".");
                                }
                                // verify required parameter 'sendSkillMessagingRequest' is not null or undefined
                                if (sendSkillMessagingRequest == null) {
                                    throw new Error("Required parameter sendSkillMessagingRequest was null or undefined when calling " + __operationId__ + ".");
                                }
                                queryParams = [];
                                headerParams = [];
                                headerParams.push({ key: 'User-Agent', value: this.userAgent });
                                if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                                    headerParams.push({ key: 'Content-type', value: 'application/json' });
                                }
                                pathParams = new Map();
                                pathParams.set('userId', userId);
                                return [4 /*yield*/, this.lwaServiceClient.getAccessTokenForScope("alexa:skill_messaging")];
                            case 1:
                                accessToken = _a.sent();
                                authorizationValue = "Bearer " + accessToken;
                                headerParams.push({ key: "Authorization", value: authorizationValue });
                                resourcePath = "/v1/skillmessages/users/{userId}";
                                errorDefinitions = new Map();
                                errorDefinitions.set(202, "Message has been successfully accepted, and will be sent to the skill ");
                                errorDefinitions.set(400, "Data is missing or not valid ");
                                errorDefinitions.set(403, "The skill messaging authentication token is expired or not valid ");
                                errorDefinitions.set(404, "The passed userId does not exist ");
                                errorDefinitions.set(429, "The requester has exceeded their maximum allowable rate of messages ");
                                errorDefinitions.set(500, "The SkillMessaging service encountered an internal error for a valid request. ");
                                errorDefinitions.set(0, "Unexpected error");
                                return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, sendSkillMessagingRequest, errorDefinitions)];
                        }
                    });
                });
            };
            /**
             * Send a message request to a skill for a specified user.
             * @param {string} userId The user Id for the specific user to send the message
             * @param {services.skillMessaging.SendSkillMessagingRequest} sendSkillMessagingRequest Message Request to be sent to the skill.
             */
            SkillMessagingServiceClient.prototype.sendSkillMessage = function (userId, sendSkillMessagingRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callSendSkillMessage(userId, sendSkillMessagingRequest)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return SkillMessagingServiceClient;
        }(services.BaseServiceClient));
        skillMessaging.SkillMessagingServiceClient = SkillMessagingServiceClient;
    })(skillMessaging = services.skillMessaging || (services.skillMessaging = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var timerManagement;
    (function (timerManagement) {
        /**
         *
        */
        var TimerManagementServiceClient = /** @class */ (function (_super) {
            __extends(TimerManagementServiceClient, _super);
            function TimerManagementServiceClient(apiConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Delete all timers created by the skill.
             */
            TimerManagementServiceClient.prototype.callDeleteTimers = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callDeleteTimers';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/timers";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(401, "Unauthorized");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("DELETE", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Delete all timers created by the skill.
             */
            TimerManagementServiceClient.prototype.deleteTimers = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callDeleteTimers()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Get all timers created by the skill.
             */
            TimerManagementServiceClient.prototype.callGetTimers = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetTimers';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/timers";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(401, "Unauthorized");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Get all timers created by the skill.
             */
            TimerManagementServiceClient.prototype.getTimers = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetTimers()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Delete a timer by ID.
             * @param {string} id
             */
            TimerManagementServiceClient.prototype.callDeleteTimer = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callDeleteTimer';
                        // verify required parameter 'id' is not null or undefined
                        if (id == null) {
                            throw new Error("Required parameter id was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('id', id);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/timers/{id}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(401, "Unauthorized");
                        errorDefinitions.set(404, "Timer not found");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("DELETE", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Delete a timer by ID.
             * @param {string} id
             */
            TimerManagementServiceClient.prototype.deleteTimer = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callDeleteTimer(id)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Get timer by ID.
             * @param {string} id
             */
            TimerManagementServiceClient.prototype.callGetTimer = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetTimer';
                        // verify required parameter 'id' is not null or undefined
                        if (id == null) {
                            throw new Error("Required parameter id was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('id', id);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/timers/{id}";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(401, "Unauthorized");
                        errorDefinitions.set(404, "Timer not found");
                        errorDefinitions.set(500, "Internal Server Error");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Get timer by ID.
             * @param {string} id
             */
            TimerManagementServiceClient.prototype.getTimer = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetTimer(id)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Pause a timer.
             * @param {string} id
             */
            TimerManagementServiceClient.prototype.callPauseTimer = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callPauseTimer';
                        // verify required parameter 'id' is not null or undefined
                        if (id == null) {
                            throw new Error("Required parameter id was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('id', id);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/timers/{id}/pause";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(401, "Unauthorized");
                        errorDefinitions.set(404, "Timer not found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(504, "Device offline");
                        return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Pause a timer.
             * @param {string} id
             */
            TimerManagementServiceClient.prototype.pauseTimer = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callPauseTimer(id)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Resume a timer.
             * @param {string} id
             */
            TimerManagementServiceClient.prototype.callResumeTimer = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callResumeTimer';
                        // verify required parameter 'id' is not null or undefined
                        if (id == null) {
                            throw new Error("Required parameter id was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('id', id);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/timers/{id}/resume";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(401, "Unauthorized");
                        errorDefinitions.set(404, "Timer not found");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(504, "Device offline");
                        return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Resume a timer.
             * @param {string} id
             */
            TimerManagementServiceClient.prototype.resumeTimer = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callResumeTimer(id)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Create a new timer.
             * @param {services.timerManagement.TimerRequest} timerRequest
             */
            TimerManagementServiceClient.prototype.callCreateTimer = function (timerRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callCreateTimer';
                        // verify required parameter 'timerRequest' is not null or undefined
                        if (timerRequest == null) {
                            throw new Error("Required parameter timerRequest was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        if (!headerParams.find(function (param) { return param.key.toLowerCase() === 'content-type'; })) {
                            headerParams.push({ key: 'Content-type', value: 'application/json' });
                        }
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v1/alerts/timers";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Success");
                        errorDefinitions.set(400, "Bad Request");
                        errorDefinitions.set(401, "Unauthorized");
                        errorDefinitions.set(403, "Forbidden");
                        errorDefinitions.set(500, "Internal Server Error");
                        errorDefinitions.set(504, "Device offline");
                        return [2 /*return*/, this.invoke("POST", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, timerRequest, errorDefinitions)];
                    });
                });
            };
            /**
             * Create a new timer.
             * @param {services.timerManagement.TimerRequest} timerRequest
             */
            TimerManagementServiceClient.prototype.createTimer = function (timerRequest) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callCreateTimer(timerRequest)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            return TimerManagementServiceClient;
        }(services.BaseServiceClient));
        timerManagement.TimerManagementServiceClient = TimerManagementServiceClient;
    })(timerManagement = services.timerManagement || (services.timerManagement = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    var ups;
    (function (ups) {
        /**
         *
        */
        var UpsServiceClient = /** @class */ (function (_super) {
            __extends(UpsServiceClient, _super);
            function UpsServiceClient(apiConfiguration, customUserAgent) {
                if (customUserAgent === void 0) { customUserAgent = null; }
                var _this = _super.call(this, apiConfiguration) || this;
                _this.userAgent = createUserAgent("" + require('./package.json').version, customUserAgent);
                return _this;
            }
            /**
             * Gets the email address of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:email:read]
             */
            UpsServiceClient.prototype.callGetProfileEmail = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetProfileEmail';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/accounts/~current/settings/Profile.email";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully retrieved the requested information.");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the email address of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:email:read]
             */
            UpsServiceClient.prototype.getProfileEmail = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetProfileEmail()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the given name (first name) of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:given_name:read]
             */
            UpsServiceClient.prototype.callGetProfileGivenName = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetProfileGivenName';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/accounts/~current/settings/Profile.givenName";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully retrieved the requested information.");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the given name (first name) of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:given_name:read]
             */
            UpsServiceClient.prototype.getProfileGivenName = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetProfileGivenName()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the mobile phone number of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:mobile_number:read]
             */
            UpsServiceClient.prototype.callGetProfileMobileNumber = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetProfileMobileNumber';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/accounts/~current/settings/Profile.mobileNumber";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully retrieved the requested information.");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the mobile phone number of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:mobile_number:read]
             */
            UpsServiceClient.prototype.getProfileMobileNumber = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetProfileMobileNumber()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the full name of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:name:read]
             */
            UpsServiceClient.prototype.callGetProfileName = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetProfileName';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/accounts/~current/settings/Profile.name";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully retrieved the requested information.");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the full name of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:name:read]
             */
            UpsServiceClient.prototype.getProfileName = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetProfileName()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the distance measurement unit of the device. Does not require explict customer consent.
             * @param {string} deviceId The device Id
             */
            UpsServiceClient.prototype.callGetSystemDistanceUnits = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetSystemDistanceUnits';
                        // verify required parameter 'deviceId' is not null or undefined
                        if (deviceId == null) {
                            throw new Error("Required parameter deviceId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('deviceId', deviceId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/devices/{deviceId}/settings/System.distanceUnits";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully get the setting");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the distance measurement unit of the device. Does not require explict customer consent.
             * @param {string} deviceId The device Id
             */
            UpsServiceClient.prototype.getSystemDistanceUnits = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetSystemDistanceUnits(deviceId)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the temperature measurement units of the device. Does not require explict customer consent.
             * @param {string} deviceId The device Id
             */
            UpsServiceClient.prototype.callGetSystemTemperatureUnit = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetSystemTemperatureUnit';
                        // verify required parameter 'deviceId' is not null or undefined
                        if (deviceId == null) {
                            throw new Error("Required parameter deviceId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('deviceId', deviceId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/devices/{deviceId}/settings/System.temperatureUnit";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully get the setting");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the temperature measurement units of the device. Does not require explict customer consent.
             * @param {string} deviceId The device Id
             */
            UpsServiceClient.prototype.getSystemTemperatureUnit = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetSystemTemperatureUnit(deviceId)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the time zone of the device. Does not require explict customer consent.
             * @param {string} deviceId The device Id
             */
            UpsServiceClient.prototype.callGetSystemTimeZone = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetSystemTimeZone';
                        // verify required parameter 'deviceId' is not null or undefined
                        if (deviceId == null) {
                            throw new Error("Required parameter deviceId was null or undefined when calling " + __operationId__ + ".");
                        }
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        pathParams.set('deviceId', deviceId);
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/devices/{deviceId}/settings/System.timeZone";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully get the setting");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the time zone of the device. Does not require explict customer consent.
             * @param {string} deviceId The device Id
             */
            UpsServiceClient.prototype.getSystemTimeZone = function (deviceId) {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetSystemTimeZone(deviceId)];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the given name (first name) of the recognized speaker at person-level. Requires speaker consent at person-level for scopes: [alexa::profile:given_name:read]
             */
            UpsServiceClient.prototype.callGetPersonsProfileGivenName = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetPersonsProfileGivenName';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/persons/~current/profile/givenName";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully retrieved the requested information.");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the given name (first name) of the recognized speaker at person-level. Requires speaker consent at person-level for scopes: [alexa::profile:given_name:read]
             */
            UpsServiceClient.prototype.getPersonsProfileGivenName = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetPersonsProfileGivenName()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the mobile phone number of the recognized speaker at person-level. Requires speaker consent at person-level for scopes: [alexa::profile:mobile_number:read]
             */
            UpsServiceClient.prototype.callGetPersonsProfileMobileNumber = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetPersonsProfileMobileNumber';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/persons/~current/profile/mobileNumber";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully retrieved the requested information.");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the mobile phone number of the recognized speaker at person-level. Requires speaker consent at person-level for scopes: [alexa::profile:mobile_number:read]
             */
            UpsServiceClient.prototype.getPersonsProfileMobileNumber = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetPersonsProfileMobileNumber()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            /**
             * Gets the full name of the recognized speaker at person-level. Requires speaker consent at person-level for scopes: [alexa::profile:name:read]
             */
            UpsServiceClient.prototype.callGetPersonsProfileName = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var __operationId__, queryParams, headerParams, pathParams, authorizationValue, resourcePath, errorDefinitions;
                    return __generator(this, function (_a) {
                        __operationId__ = 'callGetPersonsProfileName';
                        queryParams = [];
                        headerParams = [];
                        headerParams.push({ key: 'User-Agent', value: this.userAgent });
                        pathParams = new Map();
                        authorizationValue = "Bearer " + this.apiConfiguration.authorizationValue;
                        headerParams.push({ key: "Authorization", value: authorizationValue });
                        resourcePath = "/v2/persons/~current/profile/name";
                        errorDefinitions = new Map();
                        errorDefinitions.set(200, "Successfully retrieved the requested information.");
                        errorDefinitions.set(204, "The query did not return any results.");
                        errorDefinitions.set(401, "The authentication token is malformed or invalid.");
                        errorDefinitions.set(403, "The authentication token does not have access to resource.");
                        errorDefinitions.set(429, "The skill has been throttled due to an excessive number of requests.");
                        errorDefinitions.set(0, "An unexpected error occurred.");
                        return [2 /*return*/, this.invoke("GET", this.apiConfiguration.apiEndpoint, resourcePath, pathParams, queryParams, headerParams, null, errorDefinitions)];
                    });
                });
            };
            /**
             * Gets the full name of the recognized speaker at person-level. Requires speaker consent at person-level for scopes: [alexa::profile:name:read]
             */
            UpsServiceClient.prototype.getPersonsProfileName = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var apiResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.callGetPersonsProfileName()];
                            case 1:
                                apiResponse = _a.sent();
                                return [2 /*return*/, apiResponse.body];
                        }
                    });
                });
            };
            return UpsServiceClient;
        }(services.BaseServiceClient));
        ups.UpsServiceClient = UpsServiceClient;
    })(ups = services.ups || (services.ups = {}));
})(services = exports.services || (exports.services = {}));
(function (services) {
    /**
     * Helper class that instantiates an ServiceClient implementation automatically resolving its
     * required ApiConfiguration.
     * @export
     * @class ServiceClientFactory
     */
    var ServiceClientFactory = /** @class */ (function () {
        function ServiceClientFactory(apiConfiguration) {
            this.apiConfiguration = apiConfiguration;
        }
        /*
         * Gets an instance of { deviceAddress.DeviceAddressService }.
         * @returns { deviceAddress.DeviceAddressService }
         */
        ServiceClientFactory.prototype.getDeviceAddressServiceClient = function () {
            try {
                return new services.deviceAddress.DeviceAddressServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing DeviceAddressServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { directive.DirectiveService }.
         * @returns { directive.DirectiveService }
         */
        ServiceClientFactory.prototype.getDirectiveServiceClient = function () {
            try {
                return new services.directive.DirectiveServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing DirectiveServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { endpointEnumeration.EndpointEnumerationService }.
         * @returns { endpointEnumeration.EndpointEnumerationService }
         */
        ServiceClientFactory.prototype.getEndpointEnumerationServiceClient = function () {
            try {
                return new services.endpointEnumeration.EndpointEnumerationServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing EndpointEnumerationServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { listManagement.ListManagementService }.
         * @returns { listManagement.ListManagementService }
         */
        ServiceClientFactory.prototype.getListManagementServiceClient = function () {
            try {
                return new services.listManagement.ListManagementServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing ListManagementServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { monetization.MonetizationService }.
         * @returns { monetization.MonetizationService }
         */
        ServiceClientFactory.prototype.getMonetizationServiceClient = function () {
            try {
                return new services.monetization.MonetizationServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing MonetizationServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { reminderManagement.ReminderManagementService }.
         * @returns { reminderManagement.ReminderManagementService }
         */
        ServiceClientFactory.prototype.getReminderManagementServiceClient = function () {
            try {
                return new services.reminderManagement.ReminderManagementServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing ReminderManagementServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { timerManagement.TimerManagementService }.
         * @returns { timerManagement.TimerManagementService }
         */
        ServiceClientFactory.prototype.getTimerManagementServiceClient = function () {
            try {
                return new services.timerManagement.TimerManagementServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing TimerManagementServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        /*
         * Gets an instance of { ups.UpsService }.
         * @returns { ups.UpsService }
         */
        ServiceClientFactory.prototype.getUpsServiceClient = function () {
            try {
                return new services.ups.UpsServiceClient(this.apiConfiguration);
            }
            catch (e) {
                var factoryError = new Error("ServiceClientFactory Error while initializing UpsServiceClient: " + e.message);
                factoryError['name'] = 'ServiceClientFactoryError';
                throw factoryError;
            }
        };
        return ServiceClientFactory;
    }());
    services.ServiceClientFactory = ServiceClientFactory;
})(services = exports.services || (exports.services = {}));
//# sourceMappingURL=index.js.map