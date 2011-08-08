function Message() {
    this.lines = Array();
    this.keys = Array();
    this.EOL = "\r\n";
}

Message.prototype.marshall = function () {
    var output = "";
    for (key in this.keys) {
        output = output + key + ": " + this.keys[key] + this.EOL;
    }
    output = output + this.EOL;
    return output;
}

Message.prototype.unmarshall = function (data) {
    this.lines = data.split(this.EOL);
    for (line in this.lines) {
        key = this.lines[line].split(":");
        this.keys[key[0]] = key[1].replace(/^\s+/g, '').replace(/\s+$/g, '');
    }
}

Message.prototype.set = function(name, value) {
    this.keys[name] = value;
}

Message.prototype.get = function(name) {
    return this.keys[name];
}

exports.Message = Message;
