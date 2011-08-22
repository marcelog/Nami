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
/**
 * @fileoverview Base message class.
 *
 * @author Marcelo Gornstein - http://marcelog.github.com
 * Website: http://marcelog.github.com/Nami
 */

/**
 * Base message class.
 * @constructor
 */
function Message() {
    this.lines = [];
    this.EOL = "\r\n";
};

/**
 * Used to serialize this message to a text representation understood by
 * AMI. Will return a set of lines delimited by \r\n and the message is delimited by
 * \r\n\r\n.
 * @returns {String}
 */
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

/**
 * Used to unserialize this message given a text representation understood by AMI.
 * Will split each line by \r\n and extract "key: value" pairs. Each key will be set
 * as a property inside this Message object with the corresponding value.
 * @returns void
 */
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

/**
 * Call this one to set a property into this message.
 * @param {String} name The name of the property.
 * @param {String} value The value for the property.
 * @returns void
 */
Message.prototype.set = function(name, value) {
    this[name] = value;
};

/**
 * Returns the value for the given Message property.
 * @returns {String}
 */
Message.prototype.get = function(name) {
    return this[name];
};

exports.Message = Message;
