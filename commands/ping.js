module.exports = {
    name: 'ping',
    description: 'Just a test command',
    execute(message) {
        message.channel.send('ponggg');
    },
};
