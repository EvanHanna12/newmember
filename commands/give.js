const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "give",

  aliases: ["give"],

  description: "gives an amount of given variable to given user.",

  execute: async(client, message, args, data, db) => {

   

    let owners = config.ownersID 

    

    if (!owners.includes(message.author.id)) return

    

    let user = message.mentions.users.first() || message.author

    

    let variable = args[0]

    

    let value = args[1]

    

    if (!value || isNaN(value)) return message.channel.send(`Usage: \`-give [variable] [amount] [@user]\``)

    

    db.set(`${variable}_${user.id}`, Number(value))

    

    let embed = new Discord.RichEmbed()

    .setColor(process.env.PINK)

    .setTitle(`Succesfully Payed ${variable} to ${user.tag}`)

    .setDescription(`You've set ${variable} value of ${user} to ${value}`)

    message.channel.send(embed) 

  } 

} 