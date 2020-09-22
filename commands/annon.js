const Discord = require('discord.js')

module.exports = {

  name: "annon",

  description: "used to announced something in #announcements, owner only.",

  execute: async(client, message, args, data, db) => {

   

    let owners = ["725800411172307015","475913938694045697"]

    

    if (!owners.includes(message.author.id)) return

    

    let channel = message.guild.channels.find(channel => channel.name === "↬➕↫bot-info")

    

    if (!channel) return message.channel.send(`I didn't find the channel.`)

    

    let to = args.join(" ")

    

    if (!to) {

      return message.channel.send(`What shall I announce? Type \`cancel\` to cancel the announcement.`)

      .then(msg => {

        let filter = m => m.author.id === message.author.id

        

        msg.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ["time"]})

        .then(collected => {

          let message = collected.first()

          if (message.content.toLowerCase() === "cancel") return message.channel.send(`Operation canceled.`)

          else {

            message.channel.send(`Succesfully sent the announcement.`)

            let embed = new Discord.RichEmbed()

            .setColor(process.env.PINK)

            .setTitle(`New announcement:`) 

            .setDescription(message.content)

            .setThumbnail(client.user.displayAvatarURL)

            .setFooter(`Announcement made by ${message.author.tag}`) 

            channel.send(embed) 

          } 

        })

        .catch(collected => {

          return message.channel.send(`Operation canceled.`)

        }) 

      })

    } else {

      message.channel.send(`Succesfully sent the announcement.`)

      

      let embed = new Discord.RichEmbed()

      .setColor(process.env.PINK)

      .setTitle(`New announcement:`)

      .setDescription(to)

      .setThumbnail(client.user.displayAvatarURL)

      .setFooter(`Announcement made by ${message.author.tag}.`)

      channel.send(embed) 

    } 

  } 

} 