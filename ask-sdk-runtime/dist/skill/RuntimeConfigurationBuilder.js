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
exports.RuntimeConfigurationBuilder = void 0;
const GenericErrorMapper_1 = require("../dispatcher/error/mapper/GenericErrorMapper");
const GenericHandlerAdapter_1 = require("../dispatcher/request/handler/GenericHandlerAdapter");
const GenericRequestHandlerChain_1 = require("../dispatcher/request/handler/GenericRequestHandlerChain");
const GenericRequestMapper_1 = require("../dispatcher/request/mapper/GenericRequestMapper");
const AskSdkUtils_1 = require("../util/AskSdkUtils");
class RuntimeConfigurationBuilder {
    constructor() {
        this.requestHandlerChains = [];
        this.requestInterceptors = [];
        this.responseInterceptors = [];
        this.errorHandlers = [];
    }
    addRequestHandler(matcher, executor) {
        if (typeof matcher !== 'function' || typeof executor !== 'function') {
            throw (0, AskSdkUtils_1.createAskSdkError)(this.constructor.name, `Incompatible matcher type: ${typeof matcher}`);
        }
        this.requestHandlerChains.push(new GenericRequestHandlerChain_1.GenericRequestHandlerChain({
            requestHandler: {
                canHandle: matcher,
                handle: executor,
            },
        }));
        return this;
    }
    addRequestHandlers(...requestHandlers) {
        for (const requestHandler of requestHandlers) {
            this.requestHandlerChains.push(new GenericRequestHandlerChain_1.GenericRequestHandlerChain({
                requestHandler,
            }));
        }
        return this;
    }
    addRequestInterceptors(...executors) {
        for (const executor of executors) {
            switch (typeof executor) {
                case 'object': {
                    this.requestInterceptors.push(executor);
                    break;
                }
                case 'function': {
                    this.requestInterceptors.push({
                        process: executor,
                    });
                    break;
                }
                default: {
                    throw (0, AskSdkUtils_1.createAskSdkError)(this.constructor.name, `Incompatible executor type: ${typeof executor}`);
                }
            }
        }
        return this;
    }
    addResponseInterceptors(...executors) {
        for (const executor of executors) {
            switch (typeof executor) {
                case 'object': {
                    this.responseInterceptors.push(executor);
                    break;
                }
                case 'function': {
                    this.responseInterceptors.push({
                        process: executor,
                    });
                    break;
                }
                default: {
                    throw (0, AskSdkUtils_1.createAskSdkError)('SkillBuilderError', `Incompatible executor type: ${typeof executor}`);
                }
            }
        }
        return this;
    }
    addErrorHandler(matcher, executor) {
        this.errorHandlers.push({
            canHandle: matcher,
            handle: executor,
        });
        return this;
    }
    addErrorHandlers(...errorHandlers) {
        this.errorHandlers.push(...errorHandlers);
        return this;
    }
    getRuntimeConfiguration() {
        const requestMapper = new GenericRequestMapper_1.GenericRequestMapper({
            requestHandlerChains: this.requestHandlerChains,
        });
        const errorMapper = this.errorHandlers.length
            ? new GenericErrorMapper_1.GenericErrorMapper({
                errorHandlers: this.errorHandlers,
            })
            : undefined;
        return {
            requestMappers: [requestMapper],
            handlerAdapters: [new GenericHandlerAdapter_1.GenericHandlerAdapter()],
            errorMapper,
            requestInterceptors: this.requestInterceptors,
            responseInterceptors: this.responseInterceptors,
        };
    }
}
exports.RuntimeConfigurationBuilder = RuntimeConfigurationBuilder;
//# sourceMappingURL=RuntimeConfigurationBuilder.js.map