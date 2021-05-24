var GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(process.env.GIPHY_TOKEN);

module.exports = {
    name: 'Kick',
    description: 'Kick a player',
    execute(msg) {
        console.log('we will kick');
        let member = msg.mentions.members.first();
        member.kick().then((member) => {
            giphy.search('gifs', { q: 'fail' }).then((response) => {
                var allResponses = response.data.length;
                var responseIndex =
                    Math.floor(Math.random() * 10 + 1) % allResponses;
                var responseFinal = response.data[responseIndex];

                msg.channel.send(
                    ':wave: ' +
                        member.displayName +
                        ' has been kicked (cine stie ce prostie o facut)',
                    {
                        files: [responseFinal.images.fixed_height.url],
                    }
                );
            });
        });
        //
    },
};
