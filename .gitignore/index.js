const Discord = require("discord.js");

var bot = new Discord.Client();
bot.login(process.env.TOKEN);

bot.on('ready', () =>{
    console.log("Ok, prêt à basura des mères !!");
    bot.user.setActivity('Basura des mères !');
});
var randnum = 0;
var prefix = ('!');
var classeGuide = ['gladiator','moonlord'];
var classeClass = {
    'gladiator':'Warrior',
    'moonlord':'Warrior',
};
var classeEmote = {
    'gladiator':'<:gladiator:432310951409352726>',
    'moonlord':'<:moonlord:432312622675918852>',
};

var phraseClasse = [
    "Ben alors, on sait pas jouer sa classe ?! Cadeau : ",
    "Tu ferais bien de lire TRES attentivement ce guide : ",
    "Tiens ! Vas potasser : ",
    "On va finir par t'appeler 'Negative.DPS' si tu lis pas ça : ",
    "C'est une blague ? Je te croyais bon... Tiens : ",
    "Google est ton ami mais bon j'vais t'aider : ",
    "Nan mais allo quoi, t'as besoin d'un guide pour DPS ?! ",
    "Mec, j'arrive pas a jouer avec les singes alors tiens : ",
    "Mauvais choix, tu ferai de changer de classe mais bon : ",
    "Tes mates sont nazes et tu veux les carry ? Alors ce guide est pour toi : ",
    "T'en as marre de te sentir naze ? Laisse-moi être ton ami... juste cette fois : ",
    "Si t'as pas de dps, prends ça : "
];


bot.on('message', function(message) {
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substr(prefix.length+6).split(" ");
    //// *help - affichage des commandes
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Basique","*help : affiche les commandes du Bot\n")
        .addField("Intercation","*Sardoche : une dose de Sel ?\n*ping : une petite partie ?\n*Comment vas tu Neo Sevih ? : prenez des nouvelles\n");
        message.channel.send(help_embed);
        console.log('commande HELP demandée.');
    }


    //// *guide - listes des guides DN project
    if(message.content.startsWith(prefix + "guide")){
        var quote = randomArray(phraseClasse);
        switch (args[0]){
            case "gladiator":
                message.channel.send(quote+"\n https://dn-project.fr/class-guide/warrior/gladiator");
                break;
            case "moonlord":
                message.channel.send(quote+"\n https://dn-project.fr/class-guide/warrior/moonlord");
                break;


            default:
            var help_embed = new Discord.RichEmbed()
            .setColor('#f44242')
            .addField("syntaxe de la commande !guide","!guide [classe]\n");
            message.channel.send(help_embed);
            var classText = getAllClasse();
            message.channel.send("Guides disponibles :")
            message.channel.send(classText);
        }
    }
    //// Interaction
    if(message.content === prefix + "miaou"){
        console.log('miaou demandé');
        message.channel.send("miaou");
    }

    if (message.content === prefix + "Sardoche"){
        console.log('sardoche demandé.');
        message.channel.send("Nique ta mère numéricable!\nNique ta mère Riot games!\nAllez tous vous faire enculer!");
        
    }
});


function getAllClasse(){
    var help_embed = new Discord.RichEmbed().setColor('#D9F200');
    var classPrecedente = classeClass[classeGuide[0]];
    var titre = "";    var classeTexte="";
    classeGuide.forEach(element => {
        if(classPrecedente !== classeClass[element]){
            help_embed.addField(titre,classeTexte,true);
            classeTexte = "";
        }
        classeTexte += classeEmote[element]+element+"\n";
        classPrecedente = classeClass[element];
        titre = classeClass[element];
        if(classeGuide.indexOf(element) === (classeGuide.length-1)){
            help_embed.addField(titre,classeTexte,true);
        }
    });
    return help_embed;
}

function randomArray(array){
    min = 0;
    max = (array.length);
    randnum = Math.floor((Math.random() * max));
    console.log(randnum);
    return array[randnum];
}
