if (process.argv.length != 3) {
	console.log("Use: <config dir>\n");
	process.exit();
}

var configDir = process.argv[2];
eval(require('fs').readFileSync(configDir + '/config.js', encoding="ascii"));
var app = require("./app.js");
// Go!

new app.MyApp(NamiConfig).run();


