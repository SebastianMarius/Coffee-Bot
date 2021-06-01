require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { response } = require('express');

const commandFiles = fs
    .readdirSync('./commands/')
    .filter((file) => file.endsWith('.js'));
const { prefix } = require('./config.json');
const pref = process.env.prefix;

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const MIN_INTERVAL = 1000 * 60 * 60 * 24;
setInterval(function () {
    client.commands.get('covid_data').execute(client);
}, MIN_INTERVAL);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    // we check if the message doesn't contain bot preffix, if the author isn't another bot
    // if it doesn't contain any user mention, we need to don't return anything if these are true
    // if message contain user mentions, we need to call 'on_tag_user' command, which send users private message when they are mentioned

    if (
        (!msg.content.includes('@') && !msg.content.startsWith(prefix)) ||
        msg.author.bot
    ) {
        return;
    }

    const args = msg.content.slice(prefix.length);
    const command = args.toLowerCase();
    // console.log(command);

    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(msg);
            break;
        case 'kick':
            if (msg.member.hasPermission(['KICK-MEMBERS', 'BAN_MEMBERS'])) {
                client.commands.get('count_members').execute(msg);
            }
            break;
        case 'get coffee':
            client.commands.get('get_coffee').execute(msg, client);
            break;
        case 'get activity':
            client.commands.get('get_random_activity').execute(msg);
            break;
        case 'help':
            client.commands.get('help').execute(msg);
            break;
    }

    if (command.includes('choose')) {
        client.commands.get('choose').execute(msg, client, command);
    } else if (command.startsWith('s')) {
        client.commands.get('check_similar').execute(msg, client, command);
    } else if (command.startsWith('age')) {
        client.commands.get('get_age_by_name').execute(msg);
    } else if (msg.mentions.members.first()) {
        client.commands.get('on_tag_user').execute(msg);
    }
});

client.on('guildMemberAdd', (member) => {
    client.commands.get('Welcome').execute(member, client);
});

client.on('messageDelete', (msg) => {
    client.commands.get('User_delete_msg').execute(msg);
});

client.login(process.env.BOT_TOKEN);
