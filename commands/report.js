const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "report",

  aliases: ["report"],

  description: "used to report bugs of the bot that you saw.",

  execute: async(client, message, args, data, db) => {

   

    let embed = new Discord.RichEmbed()

    .setColor(config.embedColor)

    .setTitle(`Have you found a bug?`)

    .setDescription(`Try reporting the bug in 2 Minutes ! else this report will get expire ! if your bug is founded good to developer team then you will be rewarded coins according to bug`)

    .setThumbnail(client.user.displayAvatarURL)

    .setFooter(`${client.user.username} Report System.`)

    message.channel.send(embed)

    .then(msg => {

     

      let filter = m => m.author.id === message.author.id

      

      msg.channel.awaitMessages(filter, { max: 1, errors: ["time"], time: 120000 })

      .then(collected => {

        let message = collected.first()

        message.channel.send(`${message.author} your report has been successfully sent to our Developers Team.`)

        let channel = client.channels.get(config.reportChannelID)

        

        let embed = new Discord.RichEmbed()

        .setColor(config.embedColor)

        .setTitle(`Bug Report by ${message.author.tag}:`)

        .setDescription(message.content)

        .setFooter(`${client.user.username} Report System.`)

        .setThumbnail(client.user.displayAvatarURL)

        channel.send(embed) 

      })

      .catch(error => {

        return message.channel.send(`${message.author} your 2 minutes are done.`)

      }) 

    }) 

  } 

} 