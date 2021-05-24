const Discord = require('discord.js');

const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Coffee Bot comands')
    .setAuthor('Coffee Bot', 'https://i.imgur.com/W6WsP6O.jpg')
    .addField('\u200B', '\u200B')
    .addFields(
        {
            name: '!get coffee',
            value: `send a coffee pic`,
            inline: true,
        },
        //    { name: '\u200B', value: '\u200B' },
        {
            name: '!choose',
            value: `you give input, we give back 1 random thing from input`,
            inline: true,
        },
        {
            name: 's',
            value: 'you give 2 inputs, we calculated how much percentage are these equals ',
            inline: true,
        }
    )
    .addField('\u200B', '\u200B')
    .addFields(
        {
            name: '!count members',
            value: `count how many members are in the channal`,
            inline: true,
        },
        //    { name: '\u200B', value: '\u200B' },
        {
            name: '!age',
            value: `enter your name and see how many ages you get :)`,
            inline: true,
        },
        {
            name: 'kick',
            value: 'kick la un prost ',
            inline: true,
        }
    );
module.exports = {
    name: 'help',
    description: 'this is a help command',
    execute(message) {
        message.channel.send(exampleEmbed);
    },
};
