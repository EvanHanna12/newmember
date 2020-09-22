const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "ban",

  description: "bans an user from using the bot, owner only.",

  execute: async(client, message, args, data, db) => {

    let owners = config.ownersID;

    

    if (!owners.includes(message.author.id)) return

    

    let user = client.users.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.slice(0, user.username.split(" ").length).join(" ").toLowerCase())) || client.users.get(args[0]) || message.mentions.users.first()

    

    if (user === undefined) return message.channel.send(`Usage: \`-ban [@user/username/userID] [reason]\``)

    

    let reason = args.slice(user.username.split(" ").length).join(" ")

    

    if (!reason) reason = `Not provided.`

    

    message.channel.send(`${user.tag} has been banned from using the bot.\nReason: \`${reason}\``)

    

    user.send(`You have been banned from ${client.user.username} for \`${reason}\`.`)

    .catch(error => {

      return message.channel.send(`This user has dms closed!`) 

    })

    

    db.set(`banned_${user.id}`, true) 

  } 

} 