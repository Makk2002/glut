const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const xp = require("./xp.json");
const fs = require("fs");


const bot = new Discord.Client();

bot.on('ready', async () => {
  console.log(`${bot.user.username} jest online!`);
  bot.user.setGame("Morduje Klase D");
});

bot.on("message", async message => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}przywitaj`){
    return message.channel.send("Cześć!");
  }


  if(cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first()  || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Nie znaleziono użytkownika");
    let reason = args.join(" ").slice(22);

    let reportembed = new Discord.RichEmbed()
    .setDescription("**Report**")
    .setColor("#cc0000")
    .addField("Zreportowany", `${rUser} ID: ${rUser.id}`)
    .addField("Reportujący", `${message.author} ID: ${message.author.id}`)
    .addField("Na Kanale", message.channel)
    .addField("Czas", message.createdAt)
    .addField("Powód", reason);

    let reportschannel = message.guild.channels.find(`name`, "reported");
    if(!reportschannel) return message.channel.send("Nie znaleziono kanału reportów");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportembed);

    return;
  }

  if(cmd === `${prefix}`){

    let bicon = bot.user.displayAvatarURL;
    let helpembed = new Discord.RichEmbed()
    .setDescription("**Pomoc**")
    .setColor("#cc0000")
    .setThumbnail(bicon)
    .addField("serverinfo", ["Wyświetla informacje o serwerze"])
    .addField("botinfo", ["Wyświetla informacje o bocie"])
    .addField("przywitaj", ["Wysyla wiadomość ``Cześć!`` "])
    .addField("report", ["Wysyła reporta na gracza"]);

    return message.channel.send(helpembed);


  }


  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("**Informacje o Serwerze**")
    .setColor("#cc0000")
    .setThumbnail(sicon)
    .addField("Nazwa Servera", message.guild.name)
    .addField("Ilość Użytkowników", message.guild.memberCount)
    .addField("Server Powstał", message.guild.createdAt)
    .addField("Dołączyłeś", message.member.joinedAt);

    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Informacje o Bocie")
    .setColor("#cc0000")
    .setThumbnail(bicon)
    .addField("Nazwa Bota", bot.user.username)
    .addField("Bot Stworzony", bot.user.createdAt);

    return message.channel.send(botembed);
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Poziom!")
    .setColor("#cc0000")
    .addField("Nowy Poziom!", curlvl + 1);

    message.channel.send(lvlup);
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });


})

bot.login(botconfig.token);
