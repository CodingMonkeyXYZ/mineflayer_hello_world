// Simple mineflayer bot example for CivCraft.
// Echo's chat back to you.
// Also runs /jalist when it logs in.
// MonkeyWithAnAxe.

var mineflayer = require('mineflayer');
var argv = require('minimist')(process.argv.slice(2));


var bot = mineflayer.createBot({
  host: argv.host,
  port: argv.port,
  username: argv.username,
  password: argv.password,
});


//Add out custom CivCraft chat regexes.
bot.chatAddPattern(/^([a-zA-Z0-9_]{1,16}):\s(.+)/, "chat", "CivCraft chat");
bot.chatAddPattern(/^From\s(.+):\s(.+)/, "whisper", "CivCraft pm");

//n.b. you can also add custom events to fire on certain chat patterns:
bot.chatAddPattern(/^\*\s([a-zA-Z0-9_]{1,16})\s(.+)]$/, "snitch",
 "CivCraft snitch alert");

function random (low, high) {
    return Math.random() * (high - low) + low;
}


bot.on('chat', function(username, message) {  
  if (username === bot.username) return;  

  //Added a delay because... bot rules on CivCraft.
  setTimeout(function(command){      
      bot.chat(command);
    },
    4000,
    message
  );   
});


bot.on('whisper', function(username, message) {  
  if (username === bot.username) return;

  //Added a delay because... bot rules on CivCraft.
  setTimeout(function(command){      
      bot.chat(command);
    },
    4000,
    "/r "+message
  );  
});


bot.on('snitch', function(username, message) {  
  if (username === bot.username) return;  
  //bot.chat("/pm "+username+" You are being watched... spooky!");  
  setTimeout(function(command){
    bot.chat(command);
  }, random(8000,32000),
  "/pm "+username+" You are being watched... spooky!"
  );  
});


bot.on('error', function(error) {
  console.error(error.stack);
});


//Fired when the bot is ready to do stuff.
bot.on('spawn', function() {
  console.log("spawn.");
  bot.chat("Hello world.");
  setTimeout(function(command){
      console.log("checking snitches");
      bot.chat(command);
    },
    5000,
    "/jalist"
  );    
});


bot.on('kicked', function(reason) {
  console.log("We were kicked, because:");
  console.error(reason);
});


//We can also monitor our bot's properties like health.
bot.on('health', function() {
  console.warn("Health change: "+bot.health);
});


//Emitted for every server message, including chats.
bot.on('message', function(json) {
  //json is a json message but it's toString method creates a nice
  //printable result:
  console.log("message:" + json);
  
  //N.B. This catches things like commands and server messages.
  //We could probably inspect the json to work out which is which.
});
