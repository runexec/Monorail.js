[![endorse](http://api.coderwall.com/runexec/endorsecount.png)](http://coderwall.com/runexec)
#### Monorail.js - Ultra lightweight MVC Framework for Node.js

>**TLDR; Monorail.js will never force you, and uses only what you need.** <br />
>Monorail.js **will never force you** to install anything not needed for your project. <br />
>The goal is to **use what you need.** <br />
>Anything other than creating a project will **always be optional**. <br />



![Monorail.js Logo](https://github.com/runexec/Monorail.js/raw/master/monorail.js-small.png)

	npm install Monorail.js
	
Or start a project right now with <a href="https://github.com/runexec/Railing.sh">Railing.sh</a>

	./railing.sh Project_Name
	
No configuration required.<br />
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

# Documentation

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

###### Express Routing
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
<!-- For page#nav purposes -->
<div id="TODO" name="TODO" style="display:none;"></div>

Create examples for the new switches below <br />
Add easy html.escape/html.unescape functions <br />
Add update Monorail.js switch <br />
Add reset project switch <br />
Add create snapshot switch <br />
Add recover snapshot switch <br />
Add compare snapshot switch <br />
Add clear snapshots switch <br />
Add build hash tree switch <br />
Add create model (independent of view) switch <br />
Add create view (independent of model) switch <br />
Add project summary switch <br />
Theme/Template documentation<br />
More Wiki-Examples coming very very soon.<br />
Heavy Bug Testing<br />


# License

<a href="http://www.opensource.org/licenses/mit-license.php">MIT License</a> Copyright (c) 2012 Ryan Kelker and individual contributors.