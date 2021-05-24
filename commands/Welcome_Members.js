var GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(process.env.GIPHY_TOKEN);
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'Welcome',
    description: 'this is a ping',
    execute(member, client) {
        // message.channel.send('ponggg');
        var role = member.guild.roles.cache.find(
            (role) => role.name === 'Relax'
        );
        member.roles.add(role);

        giphy.search('gifs', { q: 'Welcome' }).then((response) => {
            var allResponses = response.data.length;
            var responseIndex =
                Math.floor(Math.random() * 10 + 1) % allResponses;
            var responseFinal = response.data[responseIndex];

            const joinembed = new Discord.MessageEmbed()
                .setTitle(`Avem un nou tovaras pe aci!`)
                .setDescription(`Bine ai venit rau ai nimerit..${member} `)
                .setColor('#FF0000')
                .setImage(responseFinal.images.fixed_height.url);

            // client.channels.cache.get('810957973710569472').send(joinembed);
            const channel = client.channels.cache.find(
                (channel) => channel.name === 'general'
            );
            channel.send(joinembed);
        });

        member.send(
            `No acuma sa speram ca o sa-ti placa pe ${member.guild.name}`
        );
    },
};
