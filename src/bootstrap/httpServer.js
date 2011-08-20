/*!
 * Set ups express framework
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
var express = require("express");
var controllers = require("../controllers/main.js");

exports.bootstrap = function (resources) {
    function configureDefault (httpServer) {
        this.use(express.static(__dirname + '/public'));
        this.set('view engine', 'jade');
    };
    function configureProduction (httpServer) {
        this.use(express.errorHandler());
    };
    function configureDevelopment (httpServer) {
        this.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    };

    var httpServer = express.createServer();
    httpServer.configure(configureDefault);
    httpServer.configure('development', configureDevelopment);
    httpServer.configure('production', configureProduction);
    httpServer.get('/', function(req, res) {
        controllers.mainController.home(req, res);
    });
    httpServer.listen(resources.config.httpServer.port);
    return httpServer;
};

