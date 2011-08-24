/*!
 * Action message.
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
/**
 * @fileoverview Base action class.
 *
 * @author Marcelo Gornstein - http://marcelog.github.com
 * Website: http://marcelog.github.com/Nami
 */
message = require('./message.js');
util = require('util');

/**
 * Base action class. Every action sent to AMI must be one of these.
 * @constructor
 * @param {String} name The name of the action, this is the actual value of the 
 * "Action" key in the action message.
 * @see Message#marshall(String)
 * @augments Message
 */
function Action(name) {
    Action.super_.call(this);
    this.id = new Date().getTime();
    this.set('ActionID', this.id);
    this.set('Action', name);
};

/**
 * Login Action.
 * @constructor
 * @param {String} username The username. The value of the "Username" key.
 * @param {String} secret The password. The value of the "Secret" key.
 * @see Action(String)
 * @augments Action
 */
function Login(username, secret) {
    Login.super_.call(this, 'Login');
    this.set('Username', username);
    this.set('Secret', secret );
};
/**
 * CoreShowChannels Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 */
function CoreShowChannels() {
	CoreShowChannels.super_.call(this, 'CoreShowChannels');
};

/**
 * Ping Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 */
function Ping() {
	Ping.super_.call(this, 'Ping');
};

/**
 * Hangup Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 * @property {String} Channel to hangup.
 */
function Hangup() {
	Ping.super_.call(this, 'Hangup');
};

/**
 * CoreStatus Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 */
function CoreStatus() {
	CoreStatus.super_.call(this, 'CoreStatus');
};

/**
 * Status Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 * @property {String} Optional channel to get status from. Do not set this property
 * if you want to get all channels
 */
function Status() {
	Status.super_.call(this, 'Status');
};

/**
 * DahdiShowChannels Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 */
function DahdiShowChannels() {
	DahdiShowChannels.super_.call(this, 'DahdiShowChannels');
};

/**
 * CoreSettings Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 */
function CoreSettings() {
	CoreSettings.super_.call(this, 'CoreSettings');
};

/**
 * ListCommands Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 */
function ListCommands() {
	ListCommands.super_.call(this, 'ListCommands');
};

/**
 * Logoff Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 */
function Logoff() {
	ListCommands.super_.call(this, 'Logoff');
};

/**
 * AbsoluteTimeout Action.
 * @constructor
 * @see Action(String)
 * @augments Action
 * @property {String} Channel to hangup.
 * @property {Integer} Timeout in seconds.
 */
function AbsoluteTimeout() {
	ListCommands.super_.call(this, 'AbsoluteTimeout');
};

// Inheritance for this module
util.inherits(Action, message.Message);
util.inherits(Login, Action);
util.inherits(Logoff, Action);
util.inherits(Ping, Action);
util.inherits(Hangup, Action);
util.inherits(CoreShowChannels, Action);
util.inherits(CoreStatus, Action);
util.inherits(CoreSettings, Action);
util.inherits(Status, Action);
util.inherits(DahdiShowChannels, Action);
util.inherits(ListCommands, Action);
util.inherits(AbsoluteTimeout, Action);
// Exports for this module
exports.Login = Login;
exports.Logoff = Logoff;
exports.CoreShowChannels = CoreShowChannels;
exports.Ping = Ping;
exports.Hangup = Hangup;
exports.CoreStatus = CoreStatus;
exports.CoreSettings= CoreSettings;
exports.Status = Status;
exports.DahdiShowChannels = DahdiShowChannels;
exports.ListCommands = ListCommands;
exports.AbsoluteTimeout = AbsoluteTimeout;

