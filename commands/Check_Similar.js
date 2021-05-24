var unirest = require('unirest');

module.exports = {
    name: 'check_similar',
    description: 'Check the similarity for 2 things',
    execute(msg, command) {
        var firstParam;
        var secondParam;

        var msgContent = msg.content;
        msgContent = msgContent.substring(2);
        var endFirstcomp = msgContent.indexOf('!to');
        firstParam = msgContent.substring(0, endFirstcomp);
        secondParam = msgContent.substring(endFirstcomp + 4);
        firstParam = firstParam.replace(/\s/g, '');
        secondParam = secondParam.replace(/\s/g, '');

        var req = unirest(
            'GET',
            'https://text-similarity-calculator.p.rapidapi.com/stringcalculator.php'
        );

        req.query({
            stext: firstParam,
            ftext: secondParam,
        });

        req.headers({
            'x-rapidapi-key':
                '0f43dc1bd7mshd586b7652eae110p1ff1c3jsn9f331d7b2829',
            'x-rapidapi-host': 'text-similarity-calculator.p.rapidapi.com',
            useQueryString: true,
        });
        // msg.channel.send('ponggg');
        console.log(msg.content);

        req.end(function (res) {
            if (res.error) throw new Error(res.error);

            console.log(res.body);
            const firstText = res.body.stext;
            const secondText = res.body.ftext;

            const isEqual = res.body.percentage;

            msg.channel.send(
                `Percentage of these 2 texts to be equal is ${isEqual}`
            );
        });
    },
};
