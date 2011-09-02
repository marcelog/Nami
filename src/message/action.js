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
message = require(__dirname + '/message.js');
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
}

/**
 * Login Action.
 * @constructor
 * @param {String} username The username. The value of the "Username" key.
 * @param {String} secret The password. The value of the "Secret" key.
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Login">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Login</a>.
 * @augments Action
 */
function Login(username, secret) {
    Login.super_.call(this, 'Login');
    this.set('Username', username);
    this.set('Secret', secret );
}
/**
 * CoreShowChannels Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_CoreShowChannels">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_CoreShowChannels</a>.
 * @augments Action
 */
function CoreShowChannels() {
	CoreShowChannels.super_.call(this, 'CoreShowChannels');
}

/**
 * Ping Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Ping">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Ping</a>.
 * @augments Action
 */
function Ping() {
	Ping.super_.call(this, 'Ping');
}

/**
 * Hangup Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Hangup">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Hangup</a>.
 * @augments Action
 * @property {String} Channel Channel to hangup.
 */
function Hangup() {
	Hangup.super_.call(this, 'Hangup');
}

/**
 * CoreStatus Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_CoreStatus">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_CoreStatus</a>.
 * @augments Action
 */
function CoreStatus() {
	CoreStatus.super_.call(this, 'CoreStatus');
}

/**
 * Status Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Status">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Status</a>.
 * @augments Action
 * @property {String} Channel Optional channel to get status from. Do not set this property
 * if you want to get all channels
 */
function Status() {
	Status.super_.call(this, 'Status');
}

/**
 * DahdiShowChannels Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIShowChannels">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIShowChannels</a>.
 * @augments Action
 */
function DahdiShowChannels() {
	DahdiShowChannels.super_.call(this, 'DahdiShowChannels');
}

/**
 * CoreSettings Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_CoreSettings">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_CoreSettings</a>.
 * @augments Action
 */
function CoreSettings() {
	CoreSettings.super_.call(this, 'CoreSettings');
}

/**
 * ListCommands Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ListCommands">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ListCommands</a>.
 * @augments Action
 */
function ListCommands() {
	ListCommands.super_.call(this, 'ListCommands');
}

/**
 * Logoff Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Logoff">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Logoff</a>.
 * @augments Action
 */
function Logoff() {
	Logoff.super_.call(this, 'Logoff');
}

/**
 * AbsoluteTimeout Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_AbsoluteTimeout">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_AbsoluteTimeout</a>.
 * @augments Action
 * @property {String} Channel to hangup.
 * @property {Integer} Timeout in seconds.
 */
function AbsoluteTimeout() {
	AbsoluteTimeout.super_.call(this, 'AbsoluteTimeout');
}

/**
 * SIPShowPeer Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SIPshowpeer">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SIPshowpeer</a>.
 * @augments Action
 * @property {String} Peer SIP peer name
 */
function SipShowPeer() {
	SipShowPeer.super_.call(this, 'SIPshowpeer');
}

/**
 * SIPShowRegistry Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SIPshowregistry">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SIPshowregistry</a>.
 * @augments Action
 */
function SipShowRegistry() {
	SipShowRegistry.super_.call(this, 'SIPshowregistry');
}

/**
 * SIPQualifyPeer Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SIPqualifypeer">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SIPqualifypeer</a>.
 * @augments Action
 * @property {String} Peer SIP peer name
 */
function SipQualifyPeer() {
	SipQualifyPeer.super_.call(this, 'SIPqualifypeer');
}

/**
 * SIPPeers Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SIPpeers">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SIPpeers</a>.
 * @augments Action
 */
function SipPeers() {
	SipPeers.super_.call(this, 'SIPpeers');
}

/**
 * AgentLogoff Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_AgentLogoff">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_AgentLogoff</a>.
 * @property {String} Agent Agent name
 * @property {String} Soft Set to true to not hangup existing calls
 * @augments Action
 */
function AgentLogoff() {
	AgentLogoff.super_.call(this, 'AgentLogoff');
}

/**
 * Agents Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Agents">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Agents</a>.
 * @augments Action
 */
function Agents() {
	Agents.super_.call(this, 'Agents');
}

/**
 * AttendedTransfer Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Atxfer">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Atxfer</a>.
 * @property {String} Channel Channel to transfer
 * @property {String} Exten Extension to transfer to
 * @property {String} Context Context to transfer to
 * @property {String} Priority Priority to transfer to
 * @augments Action
 */
function AttendedTransfer() {
	AttendedTransfer.super_.call(this, 'Atxfer');
}

/**
 * ChangeMonitor Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ChangeMonitor">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ChangeMonitor</a>.
 * @property {String} Channel Channel to monitor
 * @property {String} File File where to save the audio
 * @augments Action
 */
function ChangeMonitor() {
	ChangeMonitor.super_.call(this, 'ChangeMonitor');
}

/**
 * Command Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Command">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Command</a>.
 * @property {String} Command Command to send
 * @augments Action
 */
function Command() {
	Command.super_.call(this, 'Command');
}

/**
 * CreateConfig Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_CreateConfig">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_CreateConfig</a>.
 * @property {String} Filename Filename to create
 * @augments Action
 */
function CreateConfig() {
	CreateConfig.super_.call(this, 'CreateConfig');
}

/**
 * DahdiDialOffHook Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIDialOffhook">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIDialOffhook</a>.
 * @property {String} DAHDIChannel Dahdi Channel to use
 * @property {String} Number Number to dial
 * @augments Action
 */
function DahdiDialOffHook() {
	DahdiDialOffHook.super_.call(this, 'DahdiDialOffHook');
}

/**
 * DahdiDndOff Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIDNDOff">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIDNDOff</a>.
 * @property {String} DAHDIChannel Dahdi Channel
 * @augments Action
 */
function DahdiDndOff() {
	DahdiDndOff.super_.call(this, 'DahdiDndOff');
}

/**
 * DahdiDndOn Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIDNDOn">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIDNDOn</a>.
 * @property {String} DAHDIChannel Dahdi Channel
 * @augments Action
 */
function DahdiDndOn() {
	DahdiDndOn.super_.call(this, 'DahdiDndOn');
}

/**
 * DahdiHangup Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIHangup">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIHangup</a>.
 * @property {String} DAHDIChannel Dahdi Channel
 * @augments Action
 */
function DahdiHangup() {
	DahdiHangup.super_.call(this, 'DahdiHangup');
}


// Inheritance for this module
util.inherits(Action, message.Message);
(function() {
    var i;
    var actions = [
        Login,
        Logoff,
        Ping,
        Hangup,
        CoreShowChannels,
        CoreStatus,
        CoreSettings,
        Status,
        DahdiShowChannels,
        ListCommands,
        AbsoluteTimeout,
        SipShowPeer,
        SipShowRegistry,
        SipQualifyPeer,
        SipQualifyPeer,
        SipPeers,
        AgentLogoff,
        Agents,
        AttendedTransfer,
        ChangeMonitor,
        Command,
        CreateConfig,
        DahdiDialOffHook,
        DahdiDndOff,
        DahdiDndOn,
        DahdiHangup
    ];
    for (i in actions) {
        util.inherits(actions[i], Action);
        exports[actions[i].name] = actions[i];
    }
})();


