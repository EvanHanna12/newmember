const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "remove",

  aliases: ["subtractcoins"],

  description: "removed coins from a user, owner only.",

  execute: async(client, message, args, data, db) => {

   

    let owners = config.ownersID;

    

    if (!owners.includes(message.author.id)) return

  

    let pay = Number(args[1])

    

    if (!pay || isNaN(pay)) return message.channel.send(`Invalid amount of coins were provided.`)

    

    let user = client.users.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.slice(0, user.username.split(" ").length).join(" ").toLowerCase())) || client.users.get(args[0]) || message.mentions.users.first()

    

    message.channel.send(`You've subtracted ${pay} coins from ${user.tag}.`)

    

    db.subtract(`coins_${user.id}`, pay) 

  } 

}