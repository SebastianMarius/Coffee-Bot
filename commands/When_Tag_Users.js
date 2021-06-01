module.exports = {
    name: 'on_tag_user',
    description:
        'When someone tag an user, he/she will receive private msg, instead of search for tag msg it s better to receive it in dm :)',
    execute(message) {
        message.mentions.users.each((user) =>
            user.send(
                `${message.author.username} mentioned you somewhere in ${message.guild.name}: ${message.channel.name} channel and said: ${message.content}`
            )
        );
    },
};
