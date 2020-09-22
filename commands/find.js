const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "find",
  description: "displays 3 servers to join in and gain coins.",
  aliases: ["f"],
  execute: async(client, message, args, data, db) => {
   
    let orders = await db.all().filter(data => data.ID.startsWith(`orders_`)).sort((a, b) => b.data - a.data);
    
    let length = 1
    
    orders = orders.filter(x => x.data > 0 && client.guilds.get(x.ID.split("_")[1]) && client.guilds.get(x.ID.split("_")[1]).members.get(message.author.id) === undefined)
    
    let embed = new Discord.RichEmbed()
    .setColor(config.embedColor)
    .setTitle(`__SERVERS TO JOIN AND EARN COINS__`)
    .setDescription(`You'll get 1 coins per server joined,  if you leave before 3 days have passed you will lose 2 coins.\n\n __**List Of Servers**__`)
       for (let i = 0;i < orders.length;i++) {
     
         let handler = true
         
      	if (length > 3) {} else {
 
        	let id = orders[i].ID.split("_")[1]
        
        	let guild = client.guilds.get(orders[i].ID.split("_")[1]).name
        
       	 // let code = await db.fetch(`code_${id}`)
        let code = await db.fetch(`code_${message.guild.id}`)
          
       		await client.fetchInvite("https://discord.gg/" + code)
          .then(link => { 
           // console.log(link.code)
            if (link.code === null) handler = false 
          })
          .catch(error => {
            handler = false 
          }) 
          
          await new Promise(resolve => setTimeout(resolve, 1))
          
        	if (handler) {
        		let description = await db.fetch(`description_${id}`)
        
        		embed.addField(`**__${guild}__**`, description, false)
       			length++
        } 
      } 
    } 
 
    embed.addField(` **__Users+ Support Server__**`, `https://discord.gg/f2VrDkR`, false)
    
    embed.addField(`There is No Servers to Join ?`, `There probably isn't any Guild Available for you to Join, Try after 5 mins Later`, false)
    
    message.channel.send(embed)  
  } 
} 