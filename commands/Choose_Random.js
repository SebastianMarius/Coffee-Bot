let mesage = 'We choose from your items...⌛ ';

function mata(msg, randomChose) {
    setTimeout(() => msg.edit(`The winner: ${randomChose}`), 2000);
}

module.exports = {
    name: 'choose',
    description: 'this is a ping',
    execute(msg, clien, command) {
        if (msg.content.length === 7) {
            msg.channel.send(
                'Esti atata de prost ca incerci sa alegi fara parametrii?'
            );

            return;
        }
        command = command.substring(7);

        const splitIntoArr = command.split(' ');
        const randomChose =
            splitIntoArr[Math.floor(Math.random() * splitIntoArr.length)];

        msg.channel.send(mesage).then((msg) => mata(msg, randomChose));
    },
};
