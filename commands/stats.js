const Discord = require("discord.js");

const ms = require("parse-ms");

const config = require("../config.json");

module.exports = {

  name: "stats",

  aliases: ["stats"],

  description: "shows the stats of Advice Bot.",

  execute: async (client, message, args, data, db) => {

    let ownersID = config.ownersID;

    let owners = [];

    ownersID.map(x => owners.push(client.users.get(x).tag));

    // let usersCount = await client.shard.fetchClientValues("users.size")

    //  let serverCount = await client.shard.fetchClientValues('guilds.size')

    let uptime = [];

    Object.entries(ms(client.uptime)).map((x, y) => {

      if (x[1] > 0 && y < 4) uptime.push(`**${x[1]} ${x[0]}**`);

    });

    let embed = new Discord.RichEmbed()

      .setColor(config.embedColor)

      .setTitle(`${client.user.username} Info/Stats`)

      .setThumbnail(client.user.displayAvatarURL)

      .addField(` Bot Owners `, owners.join("\n"), false)

      .addField(` Library `, `Discord.js - v12.2.0`, false)

      //.addField(`<a:emoji_197:744025240618926140> Memory Usage:`, (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + "MB", false)

      .addField(`Servers Count `, client.guilds.size.toLocaleString(), false)

      /*  .addField(

        `Users Count`,

        client.bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),

        true

      )*/
  /*  .addField(
        `Kullanıcılar`,
        client.bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
        true
      )*/
   /* .addField(
        `User Count`,
       client.bot.guild.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
        true
      )*/

      .addField(`Users Count `, client.users.size.toLocaleString(), false)

      //.addField(`<a:greenbut:725284803087433789>Shards Count:`, `Uninplemented`, false)

      .addField(`Uptime `, uptime.join(", "), false);

    message.channel.send(embed);

  }

};