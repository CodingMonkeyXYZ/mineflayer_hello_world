var mineflayer = require('mineflayer');

var parseArgs = require('minimist');


var bot = mineflayer.createBot({
  host: parseArgs.host, // optional
  port: parseArgs.port,       // optional
  username: parseArgs.username, // email and password are required only for
  password: parseArgs.password,          // online-mode=true servers
});
bot.on('chat', function(username, message) {
  if (username === bot.username) return;
  bot.chat(message);
});
bot.on('error', function(error) {
  console.error(error.stack);
});