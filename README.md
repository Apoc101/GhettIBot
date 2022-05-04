# GhettiBot
 Bot made in node.js as a project originally spawned by non-admin users wanting to send deafend users to Bazorpa. Most of the code is commented with descriptions,
 
 and the package requirements are commented at the top of `bot.js`
 
 The prefix is `g.`
 
 I used an environment variable for the token (omitted from the repo for obvious reasons) in a .env file; <br> if you want to learn how to do that, [check out this link](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs). 
 <br>
 Also, it's hosted with a headless RasPi 3 and PM2.
 <br>
 
 ## List of commands:
 
**g.help** - Lists commands
 
**g.baz @user / g.bazorpa @user** - Sends that dumb cretin to bazorpa: custom command for [the "gamer" server](https://discord.gg/nJQvwGb32g) (it wont work if the command is used in any other server, due to a variable containing a specific ID of the voice channel, although I might eventually make `..args` into an array so that you can add a custom ID to your own Bazorpa)

**b @user** - Shortened bazorpa command, please don't abuse this since you will likely piss everyone off and probably regret it

**g.ping** - Responds with a funny text

**g.customer [num]** - Try guessing what this does

**g.spam** - Starts spamming

**g.stopspam** - Stops spamming

**g.simo / cavo / mattia / gab / sigghy** - A random picture of whatever name you include
 
**g.website** - Link to the epic Ghetti website
 
**g.chat** - Link to Ghetti Chat
 
**g.creator** - Link to my website
 
<br>

## List of commands:


If you want to run it with your own token, check that you have all of the required dependencies and then run:
> # `npm run dev` <br>
('dev' is a nodemon command script I added to `package.json` for comodity while making the bot)
<br> 
<br> 
The only perms this will ask for is to manage channels and it's for the bazorpa channel, at least for now.
<br>
<br>
In `package.json`, the discord.js is interchangeable to 16.6.0 or whichever you need, just crosscheck bot.js with the documentation, because class properties like client.on(message, callback) are VERY prone to changes (even the Client constructor can easily change between versions).
