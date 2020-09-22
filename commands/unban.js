const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "unban",

  description: "unbans an user from the bot, owner only.",

  execute: async(client, message, args, data, db) => {

    let owners = config.ownersID; 

      

    if (!owners.includes(message.author.id)) return

    

    let user = client.users.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.get(args[0]) || message.mentions.users.first()

    

    if (user === undefined) return message.channel.send(`Usage: \`-ban [@user/username/userID]\``)

    

    if (await db.fetch(`banned_${user.id}`) == true) message.channel.send(`${user.tag} has been unbanned from the bot.`)

    

    let banned = await db.fetch(`banned_${user.id}`)

    

    if (banned == false) return message.channel.send(`${user.tag} is not banned.`)

    

    db.set(`banned_${user.id}`, false)  

  } 

} 