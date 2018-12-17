module.exports,run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Недостаточно прав для использования данной команды!')
    else if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('У меня недостаточно прав для использования данной команды!')

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args [0] || m.id == args[0]))
    if (!member) return message.channel.send('Пользователь не найден на сервере!')
    else if (member.hasPermission("BAN_MEMBERS")) return message.channel.send('Я не могу забанить данного пользователя')

    let reason = args.slice(1).join(' ') || 'Не указана'

    await member.ban(reason)
    await message.channel.send(`<@${message.author.id}> забанил <@${member.id}>\n**Причина**: ${reason}`)
}

module.exports.help = {
    name: 'ban'
}
