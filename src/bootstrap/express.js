/*!
 * Set ups Express.
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
exports.bootstrap = function (resources) {
    var logger = resources.logger.getLogger('Nami.Express');
    var express = require('express');
    var app = express.createServer();
    app.configure(function() {
        logger.debug('configure()');
        app.set('view engine', 'jade');
        app.use(express.static(__dirname + '/../../www'));
    });
    app.configure('development', function() {
        logger.debug('configure(development)');
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });
    app.configure('production', function() {
        logger.debug('configure(production)');
        app.use(express.errorHandler());
    });
    app.get('/', function(req, res){
        res.send('hello world');
    });
    app.listen(resources.config.resources.express.port);
    return app;
};

exports.shutdown = function (resources) {
};

