/*!
 * Example ami client.
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
var logger = require("log4js").getLogger('Nami.App');
var namiLib = require(__dirname + "/nami.js");
if (process.argv.length !== 6) {
	logger.fatal("Use: <host> <port> <user> <secret>");
	process.exit();
}

var namiConfig = {
    host: process.argv[2],
    port: process.argv[3],
    username: process.argv[4],
    secret: process.argv[5],
    logger: require("log4js").getLogger('Nami.Core')
};

var nami = new namiLib.Nami(namiConfig);
process.on('SIGINT', function () {
    nami.close();
    process.exit();
});
nami.on('namiConnectionClose', function (data) {
    logger.debug('Reconnecting...');
    setTimeout(function () { nami.open(); }, 5000);
});

nami.on('namiInvalidPeer', function (data) {
	logger.fatal("Invalid AMI Salute. Not an AMI?");
	process.exit();
});
nami.on('namiLoginIncorrect', function () {
	logger.fatal("Invalid Credentials");
	process.exit();
});
nami.on('namiEvent', function (event) {
    logger.debug('Got Event: ' + util.inspect(event));
});
function standardSend(action) {
    nami.send(action, function (response) {
        logger.debug(' ---- Response: ' + util.inspect(response));
    });
}

nami.on('namiConnected', function (event) {
    standardSend(new namiLib.Actions.Status());
    standardSend(new namiLib.Actions.CoreStatus());
    standardSend(new namiLib.Actions.CoreSettings());
    standardSend(new namiLib.Actions.Ping());
    standardSend(new namiLib.Actions.CoreShowChannels());
    standardSend(new namiLib.Actions.DahdiShowChannels());
    standardSend(new namiLib.Actions.ListCommands());

    var action = new namiLib.Actions.Hangup();
    action.channel = "SIP/asdasd";
    standardSend(action);

    action = new namiLib.Actions.AbsoluteTimeout();
    action.channel = "SIP/asdasd";
    action.timeout = "3";
    standardSend(action);

    action = new namiLib.Actions.Command();
    action.command = "core show channels";
    standardSend(action);

    action = new namiLib.Actions.ExtensionState();
    action.exten = 1;
    action.context = "default";
    standardSend(action);

    action = new namiLib.Actions.GetConfig();
    action.filename = "sip.conf";
    standardSend(action);

    action = new namiLib.Actions.GetConfigJson();
    action.filename = "sip.conf";
    standardSend(action);
});
nami.open();

