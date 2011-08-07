var app = require("./app.js");

// Go!
var config = {
    amiData: {
        host: "10.225.64.127",
        port: 9999,
        username: "admin",
        secret: "aa22bbcc"
    }
};
new app.MyApp(config).run();


