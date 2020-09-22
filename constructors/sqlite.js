const Discord = require('discord.js')
const db = require('quick.db')

/*
Here I basically do things to make my work
Easier, you'll see. 
*/

//let's get data raw values from database
const get = async (message, user) => {

  //we will store values in this object
  let data = {}
  
  //now we will create default values 
  //this object is based on user's ID
  let object_user_based = {
    coins: 5, //starter values
    logs: [], //coin logs of the user
    banned: false, 
    ticket: 0,
    freecoins: 1 //time 
  } 
  
  //this object is based on Guild's ID
  let object_guild_based = {
    code: 0, //link invite code
    orders: 0, //number of invites
    uses: 0, //number of uses
    record: [], //record of users that have joined the server
    serverLevel: 1, //level of the server 
    description: "", //description of the advertisement
    users: [], //array of users that have joined
  } 
  
  //this object is based of guild and user ID
  let object_guild_user_based = {
    joinedDate: 0, //the date when the user joined the server
    activity: 0 //not needed 
  } 
  
  //first map
  Object.entries(object_user_based).map(async x => {
    //variable name
    let variable = x[0]
    //default value
    let value = x[1] 
    //value of the database
    let item = await db.fetch(`${variable}_${user.id}`)
    
    //if the value is null we set it to the default value
    if (item === null) data[variable] = value, db.set(`${variable}_${user.id}`, value)
    else data[variable] = item 
  }) 
  
  //second map
  Object.entries(object_guild_based).map(async x => {
    let variable = x[0]
    let value = x[1]
    let item = await db.fetch(`${variable}_${message.guild.id}`)
    if (item === null) db.set(`${variable}_${message.guild.id}`, value), data[variable] = value
    else data[variable] = item 
  }) 
  
  //third map
  Object.entries(object_guild_user_based).map(async x => {
    let variable = x[0]
    let value = x[1]
    let item = await db.fetch(`${variable}_${message.guild.id}_${user.id}`)
    if (item === null) db.set(`${variable}_${message.guild.id}_${user.id}`, value), data[variable] = value
    else data[variable] = item 
  }) 
  
  //we make a new promise to give the system some time to update database
  await new Promise(resolve => setTimeout(resolve, 1)) 
  
  //and finally we return the data we got. 
  return data
} 

//we export the functions :D
module.exports = {
  get: get 
} 