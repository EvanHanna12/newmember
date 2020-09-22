const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'NzE0NDg3MTUzNDc1OTc3Mjc2.XtnoPA.cslmioKbWWiOfXvtL8CENumWuD4', totalShards: 2  });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}\nWorking....`));