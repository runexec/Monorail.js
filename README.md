# Monorail.js - Ultra lightweight MVC for Node.js

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

Congratulations. Your DONE!<br />

# Example

Make a new page
    $ ../monorail.js new page user

Lets view our user view
    $ cat views/user.xml 
    <#CODE#> html_body = 'This code block takes 100% node.js code.'; </#CODE#>

Change it to this
    <#CODE#> html_body = 'Viewing profile of '+username; </#CODE#>

Lets view our user model
    $ cat models/user.js 
    var nohm = require('../lib/nohm').Nohm;
    var redis = require('../lib/nohm/node_modules/redis');

    nohm.setClient(redis);
    nohm.model('user',{});
    var user = '';
    exports.user = nohm.factory('user');

Lets add a controller to the bottom of route.js
    app.get('/user/:name', function(req, res) {
      user = req.params.name;
      view = loadView('user',{ username : user });
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

# Dependencies
	nohm, Redis ORM @ https://github.com/maritz/nohm
  express, Webserver/router @ https://github.com/visionmedia/express

# Documentation
	
###### Routing
http://expressjs.com/guide.html#http-methods <br />
http://expressjs.com/guide.html#routing <br />
http://expressjs.com/guide.html#passing-route%20control <br />
http://expressjs.com/guide.html#route-middleware <br />
http://expressjs.com/guide.html#route-param%20pre-conditions <br />
	
# Compatibility

It has currently only been tested on unix, but should work on windows with little or no changes.

# TODO
Theme/Template documentation<br />
Wiki-Examples coming very very soon.<br />
Mootools or Right.js Integration<br />
Heavy Bug Testing<br />

# License

<a href="http://www.opensource.org/licenses/mit-license.php">MIT License</a> Copyright (c) 2012 Ryan Kelker and individual contributors.
