'use strict';

module.exports = {
    auth: auth
};

function auth(req, def, scopes, callback) {
    // implement auth rules
    console.log('auth');
    callback();
}
