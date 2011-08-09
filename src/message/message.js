function Message() {
    this.lines = [];
    this.EOL = "\r\n";
}

Message.prototype.marshall = function () {
    var output = "";
    for (key in this) {
    	if (key == 'lines' || key == 'EOL' || (typeof this[key] === 'function')) {
    		continue;
    	}
    	output = output + key + ": " + this[key] + this.EOL;
    }
    output = output + this.EOL;
    return output;
}

Message.prototype.unmarshall = function (data) {
    this.lines = data.split(this.EOL);
    for (line in this.lines) {
        key = this.lines[line].split(":");
        this[key[0]] = key[1].replace(/^\s+/g, '').replace(/\s+$/g, '');
    }
}

Message.prototype.set = function(name, value) {
    this[name] = value;
}

Message.prototype.get = function(name) {
    return this[name];
}

exports.Message = Message;
