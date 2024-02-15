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
exports.GenericRequestDispatcher = void 0;
const AskSdkUtils_1 = require("../util/AskSdkUtils");
/**
 * Generic implementation of {@link RequestDispatcher}.
 * @param Input generic type for input object sent to handler.
 * @param Output generic type for the handler return value.
 */
class GenericRequestDispatcher {
    constructor(options) {
        this.requestMappers = options.requestMappers;
        this.handlerAdapters = options.handlerAdapters;
        this.errorMapper = options.errorMapper;
        this.requestInterceptors = options.requestInterceptors;
        this.responseInterceptors = options.responseInterceptors;
    }
    /**
     * Main entry point for dispatching logic.
     * Dispatches handlerInput to requestHandlers and error, if any, to errorHandlers
     * @param input
     */
    async dispatch(input) {
        let output;
        try {
            // Execute global request interceptors
            if (this.requestInterceptors) {
                for (const requestInterceptor of this.requestInterceptors) {
                    await requestInterceptor.process(input);
                }
            }
            // Dispatch request to handler chain
            output = await this.dispatchRequest(input);
            // Execute global response interceptors
            if (this.responseInterceptors) {
                for (const responseInterceptor of this.responseInterceptors) {
                    await responseInterceptor.process(input, output);
                }
            }
        }
        catch (err) {
            output = await this.dispatchError(input, err);
        }
        return output;
    }
    /**
     * Main logic for request dispatching.
     * @param input
     */
    async dispatchRequest(input) {
        // Get the request handler chain that can handle the request
        let handlerChain;
        for (const requestMapper of this.requestMappers) {
            handlerChain = await requestMapper.getRequestHandlerChain(input);
            if (handlerChain) {
                break;
            }
        }
        if (!handlerChain) {
            throw (0, AskSdkUtils_1.createAskSdkError)(this.constructor.name, `Unable to find a suitable request handler.`);
        }
        // Extract the handler and interceptors from the handler chain
        const handler = handlerChain.getRequestHandler();
        const requestInterceptors = handlerChain.getRequestInterceptors();
        const responseInterceptors = handlerChain.getResponseInterceptors();
        let adapter;
        for (const handlerAdapter of this.handlerAdapters) {
            if (handlerAdapter.supports(handler)) {
                adapter = handlerAdapter;
                break;
            }
        }
        if (!adapter) {
            throw (0, AskSdkUtils_1.createAskSdkError)(this.constructor.name, `Unable to find a suitable handler adapter.`);
        }
        // Execute request interceptors that are local to the handler chain
        if (requestInterceptors) {
            for (const requestInterceptor of requestInterceptors) {
                await requestInterceptor.process(input);
            }
        }
        // Invoke the request handler
        const output = await adapter.execute(input, handler);
        // Execute response interceptors that are local to the handler chain
        if (responseInterceptors) {
            for (const responseInterceptor of responseInterceptors) {
                await responseInterceptor.process(input, output);
            }
        }
        return output;
    }
    /**
     * Main logic for error dispatching.
     * @param input
     * @param error
     */
    async dispatchError(input, error) {
        if (this.errorMapper) {
            const handler = await this.errorMapper.getErrorHandler(input, error);
            if (handler) {
                return handler.handle(input, error);
            }
        }
        throw error;
    }
}
exports.GenericRequestDispatcher = GenericRequestDispatcher;
//# sourceMappingURL=GenericRequestDispatcher.js.map