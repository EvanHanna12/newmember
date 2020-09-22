const Discord = require('discord.js');

const config = require('../config.json');

module.exports = {

  execute: async(client, guild) => {

    let channel = client.channels.get(config.JoinchannelID)

  

    let embed = new Discord.RichEmbed()

    .setColor(`RANDOM`)
    .setTitle("https://cdn.discordapp.com/attachments/758036298002071682/758040120233295932/standard.gif")

    .setTitle(`**Joined a Server!**`)

    .addField(`**Name**`, `**${guild.name}**`)

    .addField(`**Guild ID**`, `**${guild.id}**`)

    .addField(`**Users**`, `**${guild.memberCount}**`)

    .addField(`**Owner**`, `**${guild.owner.user.tag}**`)

    .addField(`**Owner ID**`, `**${guild.owner.id}**`)

    .setThumbnail(guild.iconURL)

    if (channel) channel.send(embed) 

  } 

} //discord