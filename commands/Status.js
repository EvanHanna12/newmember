const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "status",

  description: "change the status of the bot, owner only.",

  execute: async(client, message, args, data, db) => {

    let owners = config.ownersID; 

      

    if (!owners.includes(message.author.id)) return

    

    if (!args[0]) return message.reply('I need a message to set as watching.')

    if (args.join(" ").length > 100) return message.reply('That is too long of a message to set.')

    client.user.setActivity(args.join(" "), { type: "WATCHING"})

    message.channel.send(`Status Changed To : ${args.join(" ")}`) ;

    

    if(args[0] === 'normal'){

      client.user.setActivity(`${config.prefix}help | ${client.guilds.size} Servers | ${client.users.size} Peoples`, { type: "WATCHING" }) 

            }

  } 

} 