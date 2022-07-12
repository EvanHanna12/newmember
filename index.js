const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: '"discord.js": "^12.5.3",', totalShards: 2  });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}\nWorking....`));