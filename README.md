[![build status](https://secure.travis-ci.org/runexec/Monorail.js.png)](http://travis-ci.org/runexec/Monorail.js)
[![endorse](http://api.coderwall.com/runexec/endorsecount.png)](http://coderwall.com/runexec)
#### Monorail.js - Ultra lightweight MVC Framework for Node.js

>**TLDR; Monorail.js will never force you, and uses only what you need.** <br />
>Monorail.js **will never force you** to install anything not needed for your project. <br />
>The goal is to **use what you need.** <br />
>Anything other than creating a project will **always be optional**. <br />
>**Scaffold models in seconds**

![Monorail.js Logo](https://github.com/runexec/Monorail.js/raw/master/monorail.js-small.png)

	npm install Monorail.js
	
Or start a project right now with <a href="https://github.com/runexec/Railing.sh">Railing.sh</a>

	./railing.sh Project_Name
	
**No configuration required.**<br />
Zero Touch Configuration to get you up and running.<br />

    $ ./monorail.js new project example
    Creating Project example
    Making directory example
    Making directory example/static
    Making directory example/static/img
    Making directory example/static/js
    Making directory example/static/css
    Making directory example/themes
    Making directory example/themes/classic
    Making directory example/themes/classic/img
    Making directory example/themes/classic/js
    Making directory example/themes/classic/css
    Making directory example/models
    Making directory example/views
    Making file example/monorail.project
    Making file example/routes.js
    Making file example/redis.config
    Making file example/themes/classic/classic.html
    Making file example/themes/classic/css/classic.css
    Copying libs...

    $ cd example

    $ cat monorail.project
    name : example
    theme : classic
    express_port : 8123

    $ ../monorail.js start server
    Starting Redis...
    Redis Running on Process 3822
    Starting Express
    Express Running on Process 3825

Congratulations. You're DONE!<br />

# Example
Lets install Mootools and RightJS

	[user@machine tmp]$ ls 
	Example  README.md  lib  monorail.js  monorail.js-small.png  monorail.js.png  package.json
	
	[user@machine tmp]$ cd Example/
	
	[user@machine Example]$ ../monorail.js
	install [mootools | rightjs | jquery | dojo | prototype ] ; Install JS Framework in this project
	start server ; Start project Redis & Express server
	new project [project_name] ; Creates project
	new page [page_name] ; Creates new project page
	
	[user@machine Example]$ ../monorail.js install mootools
	[user@machine Example]$ ../monorail.js install rightjs 
	[user@machine Example]$ tree static/
	static/
	|-- css
	|-- img
	`-- js
		  |-- mootools-core-1.4.5-full-compat.js
		  `-- right-2.3.1.js

	3 directories, 2 files


Make a new page<br />

	$ ../monorail.js new page user

Lets view our user view<br />

	$ cat views/user.xml 
	<#CODE#>html_body = 'This code block takes 100% node.js code.';</#CODE#>

Change it to this<br />

	<#CODE#>html_body = 'Viewing profile of '+username;</#CODE#>

Lets view our user model<br />

	$ cat models/user.js 
	
	var nohm = require('../lib/nohm').Nohm;
	var redis = require('../lib/nohm/node_modules/redis');
	var client = redis.createClient();
	
	nohm.setClient(client);
	nohm.model('user',{});

Lets add a controller to the bottom of route.js
<br />

	app.get('/user/:name', function(req, res) {
	  user = req.params.name;
	  view = loadView('user',{ username: user });
	  page = railed('Viewing User - '+user, view);
	  res.send(page);
	});

	app.listen(express_port);
      
Lets start the server up and point our browser to http://localhost:8123/user/any_name_here

	$ ../monorail.js start server
	Starting Redis...
	Redis Running on Process 3822
	Starting Express
	Express Running on Process 3825

There's more examples in the wiki :)
<a href="#SCAFFOLD" name="SCAFFOLD"></a>
# Scaffolding in Node.js
		[user@machine Exampel]$ ../monorial.js generate blogpost title:string pubDate:timestamp
		[user@machine Example]$ cat models/blogpost.js
		var nohm = require('../lib/nohm').Nohm;
		var redis = require('../lib/nohm/node_modules/redis');
		var client = redis.createClient();

		nohm.setClient(client);
		nohm.model('blogpost', {
			 idGenerator: 'increment',
			 properties: {
				  title: {
				     type: 'string',
				     validations: ['notEmpty']
				  },
				  pubDate: {
				     type: 'timestamp',
				     defaultValue: new Date()
				  }
			 }
		});

# What's new in version 1
<!-- For page#section navigation purposes. -->
<a name="NEW"></a>

		[user@machine Monorail.js]$ ./monorail.js new project Example
		Creating Project Example
		Making directory Example
		Making directory Example/static
		Making directory Example/static/img
		Making directory Example/static/js
		Making directory Example/static/css
		Making directory Example/themes
		Making directory Example/themes/classic
		Making directory Example/themes/classic/img
		Making directory Example/themes/classic/js
		Making directory Example/themes/classic/css
		Making directory Example/models
		Making directory Example/views
		Making file Example/monorail.project
		Making file Example/routes.js
		Making file Example/redis.config
		Making file Example/themes/classic/classic.html
		Making file Example/themes/classic/css/classic.css
		Copying libs...
		[user@machine Monorail.js]$ cd Example/
		[user@machine Example]$ ls
		lib  models  monorail.project  redis.config  routes.js  static  themes  views

		[user@machine Example]$ ../monorail.js 
		hashtree 
		|_ Return a hash tree of the current project

		install [mootools | rightjs | jquery | dojo | prototype ] 
		|_ Install JS Framework in this project

		new model [model_name] 
		|_ Creates model w/  no view

		new page [page_name] 
		|_ Creates new project page

		new project [project_name] 
		|_ Creates project

		new view [view_name] 
		|_ Creates view w/ no model

		reset project 
		|_ Removes files from static, models, and views

		snapshot [ create | clean ] 
		|_ backup your models, views, and routes

		start server 
		|_ Start project Redis & Express server

		summary 
		|_ Returns a project summary

		update 
		|_ Download the latest Monorail.js (script only)

		[user@machine Example]$ ../monorail.js snapshot create
		Saved
		[user@machine Example]$ ls -l snapshots/
		total 16
		-rw-r--r-- 1 user users 3371 Mar 29 00:58 2012.03.28T15.58.43.524Z.zip
		-rw-r--r-- 1 user users 3371 Mar 29 00:58 2012.03.28T15.58.45.467Z.zip
		-rw-r--r-- 1 user users 3371 Mar 29 00:58 2012.03.28T15.58.46.133Z.zip
		-rw-r--r-- 1 user users 3371 Mar 29 00:58 2012.03.28T15.58.46.829Z.zip
		[user@machine Example]$ ../monorail.js snapshot clean

		WARNING: All snapshots will be DELETED!
		Type continue to continue: continue
		Snapshots deleted.

		[user@machine Example]$ ls -l snapshots/
		total 0
		
		[user@machine Example]$ ../monorail.js new page home
		[user@machine Example]$ ../monorail.js new view about
		[user@machine Example]$ ../monorail.js new model user
		[user@machine Example]$ ../monorail.js summary 
		views: 2
		models: 2
		themes: 1
		
		[user@machine Example]$ ../monorail.js hashtree
		./views/about.xml: 72c05ce377c77bf828f19290f6a984f3133cabbb
		./views/home.xml: 6a1f00f99f017f79d7f683e080f7ebdfa5783211
		./models/user.js: be9f2b1e2cf13d2c7ecdb65104b110593718600f
		./models/home.js: 5bd607fa91b475405f49ba6314552c0ede345e99
		./routes.js: cf579e914e61a235aab5ad25fc72d4052c42fa3d
		./redis.config: c220348239ca26abdb54651cd7f340b2a98f0e83
		./monorail.project: 958f07662d6ca27b36d744703094ed8d1e761341
		
		[user@machine Example]$ ../monorail.js reset project

		WARNING: All files in the views, models, and static folders will be DELETED!
		Type the word continue to continue: continue
		Cleaning up ./views/about.xml...
		Cleaning up ./views/home.xml...
		Cleaning up ./models/home.js...
		Cleaning up ./models/user.js...
		Your project has been reset :)
		
		[user@machine Example]$ ../monorail.js update
		Saving to new_monorail.js
		
		[user@machine Example]$ du -hs new_monorail.js 
		888K	new_monorail.js


# Documentation
<!-- For page#section navigation purposes. -->
<a name="DOCS"></a>

###### Monorail.js
https://github.com/runexec/Monorail.js/wiki

###### JS Frameworks
http://docs.jquery.com/Main_Page <br />
http://mootools.net/docs/core <br />
http://rightjs.org/docs<br />
http://api.prototypejs.org/ <br />
http://dojotoolkit.org/documentation/ 

###### Redis ORM
http://maritz.github.com/nohm/

###### Redis
https://github.com/mranney/node_redis

###### Express Routing, Cookies, and Sessions
http://expressjs.com/guide.html#session-support <br />
http://expressjs.com/guide.html#http-methods <br />
http://expressjs.com/guide.html#routing <br />
http://expressjs.com/guide.html#passing-route%20control <br />
http://expressjs.com/guide.html#route-middleware <br />
http://expressjs.com/guide.html#route-param%20pre-conditions <br />
	
# Compatibility
It has currently only been tested on unix, but should work on windows with little or no changes.

Built and tested with node v0.6.13<br />
nohm ORM vs 0.9.0<br />
express 2.58<br />

# TODO
<!-- For page#section navigation purposes. -->
<a name="TODO"></a>
<br />
Add easy html.escape/html.unescape functions <br />
<del>Create examples for the new switches below</del> <br />
<del>Add scaffolding</del><br />
<del>Add update Monorail.js switch</del> <br />
<del>Add reset project switch</del> <br />
<del>Add create snapshot switch</del><br />
<del>Add clear snapshots switch</del><br />
<del>Add build hash tree switch </del><br />
<del>Add create model (independent of view) switch</del> <br />
<del>Add create view (independent of model) switch</del> <br />
<del>Add project summary switch</del> <br />
<del>(MAYBE) Add recover snapshot switch</del>&nbsp; Never <br />
<del>(MAYBE) Add compare snapshot switch</del>&nbsp; Never <br />
Theme/Template documentation<br />
More Wiki-Examples coming very very soon.<br />
Heavy Bug Testing<br />


# License

<a href="http://www.opensource.org/licenses/mit-license.php">MIT License</a> Copyright (c) 2012 Ryan Kelker and individual contributors.
