function showAge(res, msg) {
    if (res.age === undefined || msg.content.length < 8) {
        msg.channel.send('Esti atata de prost ca nici numele nu ti-l stii?');
    } else {
        msg.channel.send(
            `A person with the name ${yourName} hmm.. maybe ${res.age} years old?`
        );
    }
}

module.exports = {
    name: 'get_age_by_name',
    description: 'this is a ping',
    execute(msg) {
        console.log(msg.content);
        yourName = msg.content.substring(5);
        console.log(yourName);
        fetch(`https://api.agify.io/?name=${yourName}`)
            // .then((res) => console.log(res + ' '))
            .then((res) => res.json())
            .then((res) => showAge(res, msg));
    },
};
