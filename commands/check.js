const Discord = require('discord.js')
const ms = require('parse-ms') 

module.exports = {
  name: "check",
  aliases: ["time"],
  description: "shows you the time left to be able to leave safety.",
  execute: async(client, message, args, data, db) => {
   
    let timeout = 259200000
    
    let time = []
    
    if (data.joinedDate !== null && timeout - (Date.now() - data.joinedDate) > 999) {
      Object.entries(ms(timeout - (Date.now() - data.joinedDate))).map((x, y) => {
        if (x[1] > 0 && y < 4) time.push(`**${x[1]} ${x[0]}**`)      })
      

      let embed = new Discord.RichEmbed()
      .setColor(process.env.PINK)
      .setTitle(`⏰Time | ${message.author.username} ⏰`)
      .setDescription(`You will lose coins if you leave now`)
      .addField(`⏰Time left:`, time.join(", "), false)
      message.channel.send(embed)    } else {
      let embed = new Discord.RichEmbed()
      .setColor(process.env.PINK)
      .setTitle(`⏰ Time | ${message.author.username} ⏰`)
      .setDescription(` You can leave this server Safely `)
      message.channel.send(embed) 
    } 
  } 
} 