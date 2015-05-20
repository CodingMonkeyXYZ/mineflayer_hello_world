var mineflayer = require('mineflayer');
var argv = require('minimist')(process.argv.slice(2));

var bot = mineflayer.createBot({
  host: argv.host,
  port: argv.port,
  username: argv.username,
  password: argv.password,
});

//clear the vanilla patterns from the list to scan. V7+ all use json anyway.
//bot.chatPatterns = [];

bot.chatAddPattern(/^([a-zA-Z0-9_]{1,16}):\s(.+)/, "chat", "CivCraft chat");
bot.chatAddPattern(/^From\s(.+):\s(.+)/, "whisper", "CivCraft pm");
//bot.chatAddPattern(/^(.*)$/, "chat", "CivCraft chat");

//TODO: it's picking up 'hi' as the wisper username and not getting a message.


bot.on('chat', function(username, message) {  
  if (username === bot.username) return;  
  bot.chat(message);
});

bot.on('whisper', function(username, message) {
  console.log("username: "+username);
  console.log("whisper:"+message);
  if (username === bot.username) return;  
  bot.chat("/r "+message);
});

bot.on('error', function(error) {
  console.error(error.stack);
});

bot.on('spawn', function() {
  console.log("spawn.");
  bot.chat("I have awoken.");
});

bot.on('kicked', function(reason) {
  console.log("We were kicked, because:");
  console.error(reason);
});

bot.on('health', function() {
  console.warn("Health change: "+bot.health);
});
