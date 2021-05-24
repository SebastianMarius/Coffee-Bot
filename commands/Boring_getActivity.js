function getActivity(res, msg) {
    let activitate = res.activity;
    let type = res.type;
    let peopel = res.participants;

    msg.channel.send(
        `If you ask for activity it means that you are bored.. try to ${activitate}, this activity type: ${type} and i think it's an activity for  ${peopel} people`
    );
}

module.exports = {
    name: 'get_random_activity',
    description:
        'Another funny API that i found online, bored users can requist an random activity',
    execute(msg) {
        // console.log(msg);

        fetch(`https://www.boredapi.com/api/activity`)
            // .then((res) => console.log(res + ' '))
            .then((res) => res.json())
            .then((res) => getActivity(res, msg));
    },
};
