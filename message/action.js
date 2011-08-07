message = require('./message.js');
util = require('util');

function Action(name) {
    Action.super_.call(this);
    this.id = new Date().getTime();
    this.set('ActionID', this.id);
    this.set('Action', name);
}

function LoginAction(username, secret) {
    LoginAction.super_.call(this, 'Login');
    this.set('Username', username);
    this.set('Secret', secret );
}

// Inheritance for this module
util.inherits(Action, message.Message);
util.inherits(LoginAction, Action);

// Exports for this module
exports.LoginAction = LoginAction;

