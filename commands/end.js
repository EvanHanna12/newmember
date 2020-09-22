const Discord = require('discord.js')

const config = require('../config.json')

module.exports = {

  name: "end",

  description: "ends the lottery of the week, owner only.",

  execute: async(client, message, args, data, db) => {

   

    let owners = config.ownersID;

    

    if (!owners.includes(message.author.id)) return

     

    let users = await db.fetch(`users_0`)

  

    if (users.length == 0) return message.channel.send("Error!")

  

    let winner = users[Math.floor(Math.random() * users.length)]

    

    let user = client.users.get(winner)

    

    if (!user) return message.channel.send(`Try again`)

    

    let msg = await message.channel.send(`Selecting the winner please wait !`)

    

    await new Promise(resolve => setTimeout(resolve, 5000))

    

    let handler = []

    

    users.map(x => {

      if (!handler.includes(x)) handler.push(x) 

    })

    

    msg.edit(`${user} won this lottery and got ${handler.length * 5} coins! There were ${handler.length} participants !`)

    

    user.send(`Hello ${user}! You won the lottery! You got ${handler.length * 5} coins! \nThanks For participating In lottery To buy more Lottery Do \`-ticket\` of 5 Coins`)

    

    let logs = await db.fetch(`logs_${user.id}`)

    

    logs.unshift(`[+${handler.length * 5}] - Won a lottery of ${handler.length} participants.`)

    

    db.set(`logs_${user.id}`, logs)

    

    db.add(`coins_${user.id}`, handler.length * 5) 

    db.set(`users_0`, [])

    

    let stop = await db.startsWith("ticket_")

    

    stop = stop.filter(x => x.data != 0)

    

    for (let i = 0;i < stop.length;i++) db.set(`ticket_${stop[i].ID.split("_")[1]}`, 0)

  } 

} 