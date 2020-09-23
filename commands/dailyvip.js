const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
let cooldown = new Map();

module.exports = {
  name: "vipdaily",
  aliases: ["vipdaily"],
  description: "get daily 2 coins ",
  execute: async(client, message, args, data, db) => {
    if (!message.member.roles.has('717849660231778374')) return message.channel.send('To Use This Command You Must Have a Sponsored Role on My Support Server')

    let time = Date.now(); 
    if(cooldown.get(message.author.id) > time)
    { 
      message.channel.send(`**${message.author.tag}** Has Already Got His Daily Coins`); 
      return;
    }

    
    
    db.add(`coins_${message.author.id}`, 5) 
    
    cooldown.set(message.author.id, time + 864000000);

    data.logs.unshift(`[+5] - Got Daily Bonus !`)

    message.channel.send(`The **${message.author.tag}** Has 5 coins as Daily Coins`)
  } 
} 