#!/usr/bin/node 

/*
#-
# Copyright (c) 2012 Ryan Kelker and individual contributors.
# ( https://github.com/runexec/monorail.js ) Monorail.js
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions
# are met:
# 1. Redistributions of source code must retain the above copyright
# notice, this list of conditions and the following disclaimer
# in this position and unchanged.
# 2. Redistributions in binary form must reproduce the above copyright
# notice, this list of conditions and the following disclaimer in the
# documentation and/or other materials provided with the distribution.
# 3. The name of the author may not be used to endorse or promote products
# derived from this software withough specific prior written permission
#
# THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
# IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
# OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
# IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
# INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
# NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES# LOSS OF USE,
# DATA, OR PROFITS# OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
# THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
# THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var fs = require('fs');
var argv = process.argv;
var routine = argv[2];
var help = [
	'start server ; Start project Redis & Express server',
	'new project [project_name] ; Creates project',
	'new page [page_name] ; Creates new project page',
	].join('\n');

var os = require('os').platform();

switch(routine) {
	//
	// Start Project Redis Server
	//
	case "start":
		start_type = argv[3];

		switch(start_type) {
			//
			// Start Redis & Express
			//
			case "server":
				spawn = require('child_process').spawn;
				
				//
				// Redis
				//
				console.log('Starting Redis...');
				redis = spawn('redis-server', ['redis.config']);
			
				redis.stdout.on('data', function(data) {
					console.log('Redis-Server [pid:'+redis.pid+'] => '+data);	
				});

				redis.stderr.on('data', function(data) {
					console.log('Redis-Server [ERROR]: '+data);
				});

				redis.on('exit', function(code) {
					console.log('Redis-Server Exit: Code('+code+')');
				});

				if(redis.pid === null) { throw 'Failed to start Redis'; }
				
				console.log('Redis Running on Process '+redis.pid);
				//
				// Express
				//
				console.log('Starting Express');
				express = spawn('node', ['./routes.js']);

				express.stdout.on('data', function(data) {
					console.log('Express [pid:'+express.pid+'] => '+data);
				});

				express.stderr.on('data', function(data) {
					console.log('Express [ERROR]: '+data);
				});

				express.on('exit', function(code) {
					console.log('Express Exit: Code('+code+')');
				});
				
				if(express.pid === null) { throw 'Failed to start Express'; }

				console.log('Express Running on Process '+express.pid);
				break;
			//
			// Display Help
			//
			default: console.log(help);
		}
		break;
		// switch start end
	//
	// New [Sequence]
	//
	case "new":
		new_type = argv[3];
		
		switch(new_type) {
		//
		// New Page
		//
		case "page":
			page_name = argv[4];

			if(!page_name) {
				console.log(help);
			}else{
				page_files = ['views/' + page_name + '.xml',
					'models/' + page_name + '.js'];

				for(i in page_files) {
					page_file = page_files[i];
					fp = fs.createWriteStream(page_file);
					
					data = [];
					if(page_file == 'views/' + page_name + '.xml') {
						data = ["<#CODE#> html_body = 'This code block takes 100% node.js code.'; </#CODE#>"];
					}

					if(page_file == 'models/' + page_name + '.js') {
						//
						// https://github.com/runexec/File2Array
						//
						var data = [
							"var nohm = require('../lib/nohm').Nohm;",
							"var redis = require('../lib/nohm/node_modules/redis');",
							"var client = redis.createClient();",
							"",
							"nohm.setClient(client);",
							"nohm.model('"+page_name+"',{});"];
					}

					for(i in data) {
						fp.write(data[i]+'\n', function (err) { if (err) throw err; });
					}
				} // end for page_files	
			} // end else page_name	
			break;
		//
		// New Project
		//
		case "project":
				project_name = argv[4];

				if(!project_name) { 
					console.log(help); 
				}else{
					console.log('Creating Project '+project_name);
					//
					// Directory Tree
					//
					dir_tree = [project_name,
					    project_name + '/static',
					    project_name + '/static/img',
					    project_name + '/static/js',
					    project_name + '/static/css',
					    project_name + '/themes',
					    project_name + '/themes/classic',
					    project_name + '/themes/classic/img',
					    project_name + '/themes/classic/js',
					    project_name + '/themes/classic/css',
					    project_name + '/models',
					    project_name + '/views'];
	
					
					for(i in dir_tree) {
                        make_dir = dir_tree[i];

						console.log('Making directory '+make_dir);

						fs.mkdir(make_dir, function (err) {
							if (err) { throw err; }
						});
					} // end for 

					//
					// Default Project Files
					//
					file_tree = [project_name + '/monorail.project',
					    project_name + '/routes.js',
						project_name + '/redis.config',
					    project_name + '/themes/classic/classic.html',
						project_name + '/themes/classic/css/classic.css'];

					for(i in file_tree) {
						make_file = file_tree[i];

						console.log('Making file '+make_file);

						data = [];

						//
						// Default Project File Writters
						//
						//
						// monorail.project
						//
						if(make_file == project_name + '/monorail.project') {
							data = ['name : ' + project_name,
								 	'theme : classic',
									'express_port : 8123'];
						}	
						//
						// redis.config
						//
						if(make_file == project_name + '/redis.config') {
							data = ['daemonize no',
									'port 6379',
									'bind 127.0.0.1',
									'timeout 300',
									'# Every minute save the database to harddrive if at least 10 keys changed',
									'save 60 10',
									'dbfilename monorail.'+project_name+'.rdb',
									'# DB directory',
									'dir ./',
									'loglevel debug',
									'logfile monorail.redis.log'];	
						}
						//
						// routes.js
						//
						if(make_file == project_name + '/routes.js') {
						// http://github.com/runexec/File2Array
						
							data = [
								"var fs = require('fs');",
								"var nohm = require('./lib/nohm').Nohm;",
								"var redis = require('./lib/nohm/node_modules/redis');",
								"var express = require('./lib/express');",
								"var app = express.createServer();",
								"var config_data = fs.readFileSync('monorail.project','utf8').split('\\n');",
								"",
								"if(config_data == '') { throw \"Couldn't read or missing file 'monorail.project' !\"; }",
								"",
								"var site_name = '',",
								"	theme = '',",
								" 	theme_body = '',",
								"	theme_file = '',",
								"   express_port = '';",
								"",
								"for(i in config_data) {",
								"	line = config_data[i].split(' : ');",
								"	k = line[0];",
								"	v = line[1];",
								"",
								"	switch(k) {",
								"		// Site name",
								"		case \"name\":",
								"			site_name = v;",
								"			break;",
								"		// Theme",
								"		case \"theme\":",
								"			theme = v;",
								"			break;",
								"		// Express server port",
								"		case \"express_port\":",
								"			express_port = v;",
								"			break;",
								"	}",
								"}",
								"",
								"theme_file = './themes/'+theme+'/'+theme+'.html'; ",
								"theme_body = fs.readFileSync(theme_file);",
								"",
								"if(theme_body == '') { throw \"Couldn't read or missing theme file '\"+theme_file+\"' !\"; }",
								"",
								"// Request Output Builder",
								"function themeResponse(title, body) {",
								"	ret = theme_body.toString();",
								"	ret = ret.replace(/#MONO_RAIL_TITLE#/g, title);",
								"	ret = ret.replace(/#MONO_RAIL_BODY#/g, body);",
								"	return ret;",
								"}",
								"",
								"function railed(title, body) { return themeResponse(title, body); }",
								"",
								"// Serving up static themes",
								"app.use('/themes', express.static(__dirname + '/themes'));",
								"app.use('/static', express.static(__dirname + '/static'));",
								"",
								"// We want to handle POST request",
								"app.use(express.bodyParser());",
								"",
								"// View Handlers ",
								"// All views must return all output to html_body local variable",
								"//",
								"function loadView(view_name, vars) {",
								"	view_path = './views/'+view_name+'.xml';",
								"	view_data = fs.readFileSync(view_path).toString();",
								"	page_code = view_data.split('<#CODE#>')[1].split('</#CODE#>')[0];",
								"",
								"	util = require('util');",
								"	vm = require('vm');",
								"	",
								"	script = vm.createScript(page_code);	",
								"	script.runInNewContext(vars);",
								"	",
								"	return vars['html_body'];",
								"}",
								"",
								"// Model Handlers",
								"function loadModel(model_name) {",
								"	require('./models/'+model_name+'.js');",
								"	return nohm.factory(model_name);",
								"}",
								"",
								"function getModel(model_name,key_id) {",
								"	require('./models/'+model_name+'.js');",
								"	nohm.factory(model_name, key_id, function(err, properties) {",
								"		if(err){ return null; }else{ return properties; }",
								"	});",
								"}",
								"",
								"////////////////////--------------------------------!",
								"//////////////////// CHANGE NOTHING ABOVE THIS LINE !",
								"////////////////////--------------------------------!",
								"",
								"app.get('/', function(req, res) {",
								"	config_view = [];",
								"	config_view.push('Site Name: <br />');",
								"	config_view.push('<input type=\"text\" value=\"'+site_name+'\" /><br />');",
								"	config_view.push('<br />');",
								"	config_view.push('Site Theme: <br />');",
								"	config_view.push('<input type=\"text\" value=\"'+theme+'\" /><br />');",
								"	",
								"	settings = railed(site_name, config_view.join('\\n'));",
								"	res.send(settings);",
								"});",
								"",
								"app.listen(express_port);"
									];
						}

						//
						// /themes/classic/classic.html
						//
						if(make_file == project_name + '/themes/classic/classic.html') {
							data = [
								'<!DOCTYPE html>',
								'<html lang="en">',
								'<head>',
								'	<meta charset="utf-8" />',
								'	<title> Monorail site : #MONO_RAIL_TITLE# </title>',
								'	<link rel="stylesheet" href="/themes/classic/css/classic.css" media="screen" />',
								'</head>',
								'<body>',
								'<header>',
								'	<h3> #MONO_RAIL_TITLE# </h3> ',
								'</header>',
								'#MONO_RAIL_BODY#',
								'<p />',
								'<footer>',
								'	About : Contact : FAQ ',
								'</footer>',
								'</body>',
								'</html>'
									];
						}

						//
						// /themes/classic/css/classic.css
						//
						if(make_file == project_name + '/themes/classic/css/classic.css') {
							data = [
								"header {",
								"	border-style: solid;",
								"	border-width: 0px 0px 2px 0px;",
								"	border-color: #000000;",
								"	margin: 0px auto 10px auto;",
								"	max-width: 80%;	",
								"	text-align: center;",
								"	background-color: #D9DCD7;",
								"}",
								"",
								"h3 {",
								"	text-align:left;",
								"	margin: 20px 20px 0px 20px;",
								"}",
								"body {",
								"	text-align:center;",
								"  	margin: 0px auto 0px auto;",
								"}",
								];
						}

						
						fp = fs.createWriteStream(make_file);
						for(i in data) {
							fp.write(data[i]+'\n', function(err) { if (err) throw err; });
						}
						
					} // end for-loop make_file

					//
					// Required libs
					//
					copy_op = '';

					if(os.indexOf("win") == -1) {
						copy_op = 'cp -vrf ./lib '+ project_name +'/lib';
					}else{
						copy_op = 'XCOPY lib '+ project_name +'\\lib';
					}

					console.log('Copying libs...');
					exec = require('child_process').exec;
					child = exec(copy_op, function (err, stdout, stderr) { if(err) { throw err; } });

				} // end if else
			break;
			// end case project
			
			//
			// Display Help
			//
			default: console.log(help);
		} // switch new_type end
		break;
		// routine new end

	default: console.log(help);
}
