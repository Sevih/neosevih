const Discord = require("discord.js");

var bot = new Discord.Client();
bot.login(process.env.TOKEN);

bot.on('ready', () =>{
    console.log("Ok, prêt à basura des mères !!");
    bot.user.setActivity('Basura des mères !');
});
var randnum = 0;
var prefix = ('!');
var classeGuide = ['gladiator','moonlord','barbarian'];
var classeClass = {
    'gladiator':'Warrior',
    'moonlord':'Warrior',
    'barbarian':'Warrior',
};
var classeEmote = {
    'gladiator':'<:gladiator:432310951409352726>',
    'moonlord':'<:moonlord:432312622675918852>',
    'barbarian':'<:barbarian:432312622386380810>',
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
    "Mauvais choix, tu ferais mieux de changer de classe mais bon : ",
    "Tes mates sont nazes et tu veux les carry ? Alors ce guide est pour toi : ",
    "T'en as marre de te sentir naze ? Laisse-moi être ton ami... juste cette fois : ",
    "Si t'as pas de dps, prends ça : ",
    "Encore toi ?! Tu sais rien jouer decidement :",
    "T'as pas de skill et t'es moche.... sois juste moche :",
];


bot.on('message', function(message) {
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substr(prefix.length+6).split(" ");
    //// *help - affichage des commandes
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Basique","!help : affiche les commandes du Bot\n!guide : guide des classes")
        .addField("Intercation","!Sardoche : une dose de Sel ?\n!miaou : vive les chats\n");
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
            case "barbarian":
                message.channel.send(quote+"\n https://dn-project.fr/class-guide/warrior/barbarian");
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
        message.channel.send("miaou");
        message.channel.send(".cat");
    }

    if (message.content === prefix + "Sardoche"){
        message.channel.send("Nique ta mère numéricable!\nNique ta mère Riot games!\nAllez tous vous faire enculer!");
        
    }

    if (message.content === prefix + "rules"){
        var help_embed = new Discord.RichEmbed().setColor('#08ad00')
        .addField("__Intégration :__","\n- vous **devez confirmer à** __**un des officier**__ (vétéran en jeu, la liste est accessible en écrivant \"!officier\" sur discord) que vous êtes français (soit par __message privé discord soit en jeu__).\n- votre pseudo discord doit être le même que le pseudo de votre personnage principal.\n- pour ajouter d’autre personnages dans la guilde vous devez avoir été **vérifié par un officier** et mettre dans vos informations personnelles en jeu le __pseudo de votre personnage principal__.\n \n ")
        .addField("__Règles Ingame & Discord__ :","-à moins de bien connaître votre interlocuteur, les sujets de discussions suivants sont interdits : politique, antisémitisme, racisme, homophobie, sexisme ou toute incitation à la haine et toutes les choses du genre…\n-ne soyez pas trop susceptible non plus, les MMO sont remplis de trolls donc sachez relativiser.")
        .addField("__Règles Discord__ :","-utilisez les salons appropriés pour vos sujets de discussion.\n-réglez votre micro de façon à ne pas exploser les oreilles de vos interlocuteurs et de ne pas faire un remix de R2D2 croisé avec Jabba le Hutt.")
        .addField("__Passible de Kick__ :","-toute activité de plus de 20 jours pour laquelle vous n’aurez pas prévenu un officier.\n-tout non-respect des règles précédemment citées.\n-toute personne ne contribuant pas à la vie de la guilde.");
        message.channel.send("**Voici les règles de la guilde, merci de les lires :**");
        message.channel.send(help_embed);
        console.log('commande rules demandée.');
    }

    if (message.content === prefix + "officier"){
        var help_embed = new Discord.RichEmbed().setColor('#08ad00')
        .setTitle("__**Hierachie de la guide**__")
        .addField("__Guild Master (GM) :__","- Dahren "+classeEmote['blood phantom']+" "+classeEmote['inquisitor'])
        .addField("__Veteran (Officier) :__","- Seefield "+classeEmote['moonlord']+" "+classeEmote['illumia']+"\n- Eco / Felyne "+classeEmote['oracle elder']+" "+classeEmote['ruina']+"\n")
        .addField("__Senior (Sous-officier) :__","- Memory "+classeEmote['saint']+" "+classeEmote['inquisitor']+"\n- Fred "+classeEmote['barbarian']+" "+classeEmote['destroyer']+"\n- Sevih "+classeEmote['gladiator']+"\n");
        message.channel.send(help_embed);
        console.log('commande officier demandée.');
    }
});

bot.on('guildMemberAdd', member => {
    var help_embed = new Discord.RichEmbed().setColor('#08ad00')
        .addField("__Intégration :__","\n- vous **devez confirmer à** __**un des officier**__ (vétéran en jeu, la liste est accessible en écrivant \"!officier\" sur discord) que vous êtes français (soit par __message privé discord soit en jeu__).\n- votre pseudo discord doit être le même que le pseudo de votre personnage principal.\n- pour ajouter d’autre personnages dans la guilde vous devez avoir été **vérifié par un officier** et mettre dans vos informations personnelles en jeu le __pseudo de votre personnage principal__.\n \n ")
        .addField("__Règles Ingame & Discord__ :","-à moins de bien connaître votre interlocuteur, les sujets de discussions suivants sont interdits : politique, antisémitisme, racisme, homophobie, sexisme ou toute incitation à la haine et toutes les choses du genre…\n-ne soyez pas trop susceptible non plus, les MMO sont remplis de trolls donc sachez relativiser.")
        .addField("__Règles Discord__ :","-utilisez les salons appropriés pour vos sujets de discussion.\n-réglez votre micro de façon à ne pas exploser les oreilles de vos interlocuteurs et de ne pas faire un remix de R2D2 croisé avec Jabba le Hutt.")
        .addField("__Passible de Kick__ :","-toute activité de plus de 20 jours pour laquelle vous n’aurez pas prévenu un officier.\n-tout non-respect des règles précédemment citées.\n-toute personne ne contribuant pas à la vie de la guilde.");

    member.guild.channels.get(idChan['général']).send('Bienvenue **' + member.user.username + '** dans la guilde!'); 
    member.guild.channels.get(idChan['général']).send("**Voici les règles de la guilde, merci de les lires :**");
    member.guild.channels.get(idChan['général']).send(help_embed);
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
    return array[randnum];
}
