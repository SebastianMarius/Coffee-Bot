const { text, json } = require('express');
const fetch = require('node-fetch');

let coffeePhoto;

function ShowCoffee(response, msg) {
    coffeePhoto = response.file;
    msg.channel.send(coffeePhoto);
}

module.exports = {
    name: 'get_coffee',
    description: 'Everyone wants a coffee right?',
    execute(msg, client) {
        fetch('https://coffee.alexflipnote.dev/random.json')
            // .then((res) => console.log(res + ' '))
            .then((res) => res.json())
            .then((res) => ShowCoffee(res, msg));
    },
};
