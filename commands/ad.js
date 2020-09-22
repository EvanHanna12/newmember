const Discord = require('discord.js')

module.exports = {
  name: "advertise",
  aliases: ["ad"],
  description: "used to advertise your server and get members on your Server.",
  execute: async(client, message, args, data, db) => {
    
    let amount = Number(args[0])
   
    let description = args.slice(1).join(" ")
    if (data.coins < 6) return message.channel.send(`You Need Atleast 6 coin to buy ad ! try joining some serers By \`-find\` and join them will give you +1 coins . If you left the server before 3 days of joing you will lose -2 coins from your balance `)
    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(`Invalid amount has been provided, try running the command again and putting a valid amount of coins.`)
    
    if (amount > data.coins) return message.channel.send(`${message.author.username} you don't have enough Balance. You only have ${amount} coins.\n\n\`If you Are Getting this ! please Try joining Some servers First then Try this command again\``)
    
    amount = Math.round(amount)
    
    let link = data.code
    
    if (link == 0) {
      link = await message.channel.createInvite({ maxAge: 0 })
      
      link = link.code 
    } 
    
    await client.fetchInvite('https://discord.gg/' + link).catch(async x => {
      link = await message.channel.createInvite({ maxAge: 0 })
      link = link.code
      console.log(link) 
    }) 
    
    if (description && description.includes("discord.gg")) return message.channel.send(`Invalid Message provided. Pls dont provide any discord links`)
    
    if (description && description.length > 300) return message.channel.send(`The Message exceed the limit of 300 words`)
    
    message.channel.send(`Succesfully Buyed ${amount} coins for your server, you can see the currents order with \`-order\`|\`-info\`.`) 
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    db.set(`code_${message.guild.id}`, link)
    
    data.logs.unshift(`[-${amount}] - Advertise ${message.guild.name} server.`) 
    
    db.set(`logs_${message.author.id}`, data.logs) 
    
    db.set(`description_${message.guild.id}`, `${description === undefined ? "" : description}\nhttps://discord.gg/${link}`) 
    
    db.add(`orders_${message.guild.id}`, amount)
    
    db.subtract(`coins_${message.author.id}`, amount) 
  }
} 