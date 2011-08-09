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
message = require('./message.js');
util = require('util');

function Action(name) {
    Action.super_.call(this);
    this.id = new Date().getTime();
    this.set('ActionID', this.id);
    this.set('Action', name);
};

function LoginAction(username, secret) {
    LoginAction.super_.call(this, 'Login');
    this.set('Username', username);
    this.set('Secret', secret );
};

// Inheritance for this module
util.inherits(Action, message.Message);
util.inherits(LoginAction, Action);

// Exports for this module
exports.LoginAction = LoginAction;

