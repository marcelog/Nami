[![Click here to lend your support to: Nami and make a donation at pledgie.com !](https://pledgie.com/campaigns/30946.png?skin_name=chrome)](https://pledgie.com/campaigns/30946)


Introduction
------------

For API and docs, check out the homepage at http://marcelog.github.com/Nami

You can also download the distribution and doc from the CI server, at:
http://ci.marcelog.name:8080/view/NodeJS/

A very similar, PHP alternative, is available at http://marcelog.github.com/PAMI
An Erlang port is available at https://github.com/marcelog/erlami

Nami by itself is just a library that allows your nodejs code to communicate to
an Asterisk Manager Interface (AMI). However, it includes a full application
useful to monitor an asterisk installation.

You will be able to login, receive asynchronous events, and send actions (also,
asynchronously receiving the according response with their optional related
events).

This is supported by the Nami class (er.. function) which inherits from
EventEmitter, so your application is able to subscribe to the interesting nami
events.

Requirements
------------
 * Nodejs (Tested with 0.6.5)

Events used in Nami
-------------------

 * `namiConnected`: Emitted when nami could successfully connect and logged in to
an AMI server.
 * `namiConnection`: Emitted for all connection related events. Listen to this
generic event for the status of the socket connection.
 * `namiConnection(EventName)`: Emitted for the status of the connection. States
include: `Connect`, `End`, `Error`, `Timeout`, and `Close`. The `Error` event
will emit right before the `Close` event and includes the error that was thrown.
The `Close` event includes a boolean value (`had_error`) if an error was thrown.
 * namiEvent: Emitted for all events. Listen to this generic event if you want
to catch any events.
 * `namiEvent(EventName)`: These events are thrown based on the event name
received. Let's say nami gets an event named "Dial", "VarSet", or "Hangup".
This will emit the events: "namiEventDial", "namiEventVarSet", and
"NamiEventHangup".
 * `namiLoginIncorrect`: Emitted when the login action fails (wrong password,
etc).
 * `namiInvalidPeer`: Emitted if nami tried to connect to anything that did not
salute like an AMI 1.1, 1.2, or 1.3.

Internal Nami events
--------------------
 * `namiRawMessage`: Whenever a full message is received from the
AMI (delimited by double crlf), this is emitted to invoke the decode routine.
After namiRawMessage, the decodification routine runs to properly identify this
message as a response, an event that belongs to a response, or an async event
from server.
 * `namiRawEvent`: Emitted when the decodification routine
classified the received message as an async event from server.
 * `namiRawResponse`: Emitted when the decodification routine classified the
received message as a response to an action.

Installation
------------
```sh
$ npm install nami
```

 -or-
Download it from this repo :)

Configuration
-------------
Nami expects a configuration object, very much like this:
```js
var namiConfig = {
    host: "amihost",
    port: 5038,
    username: "admin",
    secret: "secret"
};
```
Quickstart
----------
```sh
$ mkdir testnami
$ cd testnami
$ npm install nami
```
```js
var nami = new (require("nami").Nami)(namiConfig);
nami.on('namiEvent', function (event) { });
nami.on('namiEventDial', function (event) { });
nami.on('namiEventVarSet', function (event) { });
nami.on('namiEventHangup', function (event) { });
process.on('SIGINT', function () {
    nami.close();
    process.exit();
});
nami.on('namiConnected', function (event) {
    nami.send(new namiLib.Actions.CoreShowChannelsAction(), function(response){
        console.log(' ---- Response: ' + util.inspect(response));
    });
});
nami.open();
```

Adding variables to actions
---------------------------
Use the property 'variables' in the actions:

```js
var action = new namiLib.Actions.Status();
action.variables = {
	'var1': 'val1'
};
nami.send(action, function(response) {
	...
});
```

A Better example
----------------
See src/index.js for a better example (including how to reconnect when the
current connection closes).

That's about it.

Using logger other than console
------------------------------
Nami config may contain an optional attribute 'logger'.
If it exists, it will be used instead of console:

```js
namiConfig.logger = require('log4js').getLogger('Nami.Core');
var nami = new (require("nami").Nami)(namiConfig);
```

Viable options:
https://github.com/nomiddlename/log4js-node
https://github.com/trentm/node-bunyan

Logger may be anything that can be looks like:
```
logger = {
    error: function(message) {},
    warn : function(message) {},
    info : function(message) {},
    debug: function(message) {},
}
```

Controlling the loglevel
------------------------
If you are using your own logger (i.e: overriding the `logger` property of
the Nami client), you should check the documentation for it and apply the needed
changes or configuration accordingly.

If you are using the default Nami logger, you can set the property `logLevel`
of the Nami client to one of the following values:

* 0 to log only error messages.
* 1 to log error and warning messages.
* 2 to log error, warning, and info messages.
* 3 to log everything: error, warning, info, and debug messages.

Multiple server support
-----------------------
See [this gist](https://gist.github.com/4063103) for an example of how to
connect to multiple asterisk boxes.

Supported Actions (Check the api for details)
---------------------------------------------
 - Login
 - Logoff
 - Ping
 - Hangup
 - CoreShowChannels
 - CoreStatus
 - CoreSettings
 - Status
 - DahdiShowChannels
 - ListCommands
 - AbsoluteTimeout
 - SipShowPeer
 - SipShowRegistry
 - SipQualifyPeer
 - SipPeers
 - AgentLogoff
 - Agents
 - AttendedTransfer
 - ChangeMonitor
 - Command
 - CreateConfig
 - DahdiDialOffHook
 - DahdiDndOff
 - DahdiDndOn
 - DahdiHangup
 - DahdiRestart
 - DbDel
 - DbDeltree
 - DbGet
 - DbPut
 - ExtensionState
 - GetConfig
 - GetConfigJson
 - GetVar
 - SetVar
 - JabberSend
 - ListCategories
 - PauseMonitor
 - LocalOptimizeAway
 - Reload
 - PlayDtmf
 - Park
 - ParkedCalls
 - Monitor
 - ModuleCheck
 - ModuleLoad
 - ModuleReload
 - ModuleUnload
 - MailboxCount
 - MailboxStatus
 - VoicemailUsersList
 - Originate
 - Redirect
 - Bridge
 - UnpauseMonitor
 - StopMonitor
 - ShowDialPlan
 - SendText
 - Queues
 - QueueUnpause
 - QueuePause
 - QueueSummary
 - QueueStatus
 - QueueRule
 - QueueRemove
 - QueueAdd
 - QueueLog
 - AGI
 - BlindTransfer
 - Filter
 - Events

Thanks to
--------

 * Joshua Elson for his help in trying and debugging in loaded asterisk servers
and testing with node 0.6.5 and newer npm versions
 * Jon Hoult for his help in testing with AMI 1.2
 * Jonathan Nicholson (rooftopsparrow) for working on exposing connection events,
making reconnections a breeze.
 * Moshe Brevda for his contributions

