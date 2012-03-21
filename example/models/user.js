var nohm = require('../lib/nohm').Nohm;
var redis = require('../lib/nohm/node_modules/redis');

nohm.setClient(redis);
nohm.model('user',{});
var user = '';
exports.user = nohm.factory('user');

