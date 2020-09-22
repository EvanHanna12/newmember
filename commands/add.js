const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "addbal",

  aliases: ["addcoins"],

  description: "adds coins to an user, owner only.",

  execute: async(client, message, args, data, db) => {

   

    let owners = config.ownersID;

    //let data = await get(member, member.user)

    

    if (!owners.includes(message.author.id)) return

  

    let pay = Number(args[0])

    

    if (!pay || isNaN(pay)) return message.channel.send(`Invalid amount of coins were provided.`)

    

    let user = message.mentions.users.first() || message.author

    

    message.channel.send(`[Owner-Command] You've added ${pay} coins to ${user.tag}.`)

    

    db.add(`coins_${user.id}`, pay) 

  } 

}