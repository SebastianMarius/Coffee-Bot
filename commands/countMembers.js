module.exports = {
    name: 'count_members',
    description: 'this is a ping',
    execute(msg) {
        msg.reply(`There are ${msg.guild.memberCount} bulangi `);
    },
};
