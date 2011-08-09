// Validate arguments.
if (process.argv.length != 3) {
	console.log("Use: <config dir>\n");
	process.exit();
}

// "Read config file" :P
var configDir = process.argv[2];
eval(require('fs').readFileSync(configDir + '/config.js', encoding='ascii'));

// Go!
var app = require("./app.js");
new app.MyApp(NamiConfig).run();


