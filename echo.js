var mineflayer = require('mineflayer');
var argv = require('minimist')(process.argv.slice(2));

console.log("Starting bot.");

console.log(argv.host);
console.log(argv.port);
console.log(argv.username);
console.log(argv.password);
console.log("--------------");

var bot = mineflayer.createBot({
  host: argv.host, // optional
  port: argv.port,       // optional
  username: argv.username, // email and password are required only for
  password: argv.password,          // online-mode=true servers
});
bot.on('chat', function(username, message) {
  if (username === bot.username) return;
  bot.chat(message);
});
bot.on('error', function(error) {
  console.error(error.stack);
});