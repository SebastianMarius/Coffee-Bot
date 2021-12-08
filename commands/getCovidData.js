const Discord = require('discord.js');

//schimba numele canalului cand il publici
var unirest = require('unirest');

var reqVaccine = unirest(
    'GET',
    'https://covid-193.p.rapidapi.com/statistics?country=Romania'
);

reqVaccine.headers({
    'x-rapidapi-key': '0f43dc1bd7mshd586b7652eae110p1ff1c3jsn9f331d7b2829',
    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    // useQueryString: true,
});

let activeCases;
let newCase;
let recover;
let critical;
let deathsNew;
let totalDeads;
let cases;
let deaths;
let day;
let testProcent;
let population;

module.exports = {
    name: 'get_covid_data',
    description: 'When user ask for covid data, send covid data',
    execute(msg) {
        // console.log('====');

        reqVaccine.end(function (res) {
            cases = res.body.response[0].cases;

            activeCases = cases.active;
            newCase = cases.new;
            recover = cases.recovered;
            critical = cases.critical;

            deaths = res.body.response[0].deaths;
            deathsNew = deaths.new;
            totalDeads = deaths.total;

            day = res.body.response[0].day;
            tests = res.body.response[0].tests.total;
            testProcent = res.body.response[0].tests['1M_pop'];
            population = res.body.response[0].population;

            const showCovidData = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Today Romania covid informations')
                .setAuthor('Coffee Bot', 'https://i.imgur.com/W6WsP6O.jpg')
                .setDescription(
                    'I will send everyday informations about covid :)'
                )
                .setThumbnail('https://i.imgur.com/QpnAaSJ.jpg')
                .addField('\u200B', '\u200B')
                .addField(
                    `More or less than yesterday?`,
                    `How i am supposed to know that? use your brain bro and calculate :)`
                )
                .addField('\u200B', '\u200B')
                .addFields(
                    {
                        name: 'Nr new cases today',
                        value: `${newCase}`,
                        inline: true,
                    },
                    //    { name: '\u200B', value: '\u200B' },
                    {
                        name: 'Nr. total of active cases',
                        value: `${activeCases}`,
                        inline: true,
                    },
                    {
                        name: 'Nr. of recovered people',
                        value: `${recover}`,
                        inline: true,
                    }
                )
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    {
                        name: 'Nr of new dead people',
                        value: `${deathsNew}`,
                        inline: true,
                    },
                    {
                        name: 'Nr. of critical people',
                        value: `${critical}`,
                        inline: true,
                    },
                    {
                        name: 'Nr of total deaths',
                        value: `${totalDeads}`,
                        inline: true,
                    }
                )
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    {
                        name: 'Population',
                        value: `${population}`,
                        inline: true,
                    },
                    {
                        name: 'Data',
                        value: `${day}`,
                        inline: true,
                    },
                    {
                        name: 'Test percentage (1M pop)',
                        value: `${testProcent}`,
                        inline: true,
                    }
                )

                .addField('\u200B', '\u200B')
                .setTimestamp()
                .setFooter(
                    'Stay safe and wear the mask ',
                    'https://i.imgur.com/10aUp1o.jpg'
                );

            if ((cases = res.body.response[0])) {
                msg.channel.send(showCovidData);
            } else {
                msg.channel.send('Sorry, i do not have any data for today yet');
                return;
            }
        });
    },
};
