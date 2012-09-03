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
    this.id = ActionUniqueId();
    this.set('ActionID', this.id);
    this.set('Action', name);
}

var ActionUniqueId = (function() {
	var nextId = 0;
	return function() {
		return nextId++;
	}
})();

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

/**
 * DahdiRestart Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIRestart">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DAHDIRestart</a>.
 * @augments Action
 */
function DahdiRestart() {
	DahdiRestart.super_.call(this, 'DahdiRestart');
}

/**
 * DbDel Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DbDel">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DbDel</a>.
 * @property {String} Family Key Family
 * @property {String} Key Key Name
 * @augments Action
 */
function DbDel() {
	DbDel.super_.call(this, 'DbDel');
}

/**
 * DbDeltree Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DbDeltree">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DbDeltree</a>.
 * @property {String} Family Key Family
 * @property {String} Key Optional Key Name
 * @augments Action
 */
function DbDeltree() {
	DbDeltree.super_.call(this, 'DbDeltree');
}

/**
 * DbGet Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DbGet">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DbGet</a>.
 * @property {String} Family Key Family
 * @property {String} Key Key Name
 * @augments Action
 */
function DbGet() {
	DbGet.super_.call(this, 'DbGet');
}

/**
 * DbPut Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DbPut">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_DbPut</a>.
 * @property {String} Family Key Family
 * @property {String} Key Key Name
 * @property {String} Value Value
 * @augments Action
 */
function DbPut() {
	DbPut.super_.call(this, 'DbPut');
}

/**
 * ExtensionState Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ExtensionState">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ExtensionState</a>.
 * @property {String} Exten Extension
 * @property {String} Context Context of the extension
 * @augments Action
 */
function ExtensionState() {
	ExtensionState.super_.call(this, 'ExtensionState');
}

/**
 * GetConfig Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_GetConfig">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_GetConfig</a>.
 * @property {String} Filename File to get configuration from.
 * @property {String} Category Optional category to retrieve.
 * @augments Action
 */
function GetConfig() {
	GetConfig.super_.call(this, 'GetConfig');
}

/**
 * GetConfigJson Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_GetConfigJson">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_GetConfigJson</a>.
 * @property {String} Filename File to get configuration from.
 * @augments Action
 */
function GetConfigJson() {
	GetConfigJson.super_.call(this, 'GetConfigJson');
}

/**
 * GetVar Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_GetVar">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_GetVar</a>.
 * @property {String} Variable Variable Name
 * @property {String} Channel Optional Channel name.
 * @augments Action
 */
function GetVar() {
	GetVar.super_.call(this, 'GetVar');
}

/**
 * JabberSend Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_JabberSend">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_JabberSend</a>.
 * @property {String} Jabber Client or transport Asterisk uses to connect to JABBER
 * @property {String} JID XMPP/Jabber JID (Name) of recipient
 * @property {String} Message Message to be sent to the buddy
 * @augments Action
 */
function JabberSend() {
	JabberSend.super_.call(this, 'JabberSend');
}

/**
 * ListCategories Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ListCategories">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ListCategories</a>.
 * @property {String} Filename File to get categories from.
 * @augments Action
 */
function ListCategories() {
	ListCategories.super_.call(this, 'ListCategories');
}

/**
 * PauseMonitor Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_PauseMonitor">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_PauseMonitor</a>.
 * @property {String} Channel Pause monitor on this channel
 * @augments Action
 */
function PauseMonitor() {
	PauseMonitor.super_.call(this, 'PauseMonitor');
}

/**
 * UnpauseMonitor Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_UnpauseMonitor">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_UnpauseMonitor</a>.
 * @property {String} Channel Continue monitor this channel
 * @augments Action
 */
function UnpauseMonitor() {
	UnpauseMonitor.super_.call(this, 'UnpauseMonitor');
}

/**
 * StopMonitor Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_StopMonitor">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_StopMonitor</a>.
 * @property {String} Channel Stop monitor this channel
 * @augments Action
 */
function StopMonitor() {
	StopMonitor.super_.call(this, 'StopMonitor');
}


/**
 * LocalOptimizeAway Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_LocalOptimizeAway">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_LocalOptimizeAway</a>.
 * @property {String} Channel Channel
 * @augments Action
 */
function LocalOptimizeAway() {
	LocalOptimizeAway.super_.call(this, 'LocalOptimizeAway');
}

/**
 * SetVar Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SetVar">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SetVar</a>.
 * @property {String} Variable Variable Name
 * @property {String} Value Variable Value
 * @property {String} Channel Optional Channel name.
 * @augments Action
 */
function SetVar() {
	SetVar.super_.call(this, 'SetVar');
}

/**
 * Reload Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Reload">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Reload</a>.
 * @property {String} Module Optional module name
 * @augments Action
 */
function Reload() {
	Reload.super_.call(this, 'Reload');
}

/**
 * PlayDtmf Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_PlayDtmf">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_PlayDtmf</a>.
 * @property {String} Channel Channel where to play the dtmf
 * @property {String} Digit DTMF digit to play
 * @augments Action
 */
function PlayDtmf() {
	PlayDtmf.super_.call(this, 'PlayDtmf');
}

/**
 * Park Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Park">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Park</a>.
 * @property {String} Channel Channel name to park
 * @property {String} Channel2 Channel to announce park info to (and return to if timeout)
 * @property {String} Timeout Optional number of milliseconds to wait before callback
 * @property {String} Parkinglot Optional parking lot to park channel in
 * @augments Action
 */
function Park() {
	Park.super_.call(this, 'Park');
}

/**
 * ParkedCalls Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ParkedCalls">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ParkedCalls</a>.
 * @augments Action
 */
function ParkedCalls() {
	ParkedCalls.super_.call(this, 'ParkedCalls');
}

/**
 * Monitor Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Monitor">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Monitor</a>.
 * @property {String} Channel Channel name to park
 * @property {String} Filename Path where to save the audio
 * @augments Action
 */
function Monitor() {
	Monitor.super_.call(this, 'Monitor');
    this.format = 'wav';
    this.mix = 'true';
}

/**
 * ModuleCheck Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ModuleCheck">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ModuleCheck</a>.
 * @property {String} Module Module name, including .so
 * @augments Action
 */
function ModuleCheck() {
	ModuleCheck.super_.call(this, 'ModuleCheck');
}

/**
 * ModuleLoad Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ModuleLoad">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ModuleLoad</a>.
 * @property {String} Module Module name, including .so
 * @augments Action
 */
function ModuleLoad() {
	ModuleLoad.super_.call(this, 'ModuleLoad');
    this.LoadType = 'load';
}

/**
 * ModuleUnload Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ModuleUnload">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ModuleUnload</a>.
 * @property {String} Module Module name, including .so
 * @augments Action
 */
function ModuleUnload() {
	ModuleUnload.super_.call(this, 'ModuleUnload');
    this.LoadType = 'unload';
}

/**
 * ModuleReload Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ModuleReload">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ModuleReload</a>.
 * @property {String} Module Module name, including .so
 * @augments Action
 */
function ModuleReload() {
	ModuleReload.super_.call(this, 'ModuleReload');
    this.LoadType = 'reload';
}

/**
 * MailboxCount Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_MailboxCount">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_MailboxCount</a>.
 * @property {String} Mailbox Mailbox to retrieve count from
 * @augments Action
 */
function MailboxCount() {
	MailboxCount.super_.call(this, 'MailboxCount');
}

/**
 * MailboxStatus Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_MailboxStatus">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_MailboxStatus</a>.
 * @property {String} Mailbox Mailbox to retrieve count from
 * @augments Action
 */
function MailboxStatus() {
	MailboxStatus.super_.call(this, 'MailboxStatus');
}

/**
 * VoicemailUsersList Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_VoicemailUsersList">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_VoicemailUsersList</a>.
 * @augments Action
 */
function VoicemailUsersList() {
	VoicemailUsersList.super_.call(this, 'VoicemailUsersList');
}

/**
 * Redirect Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Redirect">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Redirect</a>.
 * @augments Action
 * @property {String} Channel Channel to transfer
 * @property {String} Exten Extension to transfer to
 * @property {String} Context Context to transfer to
 * @property {String} Priority Priority to transfer to
 * @property {String} ExtraChannel Optional Second call leg to transfer
 * @property {String} ExtraExten Optional Extension to transfer extra channel
 * @property {String} ExtraContext Optional Context to transfer extra channel
 * @property {String} ExtraPriority Optional Priority to transfer extra channel
 */
function Redirect() {
	Redirect.super_.call(this, 'Redirect');
}

/**
 * ShowDialPlan Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ShowDialPlan">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_ShowDialPlan</a>.
 * @property {String} Context Optional context to list
 * @property {String} Extension Optional extension to list
 * @augments Action
 */
function ShowDialPlan() {
	ShowDialPlan.super_.call(this, 'ShowDialPlan');
}

/**
 * SendText Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SendText">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_SendText</a>.
 * @property {String} Channel Channel where to send the message
 * @property {String} Message Message to send
 * @augments Action
 */
function SendText() {
	SendText.super_.call(this, 'SendText');
}

/**
 * Queues Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Queues">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Queues</a>.
 * @augments Action
 */
function Queues() {
	Queues.super_.call(this, 'Queues');
}

/**
 * QueueUnpause Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueuePause">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueuePause</a>.
 * @property {String} Interface Interface
 * @property {String} Queue Optional, Queue
 * @property {String} Reason Optional, reason description
 * @augments Action
 */
function QueueUnpause() {
	QueueUnpause.super_.call(this, 'QueueUnpause');
    this.paused = 'false';
}

/**
 * QueueUnpause Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueuePause">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueuePause</a>.
 * @property {String} Interface Interface
 * @property {String} Queue Optional, Queue
 * @property {String} Reason Optional, reason description
 * @augments Action
 */
function QueuePause() {
	QueuePause.super_.call(this, 'QueuePause');
    this.paused = 'true';
}

/**
 * QueueSummary Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueSummary">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueSummary</a>.
 * @property {String} Queue Optional, Queue
 * @augments Action
 */
function QueueSummary() {
	QueueSummary.super_.call(this, 'QueueSummary');
}

/**
 * QueueRule Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueRule">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueRule</a>.
 * @property {String} Rule Optional, Rule
 * @augments Action
 */
function QueueRule() {
	QueueRule.super_.call(this, 'QueueRule');
}

/**
 * QueueStatus Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueStatus">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueStatus</a>.
 * @property {String} Queue Optional, Queue
 * @property {String} Member Optional, Member
 * @augments Action
 */
function QueueStatus() {
	QueueStatus.super_.call(this, 'QueueStatus');
}

/**
 * QueueReset Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueReset">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueReset</a>.
 * @property {String} Queue Optional, Queue
 * @augments Action
 */
function QueueReset() {
	QueueReset.super_.call(this, 'QueueReset');
}

/**
 * QueueRemove Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueRemove">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueRemove</a>.
 * @property {String} Queue Queue
 * @property {String} Interface Interface
 * @augments Action
 */
function QueueRemove() {
	QueueRemove.super_.call(this, 'QueueRemove');
}

/**
 * Originate Action
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Originate">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_Originate</a>.
 * @property {String} Channel Channel
 * @property {String} Exten Exten
 * @property {String} Priority Priority
 * @property {String} Application Application
 * @property {String} Data Data
 * @property {String} Timeout Timeout
 * @property {String} CallerID CallerID
 * @property {String} Account Account
 * @property {String} Async Async
 * @property {String} Codecs Codecs
 * @augments Action
 */
function Originate() {
    Originate.super_.call(this, 'Originate');
}

/**
 * QueueAdd Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueAdd">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueAdd</a>.
 * @property {String} Queue Queue
 * @property {String} Interface Interface
 * @property {String} Paused Optional, 'true' or 'false
 * @property {String} MemberName Optional, Member name
 * @property {String} Penalty Optional, Penalty
 * @property {String} StateInterface Optional, State interface
 * @augments Action
 */
function QueueAdd() {
	QueueAdd.super_.call(this, 'QueueAdd');
}

/**
 * QueueLog Action.
 * @constructor
 * @see Action(String)
 * @see See <a href="https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueLog">https://wiki.asterisk.org/wiki/display/AST/ManagerAction_QueueLog</a>.
 * @property {String} Queue Queue
 * @property {String} Event Event
 * @property {String} Message Optional, Message
 * @property {String} Interface Optional, Interface
 * @property {String} UniqueId Optional, UniqueId
 * @augments Action
 */
function QueueLog() {
	QueueLog.super_.call(this, 'QueueLog');
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
        DahdiHangup,
        DahdiRestart,
        DbDel,
        DbDeltree,
        DbGet,
        DbPut,
        ExtensionState,
        GetConfig,
        GetConfigJson,
        GetVar,
        JabberSend,
        ListCategories,
        PauseMonitor,
        LocalOptimizeAway,
        Reload,
        PlayDtmf,
        Park,
        ParkedCalls,
        Monitor,
        ModuleCheck,
        ModuleLoad,
        ModuleUnload,
        ModuleReload,
        MailboxCount,
        MailboxStatus,
        VoicemailUsersList,
        Originate,
        Redirect,
        UnpauseMonitor,
        StopMonitor,
        ShowDialPlan,
        SendText,
        Queues,
        QueueUnpause,
        QueuePause,
        QueueSummary,
        QueueStatus,
        QueueRemove,
        QueueRule,
        QueueAdd,
        QueueLog
    ];
    for (i in actions) {
        util.inherits(actions[i], Action);
        exports[actions[i].name] = actions[i];
    }
})();


