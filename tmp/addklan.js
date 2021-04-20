const Commando = require('discord.js-commando')
const klanSchema = require('@schemas/klan-schema')

module.exports = class addxyzCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'addxyz',
      group: 'moderation',
      memberName: 'addxyz',
      //userPermissions: ['ADMINISTRATOR'],
      description: 'Dodawnaie xyzowiczów',
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    
      const {channel, guild} = message
      var guildId = guild.id
      
      if (!message.member.roles.cache.some(role => role.id === '560554297809567755')) return channel.send("Komendy administracyjne!")
      
      //var xyzowicz = []
	  
	  var kanal = message.mentions.channels.first().id
	  var wlasc = message.mentions.users.first().id
	  
	  const klann = await klanSchema.findOne(
      {
        guildId,
        kanal,
		wlasc,
      })
    if (klann!=null){
    await klanSchema.findOneAndUpdate(
       {
        guildId,
        kanal,
		wlasc,
      },   
      {
        guildId,
        kanal,
		wlasc,
      },
      {
        upsert: true,
        new: true,
      })
    }
  
      /*for (var i= 0; i <= (args.length-1); i++ ) {
          xyzowicz[i] = args[i]
          console.log("xyzowicz", xyzowicz[i])

          const xyz = await xyzowiczeSchema.findOne({
              guildId,
              xyzowicz: xyzowicz[i],
          })
          console.log(xyz)
          if (xyz != null) {
              channel.send("Xyzowicz " + xyzowicz[i] + " już istnieje!")
          }
          else {
              await xyzowiczeSchema.findOneAndUpdate({
                  guildId,
                  xyzowicz: xyzowicz[i],
              },
                  {
                      guildId,
                      xyzowicz: xyzowicz[i],
                  },
                  {
                      upsert: true,
                      new: true,
                  })
              channel.send("Xyzowicz " + xyzowicz[i] + " został pomyślnie dodany.")
          }
      }
      console.log(xyzowicz.length)
      if (xyzowicz.length == 0) {
          return message.reply("Nie został wpisany żaden xyzowicz! Składnia '<!addxyz> <nazwa_xyzowicza> <nazwa_xyzowicza> <nazwa_xyzowicza> itd.'")
      }*/
  
  }
}