Rumblr API

Rumblr - entrance music for your office Sonos.

Welcome

Welcome to the Rumblr API repo! If you've just stumbled across this repo, it might be worth noting that this is the server-side for a project called Rumblr. Please note that you'll need a bit of a technical understanding to get this all set up - but there's a comprehensive step-by-step guide to doing so over on this blog.

Things to note

* Due to the limitations of the Sonos API, you'll need to make sure you're running the server on the same network that your Sonos system is connected to. Setting this up on a Raspberry Pi would be a pretty sweet and discreet way of doing this - but if you're lazy, you can just run this from any computer that has Node installed and is connected to the Sonos' network. Works just fine.

* This doesn't support multiple Sonos systems particularly well. The way the script's written is simply to pick whichever the first Sonos the system comes across and use that (simply because we've only got one in our studio...!). If you have a Sonos IP you'd like to specifically connect to, you can set the environment variable SONOS_IP to the IP of the system. 

* The server logic itself is written in ES6 in the /lib folder. When *npm run build* is run, it'll run babel and compile the code to /build.

Starting the server

Easy as pie - just download, open Terminal, navigate to the folder and run the following:

	npm install
	npm run build
	npm run prod

Now, if you're setting up the full experience, *head over here* and finish the rest of the setup for iOS.

People who did this

We're a tiny product studio in London who love making gnarly digital products just like this (or alternatively, absolutely nothing like this). Get in touch if there's something you'd like us to help with. We're waitin'.

License