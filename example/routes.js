var fs = require('fs');
var nohm = require('./lib/nohm');
var redis = require('./lib/nohm/node_modules/redis');
var express = require('./lib/express');
var app = express.createServer();
var config_data = fs.readFileSync('monorail.project','utf8').split('\n');

if(config_data == '') { throw "Couldn't read or missing file 'monorail.project' !"; }

var site_name = '',
	theme = '',
 	theme_body = '',
	theme_file = '',
   express_port = '';

for(i in config_data) {
	line = config_data[i].split(' : ');
	k = line[0];
	v = line[1];

	switch(k) {
		// Site name
		case "name":
			site_name = v;
			break;
		// Theme
		case "theme":
			theme = v;
			break;
		// Express server port
		case "express_port":
			express_port = v;
			break;
	}
}

theme_file = './themes/'+theme+'/'+theme+'.html'; 
theme_body = fs.readFileSync(theme_file);

if(theme_body == '') { throw "Couldn't read or missing theme file '"+theme_file+"' !"; }

// Request Output Builder
function themeResponse(title, body) {
	ret = theme_body.toString();
	ret = ret.replace(/#MONO_RAIL_TITLE#/g, title);
	ret = ret.replace(/#MONO_RAIL_BODY#/g, body);
	return ret;
}

function railed(title, body) { return themeResponse(title, body); }

// Serving up static themes
app.use('/themes', express.static(__dirname + '/themes'));
app.use('/static', express.static(__dirname + '/static'));


// View Handlers 
// All views must return all output to html_body local variable
//
function loadView(view_name, vars) {
	view_path = './views/'+view_name+'.xml';
	view_data = fs.readFileSync(view_path).toString();
	page_code = view_data.split('<#CODE#>')[1].split('</#CODE#>')[0];

	util = require('util');
	vm = require('vm');
	
	script = vm.createScript(page_code);	
	script.runInNewContext(vars);
	
	return vars['html_body'];
}

// Model Handlers
function loadModel(module_name) {
	return require('./models/'+module_name+'.js');
}

////////////////////--------------------------------!
//////////////////// CHANGE NOTHING ABOVE THIS LINE !
////////////////////--------------------------------!

app.get('/', function(req, res) {
	config_view = [];
	config_view.push('Site Name: <br />');
	config_view.push('<input type="text" value="'+site_name+'" /><br />');
	config_view.push('<br />');
	config_view.push('Site Theme: <br />');
	config_view.push('<input type="text" value="'+theme+'" /><br />');
	
	settings = railed(site_name, config_view.join('\n'));
	res.send(settings);
});

app.get('/user/:name', function(req, res) {
	user = req.params.name;
	view = loadView('user', { username : user });
	page = railed('Viewing User - '+user, view);
	res.send(page);
});

app.listen(express_port);
