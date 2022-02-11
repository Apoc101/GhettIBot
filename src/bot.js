// To run you need npm, nodejs, discordjs, nodemon (for the devscript)
// To start: npm run dev

// Some commands require Administrator priviledge

// Require the enviroment variables which include the token (added to the .gitignore :troll:)
require("dotenv").config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Create a prefix variable
const PREFIX = "g!";

// When the client is ready, run this code
client.once('ready', () => {
	console.log('Ao sono pronto');
    client.user.setActivity('g!help for the customer', ({type: "WATCHING"}))
});

// On message, 
client.on('message', (message) => {
    if (message.author.bot) return; //if the message was sent by a bot, end function
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content  //CMD_NAME is the command name, and ...args is the .trim, .substring etc (basically what comes after the command)
            .trim() //make it look nicer with trim
            .substring(PREFIX.length) //substring the message after the prefix length (in case i want to modify the prefix)
            .split(/\s+/); //split at a regular expression of a white space
        
        if(CMD_NAME === 'help' || CMD_NAME === 'aiuto'){ //help command, nothing too special; the 'English:' is all the way back there because of weird discord formatting
            message.channel.send(`
            Italian:
            > **g!aiuto** - Mostra questo messaggio di merda
            > **g!baz @utente / g!bazorpa @utente** - Bazorpizza quella persona (che idiota)
            > **g!ping** - Sorpresina
            > **g!customer <num>** - Indovina cosa fa
            > **g!sito** - Link del sito epico di Ghetti
            > **g!chat** - Link per Ghetti Chat
            > **g!creator** - Link per il mio stupido sito, aprilo o sei un nano

English: 
            > **g!help** - Shows this dumb message
            > **g!baz @user / g!bazorpa @user** - Sends that dumb cretin to bazorpa (custom command for the gamers' server, it won't work if you're not in https://discord.gg/nJQvwGb32g)
            > **g!ping** - It's a surprise
            > **g!customer <num>** - Try guessing what this does
            > **g!website** - Link to the epic Ghetti website
            > **g!chat** - Link to Ghetti Chat
            > **g!creator** - Link to my website, open it or you're a gnome

Bot made by Gabriel aka Gibgab with <3
            `);
        }

        if(CMD_NAME === 'baz' || CMD_NAME === 'bazorpa'){ //this command requires admin and to be in the gamers' server (https://discord.gg/nJQvwGb32g), if you're not in it catches the error
            
	    //if(!message.member.permissions.has('MANAGE_CHANNELS')) return; //check if messauge author has perms
	    
	    // the if statement on top of this was commented out because it's a small server, so there's no real need to make a check for moderation perms
		
            const member = message.mentions.members.first(); //constant value is the mentioned user to send to bazorpa
            const bazorpa = message.guild.channels.cache.find(c => c.id === '846767184390520882'); //set a bazorpa constant with the voice.channel id, then a find wiuth a lambda function (canche.find as of discord.js 12.x)
            if(!member) return message.reply('Specifica di chi cazzo stai parlando deficiente'); //check if member was mentioned
            if(!member.voice.channel) return message.reply("Questo idiota non c'e' in vocale"); //check if member mentioned is in a vc
            if(!message.member.voice.channel) return message.reply("NON SEI NEMMENO TE IN UNA VOCALE MADONNA SE SEI CRETINO"); //check if message author is in a vc
            try{
                member.voice.setChannel(bazorpa); //send the mentioned member to bazorpa
            }
            catch(error){      //this usually doesn't execute, but I'll keeep it here just in case
                message.channel.send("https://discord.gg/nJQvwGb32g");
            }
            message.channel.send("Ho spostato quel mutato del cazzo"); //send confirmation
        }
        if(CMD_NAME === 'ping'){
            message.reply("chi cazzo ti credi di essere? Gianfranco?"); //a funny
        }
        if(CMD_NAME === 'customer'){ //a second funny
            if(args<=30){
                customer(args, message);
            } else{
                message.channel.send("Those are a bit too many customers / Sono troppi customer quelli eh (max 30)");
            }

        }

        // Self advertisement:
        if(CMD_NAME === 'sito' || CMD_NAME === 'website'){ //redirect to ghetti.online
            message.channel.send('https://ghetti.online');
        }
        if(CMD_NAME === 'chat'){ //redirect to ghetti chat
            message.channel.send("http://chat.ghetti.online YES I KNOW THERE'S NO TLS CERTIFICATE BUT I DONT WANT TO GIVE HEROKU MONEY / SI LO SO, NESSUN TLS, PERO' SONO POVERO E NON VOGLIO USARE I MIEI SOLDI SU HEROKU");
        }
        if(CMD_NAME === 'creator'){
            message.channel.send("https://gabmort.me");
        }
    }
});

function customer(times, message){ //referenced in the customer command
    for(var i=0; i<times; i++){
        message.channel.send("WHO WAS???");
    }
}

// Login to Discord with the client's token
client.login(process.env.DISCORDJS_TOKEN);

