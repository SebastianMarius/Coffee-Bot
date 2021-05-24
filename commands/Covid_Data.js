const Discord = require('discord.js');

//schimba numele canalului cand il publici
var unirest = require('unirest');

var reqVaccine = unirest(
    'GET',
    'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Romania/rou'
);

reqVaccine.headers({
    'x-rapidapi-key': '0f43dc1bd7mshd586b7652eae110p1ff1c3jsn9f331d7b2829',
    'x-rapidapi-host':
        'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
    useQueryString: true,
});

let activeCases;
let newCase;
let recover = 3;
let critical;
let deathsNew;
let totalDeads;
let cases;
let yesterdayActivee = 307;
let textToSend;
let infectionRisk;
let newRecover;
let testProcent;

module.exports = {
    name: 'covid_data',
    description: 'Send every 24h covid data',
    execute(client) {
        // console.log('====');

        reqVaccine.end(function (res) {
            cases = res.body[0];
            activeCases = cases.ActiveCases;
            newCase = cases.NewCases;
            recover = cases.TotalRecovered;
            critical = cases.Serious_Critical;
            deathsNew = cases.NewDeaths;
            totalDeads = cases.TotalDeaths;
            infectionRisk = cases.Infection_Risk;
            newRecover = cases.NewRecovered;
            testProcent = cases.Test_Percentage;

            var compareYest =
                yesterdayActivee > newCase
                    ? yesterdayActivee - newCase
                    : newCase - yesterdayActivee;
            if (yesterdayActivee > newCase) {
                textToSend = ` ${compareYest} cases less than yesterday`;
            } else {
                textToSend = ` ${compareYest} cases more than yesterday`;
            }
            const showCovidData = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Today Romania covid informations')
                .setAuthor('Coffee Bot', 'https://i.imgur.com/W6WsP6O.jpg')
                .setDescription(
                    'I will send everyday informations about covid :)'
                )
                .setThumbnail('https://i.imgur.com/QpnAaSJ.jpg')
                .addField('\u200B', '\u200B')
                .addField(`More or less than yesterday?`, `${textToSend}`)
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
                        name: 'Nr of new recover people',
                        value: `${newRecover}`,
                        inline: true,
                    },
                    {
                        name: 'Infection risk',
                        value: `${infectionRisk}`,
                        inline: true,
                    },
                    {
                        name: 'Test percentage',
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
            const channelu = client.channels.cache.find(
                (channel) => channel.name === 'covid-updates'
            );

            channelu.send(showCovidData);
            yesterdayActivee = newCase;
        });
    },
};
