const Discord = require("discord.js");

const { RichEmbed } = require("discord.js");

const config = require('../config.json')

module.exports = {

  name: "prefix",

  aliases: ["prefix"],

  description: "Sets a custom prefix for your server",

  execute: async (client, message, args, data, db) => {

    let owners = config.ownersID;

    //let data = await get(member, member.user)

    

    if (!owners.includes(message.author.id)) return

    if(!args[1]){

      message.channel.send('You must need to provide a prefix to change');

      return;

    }

    let prefix = args.join(" ");

    if (!message.member.hasPermission("MANAGE_GUILD"))

      return message.channel.send(`You need manage guild permissions `);

     let embed = new RichEmbed()

        .setTitle("New Prefix")

        .setColor(config.embedColor)

        .setDescription(`You have changed the servers prefix to **${prefix}**`)

        .setFooter(message.author.tag);

      message.channel.send(embed);

    db.set(`prefix_${message.guild.id}`, prefix);

  }

};