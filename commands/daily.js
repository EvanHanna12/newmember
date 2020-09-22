const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
let cooldown = new Map();

module.exports = {
  name: "daily",
  aliases: ["daily"],
  description: "get daily 2 coins ",
  execute: async(client, message, args, data, db) => {

    let time = Date.now(); 
    if(cooldown.get(message.author.id) > time)
    { 
      message.channel.send(`**${message.author.tag}** Has Already Got His Daily Coins`); 
      return;
    }

    
    
    db.add(`coins_${message.author.id}`, 2) 
    
    cooldown.set(message.author.id, time + 864000000);

    data.logs.unshift(`[+2] - Got Daily Bonus !`)

    message.channel.send(`The **${message.author.tag}** Has 2 coins as Daily Coins`)
  } 
} 