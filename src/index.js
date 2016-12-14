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
var namiLib = require(__dirname + "/nami.js");
if (process.argv.length !== 6) {
	console.log("Use: <host> <port> <user> <secret>");
	process.exit();
}

var namiConfig = {
    host: process.argv[2],
    port: process.argv[3],
    username: process.argv[4],
    secret: process.argv[5]
};

var nami = new namiLib.Nami(namiConfig);
process.on('SIGINT', function () {
    nami.close();
    process.exit();
});
nami.on('namiConnectionClose', function (data) {
    console.log('Reconnecting...');
    setTimeout(function () { nami.open(); }, 5000);
});

nami.on('namiInvalidPeer', function (data) {
	console.log("Invalid AMI Salute. Not an AMI?");
	process.exit();
});
nami.on('namiLoginIncorrect', function () {
	console.log("Invalid Credentials");
	process.exit();
});
nami.on('namiEvent', function (event) {
    console.log('Got Event: ' + util.inspect(event));
});
function standardSend(action) {
    nami.send(action, function (response) {
        console.log(' ---- Response: ' + util.inspect(response));
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

	action = new namiLib.Actions.QueueStatus();
	nami.send(action, function (response) {
		var c = 0;
		var queues = new Array();
		if (response.events !== 'undefined')
		{
			c = response.events.length;
		}
		logger.debug('Got response for QueueStatus command bundled with %d events', c);	
		
		for (var x=0; x < c ; x++)
		{
			event = response.events[x];
			if (event.event == 'QueueParams')
			{
				var q = new Object();
				q.name = event.queue;
				q.max = event.max;
				q.strategy = event.strategy;
				q.calls	= event.calls;
				q.holdtime = event.holdtime;
				q.talktime = event.talktime;
				q.completed = event.completed;
				q.abandoned = event.abandoned;
				q.servicelevel = event.servicelevel;
				q.servicelevelperf = event.servicelevelperf;
				q.members = new Array();
				q.calls = new Array();

				queues.push(q);
			}
			if (event.event == 'QueueMemeber')
			{
				var agent = new Object();
				agent.name = event.name;
				agent.callstaken = event.callstaken;
				agent.lastcall = event.lastcall;
				agent.status = event.status;
				agent.paused = event.paused;
				
				for (var i=0; i < queues.length; i++ )
				{
					if (queues[i].name == event.queue)
					{
						queues[i].memebers.push(agent);
						break;
					}
				}

			}
			if (event.event == 'QueueEntry')
			{
				var call = new Object();
				call.callerid = event.callerid;
				call.callername = event.callername;
				call.channel = event.channel;
				call.wait = event.wait;
				
				for (var i=0; i < queues.length; i++ )
				{
					if (queues[i].name == event.queue)
					{
						queues[i].calls.push(agent);
						break;
					}
				}

			}
			
			logger.debug('Event got ' + event.event);
		}

		logger.debug('Got data ' + util.inspect(queues)); 
	});
});
nami.open();

