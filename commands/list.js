const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "list",

  description: "displays the servers with more users in, owner only.",

  execute: async(client, message, args, data, db) => {

   

    let owners = config.ownersID; 

    let obj = [] 

    

    if (!owners.includes(message.author.id)) return

    

    client.guilds.map(async x => {

      //await x.fetchMembers() 

      obj.push({

        name: x.name,

        members: x.memberCount

      }) 

    }) 

   

    //await new Promise(resolve => setTimeout(resolve, 2500))

    

    let content = []

    

    let size = obj.length

    

    if (size > 10) size = 10

    

    obj = obj.sort((x, y) => y.members - x.members) 

    

    for (let i = 0;i < size;i++) {  

      content.push(`**__${i + 1}# - ${obj[i].name}__**:\n${obj[i].members} members.`) 

    }

    

    let embed = new Discord.RichEmbed()

    .setColor(process.env.PINK)

    .setTitle(`Servers List:`)

    .setDescription(content.join("\n")) 

    .setThumbnail(client.user.displayAvatarURL)

    .setFooter(`Top 10 server where i am in`) 

    message.channel.send(embed) 

  } 

} 