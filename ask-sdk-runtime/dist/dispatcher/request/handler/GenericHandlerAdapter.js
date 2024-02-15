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
exports.GenericHandlerAdapter = void 0;
/**
 * Generic implementation of {@link HandlerAdapter that supports the {@link RequestHandler}}}
 */
class GenericHandlerAdapter {
    supports(handler) {
        return typeof handler.canHandle === 'function'
            && typeof handler.handle === 'function';
    }
    async execute(input, handler) {
        return handler.handle(input);
    }
}
exports.GenericHandlerAdapter = GenericHandlerAdapter;
//# sourceMappingURL=GenericHandlerAdapter.js.map