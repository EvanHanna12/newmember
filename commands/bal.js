const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')

module.exports = {
  name: "balance",
  aliases: ["bal"],
  description: "displays the user's balance.",
  execute: async(client, message, args, data, db) => {
   
    let user = message.guild.members.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.get(args[0]) || message.mentions.users.first() || message.author
    
    //if we got an user by name, we must access to the user property 
    if (user.username === undefined) user = user.user
    
    data = await get(message, user)
    
    let logs = []
    
    data.logs.map((x, y) => {
      if (y < 10) logs.push(x)
    })
    
    let embed = new Discord.RichEmbed()
    .setColor(process.env.PINK)
    .setTitle(` ${user.username}'s Balance:`)
    .setDescription(`${user} you currently have  **__${data.coins.toFixed(2)}__** coins.\n\nIf you want to earn some coins to buy members then do \`-find\`|\`-f\`.\n\nYou can buy members For your server By : \n \`-ad [Coins] [Message]\``)
    //.setThumbnail(user.displayAvatarURL)
    .addField(`**__Dont want coins by Joining Server ?__** `, `Contact : \`Support Server\` To buy coins :) \nYou can vote the bot **__[Vote Users+]()__** and get 1 coins!\nBuy Lottery Ticket To test Your Luck : \`-ticket\`.`, false) 
    .addField(`**__Transactions__**`, logs.length == 0 ? "none" : logs.join("\n"))
    message.channel.send(embed) 
  } 
} 