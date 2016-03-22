![Clara Icon](https://raw.githubusercontent.com/phazonoverload/clarabot/master/clara-icon.png)

Clarabot
===========================

**Clarabot is a Chrome Omnibox extention which allows users to pass an image to the Chrome URL bar and have it's tags returned from the Clarifai API.**

![Clarabot Demo](https://s3.amazonaws.com/f.cl.ly/items/450W1K3t3V341x1H0j3o/Screen%20Recording%202016-02-22%20at%2009.25%20AM.gif)

This project is essentially split into two parts - the web app and the Chrome extention. The web app is in the root, and the extention is in /extention.

## Setup

### Get your Clarifai credentials

To get started, create an account at [developer.clarifai.com](http://developer.clarifai.com).

Create an application, and get your Client ID and Client Secret.

This basic starter uses your Client ID and Client Secret to get an access token. Since this expires every so often, the client is setup to renew the token for you automatically using your credentials so you don't have to worry about it.

### Set up the web app

You'll notice that in the `.gitignore` file, it references a `keys.js` file. This is for security purposes, so you don't share your Client ID and Client Secret with others.  Create a `keys.js` file and have it look like the following:

```
var CLIENT_ID = 'your ID here';
var CLIENT_SECRET = 'your secret here';
```

The web app is pretty much good to go. It's all client-side, so will run on any web server. You may want to consider implementing a more secure way to store your keys if you are using this in production. For the sake of this quick project, this is suitable.

### Set up the Chrome extention

The Chrome extention is also good to go. You'll only need to make one change to get it running, and that is to edit the roots URL of your server on line 13 of `background.js`.

Once this is done, you need to load the extention in to your browser. If you're unsure how to this, here's the short version:

1. Navigate to chrome://extensions
2. Expand the developer dropdown menu and click "Load Unpacked Extension"
3. Navigate to local folder (/extentions)

## Credits

Thanks to @cassidoo for her super helpful [Clarifai Javascript Starter](https://github.com/cassidoo/clarifai-javascript-starter).
