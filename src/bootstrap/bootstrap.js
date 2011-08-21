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
exports.run = function () {
	var resources = {
        config: null,
        logger: null,
	    nami: null,
        mongo: null,
        websocket: null,
        express: null
	};
    var logger = null;
    for (resource in resources) {
        if (logger === null) {
            if (resources.logger !== null) {
                logger = resources.logger.getLogger('Nami.App');
            }
        } else {
            logger.debug('Bootstrapping: ' + resource);
        }
        resources[resource] = require("./" + resource + ".js").bootstrap(resources);
    }
    return resources;
};

