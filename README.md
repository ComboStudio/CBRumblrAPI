# Rumblr - API

Rumblr - entrance music for your office Sonos.

## Welcome

Welcome to the Rumblr API repo! If you've just stumbled across this repo, it might be worth noting that this is the server-side for a project called Rumblr. Please note that you'll need a bit of a technical understanding to get this all set up - but there's a comprehensive step-by-step guide to doing so over on this blog.

## Things to note

* **The server needs to be running on the same network as the client device AND the Sonos for this to work!** Yeah, it's far from ideal, but the Sonos bits require a bit of tunnel-y magic I haven't got round to trying yet. Would love to see any implementation of this, however!

* This doesn't support multiple Sonos systems particularly well. The way the script's written is simply to pick whichever the first Sonos the system comes across and use that (simpy because we've only got one in our studio...!). If you have a Sonos IP you'd like to specifically connect to, you can set the environment variable SONOS_IP to the IP of the system and override. **Note: Make sure it's a valid IP, otherwise the connection will hang.**

* The server logic itself is written in ES6 in the /lib folder. When *npm run build* is run, it'll run babel and compile the code to /build.

## Starting the server

Easy as pie - just download, open Terminal, navigate to the folder and run the following:

	npm install

	npm run build

	npm run prod

**Note:** If you're setting up the full experience, **[head over here](https://github.com/ComboStudio/CBRumblr)** and finish the rest of the setup for iOS!

## People who did this

We're a [tiny product studio called Combo](https://www.combostudio.co) from London who love making gnarly digital products just like this (or alternatively, absolutely nothing like this). 

Interested in working with us? Sweet, our mailboxes are wide open. Drop us a line on [sam@combostudio.co](mailto:sam@combostudio.co).

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.