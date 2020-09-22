const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  execute: async(client, db) => {
   
    console.log(`${client.user.tag} Ready bruh`)
 
    client.user.setActivity(`${config.prefix}help | ${client.guilds.size} Servers | ${client.users.size} Peoples`, { type: "WATCHING" }) 
    
  } 
}