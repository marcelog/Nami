/*!
 * A message.
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
function Message() {
    this.lines = [];
    this.EOL = "\r\n";
};

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
};

Message.prototype.unmarshall = function (data) {
    this.lines = data.split(this.EOL);
    for (line in this.lines) {
        key = this.lines[line].split(":");
        /* XXX This should not be needed... */
        if (typeof(key[1]) === 'undefined') {
            continue;
        }
        this[key[0].replace(/-/, '_')] = key[1].replace(/^\s+/g, '').replace(/\s+$/g, '');
    }
};

Message.prototype.set = function(name, value) {
    this[name] = value;
};

Message.prototype.get = function(name) {
    return this[name];
};

exports.Message = Message;
