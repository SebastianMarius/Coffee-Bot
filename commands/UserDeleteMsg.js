module.exports = {
    name: 'User_delete_msg',
    description: 'People need to assume what they said :)',
    execute(message) {
        message.channel.send(
            `${message.author} i guess you need to assume what you said instead of deleting it 🤭`
        );
    },
};
