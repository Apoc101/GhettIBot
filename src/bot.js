// To run you need npm, nodejs, discordjs, nodemon (for the devscript)
// To start: npm run dev

// Some commands require Administrator priviledge

// Require the enviroment variables which include the token (added to the .gitignore lol)
require("dotenv").config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Create prefixes variable
const PREFIX = "g.";
const bazPRE = "b";

// Initialize fs
const fs = require('fs');

// When the client is ready, run this code
client.once('ready', () => {
	console.log('Ao sono pronto');
    client.user.setActivity('g.help for the customer', ({type: "WATCHING"}))
});

// get controller for spam messages
let spamCtrl = require('./spamCtrl');


//faster bazorpa command (dangerous, might get commented out if it causes trouble)
client.on('message', (message) =>{
    if (message.author.bot) return; //check below function cluster for comments
    if (message.content.startsWith(bazPRE) && message.mentions.members) {
        const member = message.mentions.members.first();
            const bazorpa = message.guild.channels.cache.find(c => c.id === '846767184390520882'); 
            if(!member) return message.reply('Specifica di chi cazzo stai parlando deficiente'); 
            if(!member.voice.channel) return message.reply("Questo idiota non c'e' in vocale"); 
            if(!message.member.voice.channel) return message.reply("NON SEI NEMMENO TE IN UNA VOCALE MADONNA SE SEI CRETINO"); 
            try{
                member.voice.setChannel(bazorpa);
            }
            catch(error){      
                message.channel.send("https://discord.gg/nJQvwGb32g");
            }
            message.channel.send("Ho spostato quel mutato del cazzo"); 
    }
})

// On message, 
client.on('message', (message) => {
    if (message.author.bot) return; //if the message was sent by a bot, end function
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content  //CMD_NAME is the command name, and ...args is the .trim, .substring etc (basically what comes after the command)
            .trim() //make it look nicer with trim
            .substring(PREFIX.length) //substring the message after the prefix length (in case i want to modify the prefix)
            .split(/\s+/); //split at a regular expression of a white space (NOTE: interchangable with a normal empty string, but could cause some problems)
        
        if(CMD_NAME === 'help' || CMD_NAME === 'aiuto'){ //help command, nothing too special; the 'English:' is all the way back there because of weird discord formatting
            message.channel.send(`
            Italian:
            > **g.aiuto** - Mostra questo messaggio di merda
            > **g.baz @utente / g!bazorpa @utente** - Bazorpizza quella persona (che idiota)
            > **b @utente** - Comando del bazorpa piu' corto, per l'amor di cristo non abusate questa funzione
            > **g.ping** - Sorpresina
            > **g.customer <num>** - Indovina cosa fa
            > **g.spam** - Inizia a spammare
            > **g.stopspam** - Smette di spammare
            > **g.simo / cavo / mattia / gab / sigghy** - Foto di costui
            > **g.sito** - Link del sito epico di Ghetti
            > **g.chat** - Link per Ghetti Chat
            > **g.creator** - Link per il mio stupido sito, aprilo o sei un nano

English: 
            > **g.help** - Shows this dumb message
            > **g.baz @user / g!bazorpa @user** - Sends that dumb cretin to bazorpa (custom command for the gamers' server, it won't work if you're not in the server)
            > **b @user** - Shortened command for sending people to Bazorpa, for the love of God don't abuse this command
            > **g.ping** - It's a surprise
            > **g.customer <num>** - Try guessing what this does
            > **g.spam** - Starts spamming
            > **g.stopspam** - Stops spamming
            > **g.simo / cavo / mattia / gab / sigghy** - Pictures of whoever you tag
            > **g.website** - Link to the epic Ghetti website
            > **g.chat** - Link to Ghetti Chat
            > **g.creator** - Link to my website, open it or you're a gnome

Bot made by Gabriel aka Gibgab with <3
            `);
        }

        if(CMD_NAME === 'baz' || CMD_NAME === 'bazorpa'){ //this command requires admin and to be in the gamers' server (https://discord.gg/nJQvwGb32g), if the bot is not in it, an error is caught
            //if(!message.member.permissions.has('MANAGE_CHANNELS')) return; //check if messauge author has perms
            const member = message.mentions.members.first(); //constant value is the mentioned user to send to bazorpa
            const bazorpa = message.guild.channels.cache.find(c => c.id === '846767184390520882'); //set a bazorpa constant with the voice.channel id, then a find with a lambda function (canche.find as of discord.js 12.x)
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
                console.log(args);
            } else{
                message.channel.send("Those are a bit too many customers / Sono troppi customer quelli eh (max 30)");
            }

        }

        // spamming section, check spamCtrl for the functions
        // I could use a switch case here but honestly the gains are marginal

        if(CMD_NAME === 'spam'){
            spamCtrl.setChannel(message.channel);  //sets the channel var to the current channel
            spamCtrl.setStatus(true);              //sets the status bool to true
        }
        if(CMD_NAME === 'stopspam'){
            spamCtrl.setStatus(false);            //sets the status bool to false to stop spamming
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
        if(CMD_NAME === 'simo'){      // YES IT WOOOOOOOOOOOOORKSSSSSSSSSSSSSS
            const dirLength = getAllDirFiles("./simo").length;  //gets the count of files in the directory
            var nrand = Math.floor(Math.random() * dirLength);  //generates a random number based on the amount of files in the directory (so i get to add more files to the directory and not have to change all the code)
            message.channel.send("Ecco un simo.", {  
                files: [
                    "./simo/" + nrand + ".jpg" || ".jpeg" || ".png"  //sends a file based on the number that is generated
                ]
            });
        }
        if(CMD_NAME === 'cavo'){
            const dirLength = getAllDirFiles("./cavo").length;
            const nrand = Math.floor(Math.random() * dirLength);
            message.channel.send("Ecco un cavo.", {
                files: [
                    "./cavo/" + nrand + ".jpg"
                ]
            })
        }
        if(CMD_NAME === 'mattia'){
            const dirLength = getAllDirFiles("./mattia").length;
            const nrand = Math.floor(Math.random() * dirLength);
            message.channel.send("Ecco un mattia.", {
                files: [
                    "./mattia/" + nrand + ".jpg"
                ]
            })
        }
        if(CMD_NAME === 'gab'){
            const dirLength = getAllDirFiles("./gab").length;
            const nrand = Math.floor(Math.random() * dirLength);
            message.channel.send("Ecco un gab.", {
                files: [
                    "./gab/" + nrand + ".jpg"
                ]
            })
        }
        if(CMD_NAME === 'sigghy'){
            const dirLength = getAllDirFiles("./sigghy").length;
            const nrand = Math.floor(Math.random() * dirLength);
            message.channel.send("Ecco un jacopo.", {
                files: [
                    "./sigghy/" + nrand + ".jpg"
                ]
            })
        }
    }
});

function customer(times, message){ //referenced in the customer command
    for(var i=0; i<times; i++){
        message.channel.send("WHO WAS???");
    }
}


// I can't even explain each part of this code, I made this at 4 AM and really tired; pretty much it returns an array of files inside a directory
const getAllDirFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllDirFiles(dirPath + "/" + file, arrayOfFiles) 
        } else {
            arrayOfFiles.push(file)
        }
    })

    return arrayOfFiles
}

// Login to Discord with the client's token
client.login(process.env.DISCORDJS_TOKEN);

