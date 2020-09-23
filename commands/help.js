const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "help",

  aliases: ["help"],

  description: "displays the bot commands list.",

  execute: async(client, message, args, data, db) => {

          let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ".";

    let text = []

    

    let owners = ["725800411172307015","475913938694045697"] 

    

    client.commands.map(x => {

      if (!x.description.includes("owner") || owners.includes(message.author.id)) text.push(`**__${prefix}${x.name} - [${x.aliases ? x.aliases : "none"}]__**:\n${x.description}`)

    }) 

    

    let embed = new Discord.RichEmbed()

    .setColor(config.embedColor)
    
    .setImage("https://cdn.discordapp.com/attachments/758036298002071682/758040120233295932/standard.gif")

    .setTitle(`${client.user.username} Commands List`)

    .setThumbnail(client.user.displayAvatarURL)

    .setDescription(`

    • \`-bal\`  : To get your balance\n**Usage:** \`>bal\`

    • \`-find\` : To find some server to join and get coins\n**Usage:** \`-find\`

    • \`-pay\`  : To pay some coins to user\n**Usage:** \`-pay [User] [Coins]\`

    • \`-give\` : You can give your own coin to a friend or someone with this command\n**Usage:** \`-give [User] [Coin]\`

    • \`-ad\` : To buy members for your server\n**Usage:** \`-ad [Coins] [Any message]\`

    • \`-check\` : To check that you can leave joined server safely without lossing coins\n**Usage:** \`>check\`

    • \`-daily\` : To get daily coins\n**Usage:** \`-daily\`

    • \`-vipdaily\` : To get daily Coins Sponsored\n**Usage:** \`-vipdaily\`

    • \`-ticket\` : To buy lottery ticket of 5 coins\n**Usage:** \`-ticket\`

    • \`-help\` : To get help message\n**Usage:** \`-help\`

    • \`-invite\` : To invite the bot to your server\n**Usage:** \`-invite\`

    • \`-report\` : To report any Bug In the bot\n**Usage:** \`-report\`

    • \`-support\`=> **__[Support Server](https://discord.gg/f2VrDkR)__** | **__[Invite The Bot](https://bit.ly/2CficlV)__** | **__[Vote for Bot]()__**`)

    .setFooter(`${config.botName} bot`)

    message.channel.send(embed).catch(e => message.channel.send(`Uh, an error :s`)) 

  }

} 