/*!
 * Bootstrapping code for all resources.
 *
 * Copyright 2011 Marcelo Gornstein <marcelog@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
exports.shutdown = function () {
    for (listener in exports.listeners) {
        shutdownListener(listener);
    }
    /**
     * TODO: resources should be shutdown in reverse order
     */
    for (resource in exports.resources) {
        shutdownResource(resource);
    }
};

exports.logger = null;

exports.resources = {
    config: null,
    logger: null,
	nami: null,
    mongo: null,
    websocket: null,
    express: null
};

exports.listeners = {
    websocket: null,
    event: null,
    call: null
};

function shutdownResource(resource) {
    if (exports.resources[resource] !== null) {
        exports.logger.debug('Shutting down resource: ' + resource);
        exports.resources[resource]
            = require("./" + resource + ".js").shutdown(exports.resources)
        ;
    }
};

function shutdownListener(listener) {
    if (exports.resources.config.listeners[listener].enable === true) {
        exports.logger.debug('Stopping Listener: ' + listener);
        exports.listeners[listener]
            = require("../listeners/" + listener + ".js").shutdown(exports.resources)
        ;
    }
};

function bootstrapResource(resource) {
    if (exports.logger !== null) {
        exports.logger.debug('Bootstrapping: ' + resource);
    }
    exports.resources[resource]
        = require("./" + resource + ".js").bootstrap(exports.resources)
    ;
};

function bootstrapListener(listener) {
    if (exports.resources.config.listeners[listener].enable === true) {
        exports.logger.debug('Starting listener: ' + listener);
        exports.listeners[listener] = require("../listeners/" + listener + ".js").run(exports.resources);
    }
};

exports.run = function () {
    bootstrapResource('config');
    bootstrapResource('logger');
    exports.logger = exports.resources.logger.getLogger('Nami.App');
    for (resource in exports.resources) {
        if (exports.resources[resource] !== null) {
            continue;
        }
        if (exports.resources.config.resources[resource].enable !== true) {
            continue;
        }
        bootstrapResource(resource);
    }
    for (listener in exports.listeners) {
        bootstrapListener(listener);
    }
};

