const Discord = require('discord.js')
const fs = require('fs')
const bot = new Discord.Client()
const config = require("./config.json")
bot.commands = new Discord.Collection()

fs.readdir('./commands' , (err , files) => {
  if (err) console.log(err)

  let jsfile = files.filter(f => f.split('.').pop() === 'js')
  if(jsfile.length <= 0) return console.log('Команды не найдены!')

  console.log(`Loaded ${jsfile.length} commands`)
  jsfile.forEach((f , i) => {
    let props = require(`./commands/${f}`)
    bot.commands.set(props.help.name, props)
  })
})

bot.on('message' , async message => {
  let prefix = config.prefix;
  let messageArray = message.content.split(' ')
  let command = messageArray[0]
  let args = messageArray.slice(1)

  let command_file = bot.commands.get(command.slice(prefix.length))
  if (command_file) command_file.run(bot , message , args) 
 
 
  if (message.content.startWith(prefix + 'Привет')){
    message.channel.send('Привет!')
  }
}) 

bot.login(config.token);
bot.on('ready' , () => {
  console.log(`${bot.user.username} online `);
  bot.user.setPresence({status: 'dnd' , game:{name: 'Beta Test 2.0' , type: 3}});
})
