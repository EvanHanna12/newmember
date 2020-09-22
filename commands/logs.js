const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "log",

  aliases: ["logs"], 

  description: "shows the log of coins.",

  execute: async(client, message, args, data, db) => {

   

    let page = Number(args[0]) 

    

    if (!page || isNaN(page) || page < 1) page = 1

      

    let obj = { min: page * 10 - 10, max: page * 10 }

    

    let tpages = 1

    

    let n = 10

    

    data.logs.map((x, y) => {

      if (y == 10) n += 10, tpages++

    })

    

    if (page > tpages) return message.channel.send(`Page not found.`)

    

    let logs = []

    

    data.logs.map((x, y) => {

      if (y >= obj.min && y < obj.max) logs.push(x)

    }) 

    

    let embed = new Discord.RichEmbed()

    .setColor(config.embedColor)

    .setTitle(`**__Transactions Of ${message.author.username}__** `)

    .setFooter(`Showing Page ${page} of ${tpages}`)

    .setDescription(logs.join("\n")) 

    message.channel.send(embed) 

  } 

} 