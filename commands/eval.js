const Discord = require('discord.js')

module.exports = {
  name: "eval",
  description: "owner only",
  execute: async(client, message, args, data, db) => {
   
    if (message.author.id !== "475913938694045697" && message.author.id !== "" &&
message.author.id !==
"725800411172307015") return
    
    let ev = args.join(" ")
    
    try {
      message.channel.send(await eval(ev)) 
    } catch(e) {
      return message.channel.send(e.message) 
    } 
  } 
} 