const Discord = require('discord.js');

var bot = new Discord.Client();


bot.on('ready', () =>{
    console.log("Ok, prêt à basura des mères !!");
});

bot.login('process.env.TOKEN')

bot.on('message', message => {
    if(message.content === "ping"){
        message.reply("pong");
        console.log("ping / pong ok");
    }
});
