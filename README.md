# GhettiBot
 Bot made as a spiritual successor to MazziottiBot, but letting it keep its own functionalities. Most of the code is commented, and the npm requirements are commented at the top of `bot.js`
 
 The prefix is `g!`
 
 I used an environment variable for the token (omitted from the repo for obvious reasons) in a .env file; <br> if you want to learn how to do that, [check out this link](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs). 
 <br>
 
 ## List of commands:
 
**g!help** - Lists commands
 
**g!baz @user / g!bazorpa @user** - Sends that dumb cretin to bazorpa: custom command for [the "gamer" server](https://discord.gg/nJQvwGb32g) (it wont work if the command is used in any other server, due to a `const` variable containing a specific ID of the voice channel)

**g!ping** - It's a surprise

**g!customer [num]** - Try guessing what this does
 
**g!website** - Link to the epic Ghetti website
 
**g!chat** - Link to Ghetti Chat
 
**g!creator** - Link to my website, open it or you're a gnome
 
<br>

## To add it to your server, [click here](https://discord.com/api/oauth2/authorize?client_id=941733393228505158&permissions=8&scope=bot).

<br>

If you want to run it with your own token, check that you have all of the required dependencies and then run `npm run dev` <br>
('dev' is a script I added in `package.json` for a nodemon script for comodity while making the bot)
