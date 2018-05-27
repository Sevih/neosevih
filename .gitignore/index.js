const Discord = require("discord.js");
const http = require('http');
const net = require('net');
const url = require('url');

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
    'gladiator':'<:gladiator:450291221919957019>',
    'moonlord':'<:moonlord:450291222125215745>',
    'barbarian':'<:barbarian:450290788270604308>',
    'saint':'<:saint:450291222515286016>',
    'blood phantom':'<:bloodphantom:450295959751098370>',
    'inquisitor':'<:inquisitor:450291222137929730>',
    'illumia':'<:warmage:450291222658154516>',
    'destroyer':'<:destroyer:450291221974220801>',
    'ruina':'<:ruina:450291222141992974>',
    'oracle elder':'<:oracleelder:450291221970026498>',
    'boadicea':'<:boadicea:450296593564827669>',
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

var elementEmote = {
    'fire': '<:fireE:436971296249741312>',
    'ice': '<:iceE:436971297205911553>',
    'light': '<:lightE:436971296014860289>',
    'dark': '<:darkE:436971296518045707>'
}

var idChan = {
    'général':'432160833020100610',
};


bot.on('message', function(message) {
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substr(prefix.length+6).split(" ");
    //// *help - affichage des commandes
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Basique","!help : affiche les commandes du Bot\n!guide : guide des classes\n!rules : règles de la guilde\n!officier : liste des officiers de la guilde\n!info : info des boss et nest")
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
        .addField("__Passible de Kick__ :","-toute inactivité de plus de 20 jours pour laquelle vous n’aurez pas prévenu un officier.\n-tout non-respect des règles précédemment citées.\n-toute personne ne contribuant pas à la vie de la guilde.");
        message.channel.send("**Voici les règles de la guilde, merci de les lire :**");
        message.channel.send(help_embed);
        console.log('commande rules demandée.');
    }

    if (message.content === prefix + "officier"){
        var help_embed = new Discord.RichEmbed().setColor('#08ad00')
        .setTitle("__**Hiérarchie de la guide**__")
        .addField("__Guild Master (GM) :__","- Sevih "+classeEmote['gladiator'])
        .addField("__Veteran (Officier) :__","- Narutal "+classeEmote['destroyer']+"\n- Seishiro "+classeEmote['boadicea']+"\n- Dahren "+classeEmote['blood phantom'])
        message.channel.send(help_embed);
        console.log('commande officier demandée.');
    }
    if (message.content.startsWith(prefix + "info")){
        var request = require('request');
        if(message.content ===prefix + "info"){
            console.log('Commande info demandé');
            console.log('https://dn-project.fr/api/api');
            request('https://dn-project.fr/api/api', function (error, response, body) {
                if(error !== null){
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    message.channel.send("Commande info indisponible");
                    console.log('Commande info indisponible');
                    return false;
                }
                var phpObj = JSON.parse(body);
                if(phpObj.result === false){
                    message.channel.send("Vérifie la syntaxe parce que la y'as pas de résultats (!info pour de l'aide)");
                    console.log('Erreur de syntaxe');
                    return false;
                }
                message.channel.send(indexDesNest(phpObj)[0]);
                message.channel.send(indexDesNest(phpObj)[1]);
                console.log('Commande info executé');
                return true;
            });
        }
        var args = message.content.split(" ");
        var nestIdentity = (args[1] !== undefined) ? args[1] : "";
        var bossIdentity = (args[2] !== undefined) ? args[2] : "";
        var modeIdentity = (args[3] !== undefined) ? args[3] : "";
        
        var regexeAlpha = '' ;
        var regexNum = '';

        if(!/^[a-z]*$/i.test(nestIdentity)){
            message.channel.send("Vérifie la syntaxe parce que la y'as pas de résultats (!info pour de l'aide)");
                    console.log('Erreur de syntaxe');
                    return false;
        }
        if(!/^[0-9]*$/.test(bossIdentity)){
            message.channel.send("Vérifie la syntaxe parce que la y'as pas de résultats (!info pour de l'aide)");
                    console.log('Erreur de syntaxe');
                    return false;
        }
        if(!/^[0-9]*$/.test(modeIdentity)){
            message.channel.send("Vérifie la syntaxe parce que la y'as pas de résultats (!info pour de l'aide)");
                    console.log('Erreur de syntaxe');
                    return false;
        }
        if(nestIdentity !== "" && bossIdentity ==="" && modeIdentity ===""){
            console.log('Commande info nest demandé');
            console.log('https://dn-project.fr/api/api?nest='+nestIdentity);
            request('https://dn-project.fr/api/api?nest='+nestIdentity, function (error, response, body) {
                if(error !== null){
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    message.channel.send("Commande info nest indisponible");
                    console.log('Commande info nest indisponible');
                    return false;
                }
                var phpObj = JSON.parse(body);
                if(phpObj.result === false){
                    message.channel.send("Vérifie la syntaxe parce que le nest "+nestIdentity+" n'existe pas (!info pour de l'aide)");
                    console.log('Erreur de syntaxe pour !info nest');
                    return false;
                }
                message.channel.send(infoNest(phpObj,nestIdentity));
                console.log('Commande info nest executé');
                return true;
            });
        }

        if(bossIdentity !== "" && nestIdentity !== "" && modeIdentity ===""){
            console.log('Commande info nest boss demandé');
            console.log('https://dn-project.fr/api/api?nest='+nestIdentity+"&boss="+bossIdentity);
            request('https://dn-project.fr/api/api?nest='+nestIdentity+"&boss="+bossIdentity, function (error, response, body) {
                if(error !== null){
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    message.channel.send("Commande info nest boss indisponible");
                    console.log('Commande info nest boss indisponible');
                    return false;
                }
                var phpObj = JSON.parse(body);
                if(phpObj.result === false){
                    message.channel.send("Vérifie la syntaxe parce que le boss "+bossIdentity+" dans le nest "+nestIdentity+" n'existe pas (!info pour de l'aide)");
                    console.log('Erreur de syntaxe pour !info nest boss');
                    return false;
                }
                message.channel.send(infoBoss(phpObj));
                console.log('Commande info nest boss executé');
                return true;
            });
        }

        if(bossIdentity !== "" && nestIdentity  !== "" && modeIdentity !== ""){
            console.log('Commande info nest boss mode demandé');
            console.log('https://dn-project.fr/api/api?nest='+nestIdentity+"&boss="+bossIdentity+"&mode="+modeIdentity);
            request('https://dn-project.fr/api/api?nest='+nestIdentity+"&boss="+bossIdentity+"&mode="+modeIdentity, function (error, response, body) {
                if(error !== null){
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    message.channel.send("Commande info nest boss mode indisponible");
                    console.log('Commande info nest boss mode indisponible');
                    return false;
                }
                var phpObj = JSON.parse(body);
                if(phpObj.result === false){
                    message.channel.send("Vérifie la syntaxe parce que le boss "+bossIdentity+" n'as pas de mode "+modeIdentity+" (!info pour de l'aide)");
                    console.log('Erreur de syntaxe pour !info nest boss');
                    return false;
                }
                message.channel.send(infoBossDetails(phpObj));
                console.log('Commande info nest boss mode executé');
                return true;
            });
        }
        
    }
});

bot.on('guildMemberAdd', member => {
    var help_embed = new Discord.RichEmbed().setColor('#08ad00')
        .addField("__Intégration :__","\n- vous **devez confirmer à** __**un des officier**__ (vétéran en jeu, la liste est accessible en écrivant \"!officier\" sur discord) que vous êtes français (soit par __message privé discord soit en jeu__).\n- votre pseudo discord doit être le même que le pseudo de votre personnage principal.\n- pour ajouter d’autre personnages dans la guilde vous devez avoir été **vérifié par un officier** et mettre dans vos informations personnelles en jeu le __pseudo de votre personnage principal__.\n \n ")
        .addField("__Règles Ingame & Discord__ :","-à moins de bien connaître votre interlocuteur, les sujets de discussions suivants sont interdits : politique, antisémitisme, racisme, homophobie, sexisme ou toute incitation à la haine et toutes les choses du genre…\n-ne soyez pas trop susceptible non plus, les MMO sont remplis de trolls donc sachez relativiser.")
        .addField("__Règles Discord__ :","-utilisez les salons appropriés pour vos sujets de discussion.\n-réglez votre micro de façon à ne pas exploser les oreilles de vos interlocuteurs et de ne pas faire un remix de R2D2 croisé avec Jabba le Hutt.")
        .addField("__Passible de Kick__ :","-toute inactivité de plus de 20 jours pour laquelle vous n’aurez pas prévenu un officier.\n-tout non-respect des règles précédemment citées.\n-toute personne ne contribuant pas à la vie de la guilde.");

    member.guild.channels.get(idChan['général']).send('Bienvenue **' + member.user.username + '** dans la guilde!'); 
    member.guild.channels.get(idChan['général']).send("**Voici les règles de la guilde, merci de les lire :**");
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


function indexDesNest(json){
    delete json.status;
    console.log(json);
    var help_embed = new Discord.RichEmbed().setColor('#08ad00').setTitle('Liste des Nest & Abbréviations');
    for(var propertyName in json) {
        var text = "";
        var lv = json[propertyName];
        for(var nest in lv) {
            var detailNest = lv[nest];
            text+= detailNest.nom+" : "+nest+" ("+detailNest.nbBoss+" boss)\n" ;
        }
        help_embed.addField("__Cap "+propertyName+"__ :",text);
     }
    var help_embed2 = new Discord.RichEmbed().setColor('#425ff4')
    .addField("__Syntaxe__ :","!info [abbréviation] [boss n°] [mode]")
    .addField("__boss n°__ :","type : chiffre \nlibellé : numero du boss \n")
    .addField("__mode__ :","0 : normal \n1 : hardcore \n2 : hell \n3 : normal 8 joueurs \n4 : hardcore 8 joueurs")
    .addField("__Exemples__ :","__!info__ : affiche le mode d'emploi \n__!info rune__ : affiche les infos du Rune Dragon Nest \n__!info rune 4__ : affiche les infos de Mamon (4eme boss du rune dragon nest) \n__!info rune 4 3__ : affiche les infos **détaillées** de Mamon en mode NM 8 joueurs (4eme boss du rune dragon nest)");
    return [help_embed,help_embed2];
}

function infoNest(json,nest){
    var infoduNest = json[nest];
    var nestThumbnail = infoduNest.image;
    var listeBoss = '';
    var listeMode = '';
    for(var indiceBoss in infoduNest.boss) {
        listeBoss += indiceBoss+" : "+infoduNest.boss[indiceBoss]+"\n";
    }
    for(var indiceMode in infoduNest.mode) {
        listeMode += indiceMode+" : "+infoduNest.mode[indiceMode]+"\n";
    }
    var help_embed = new Discord.RichEmbed().setColor('#08ad00')
    .setAuthor('Dn-Project','https://dn-project.fr/assets/images/icon.png','https://dn-project.fr/')
    .setThumbnail(infoduNest.image)
    .setTitle(infoduNest.nom+" Nest")
    .setURL('https://dn-project.fr/')
    .setDescription("Cap : level "+infoduNest.lv+"\nAbréviation : "+nest)
    .addField(" __Mode de difficulté__ ("+infoduNest.nbMode+")",listeMode,true)
    .addField("__Boss__ ("+infoduNest.nbBoss+")",listeBoss,true);
    return help_embed;
}

function infoBoss(json){
    console.log(json);
    var listeMode = '';
    var elementRes = '';
    for(var indiceMode in json.mode) {
        listeMode += indiceMode+" : "+json.mode[indiceMode]+"\n";
    }
    for(var indiceElem in json.element) {
        if(json.element[indiceElem] !== null){
            elementRes += elementEmote[indiceElem]+" : "+json.element[indiceElem]+"% \n";
        }
    }
    elementRes = (elementRes === '') ? "Aucune" : elementRes ;
    var phrase = (json.phrase === '') ? "Aucune" : json.phrase ;
    var occupation = (json.occupation === '') ? "Aucune" : json.occupation ;
    var phobie = (json.phobie === '') ? "Aucune" : json.phobie ;
    var plat = (json.plat === '') ? "Aucun" : json.plat ;
    var peche = (json.peche === '') ? "Aucune" : json.peche ;
    var help_embed = new Discord.RichEmbed().setColor('#08ad00')
    .setAuthor('Dn-Project','https://dn-project.fr/assets/images/icon.png','https://dn-project.fr/')
    .setThumbnail(json.image)
    .setTitle(json.boss)
    .setURL('https://dn-project.fr/')
    .setDescription("Level "+json.lv+"\nLocalisation : "+json.nom+" Nest")
    .addField(" __Mode de difficulté__ ("+json.nbMode+")",listeMode,true)
    .addField(" __Résistance Elementaire__ ",elementRes,true)
    .addField(" __Phrase favorite__ ",phrase,false)
    .addField(" __Occupation favorite__ ",occupation,false)
    .addField(" __Phobie__ ",phobie,false)
    .addField(" __Plat préféré__ ",plat,false)
    .addField(" __Anecdote__ ",peche,false);
    return help_embed;
}

function infoBossDetails(json){
    console.log(json);
    var elementRes = '';

    for(var indiceElem in json.element) {
        if(json.element[indiceElem] !== null){
            elementRes += elementEmote[indiceElem]+" "+json.element[indiceElem]+"%";
        }
    }
    elementRes = (elementRes === '') ? "Aucune" : elementRes ;
    var help_embed = new Discord.RichEmbed().setColor('#08ad00')
    .setAuthor('Dn-Project','https://dn-project.fr/assets/images/icon.png','https://dn-project.fr/')
    .setThumbnail(json.image)
    .setTitle(json.boss)
    .setURL('https://dn-project.fr/')
    .setDescription("Level "+json.lv+"\nLocalisation : "+json.nom+" Nest\nMode : "+json.mode)
    .addField(" __Résistance Elementaire__ ",elementRes,true)
    .addField(" __Points de vie (HP)__ ",json.hp)
    .addField(" __Attaque Physique__ ",json.atkP)
    .addField(" __Attaque Magique__ ",json.atkM)
    .addField(" __Défense__ ",json.defence);
    return help_embed;
}
