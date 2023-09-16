const fs = require('fs');


module.exports = async (bot) => {

    fs.readdirSync('./cmd').filter(f => f.endsWith('.js')).forEach(async file => {
        let command = require(`../cmd/${file}`);
        const commandName = file.slice(0, -3);

        if (!command.name || typeof command.name !== 'string') {
            throw new TypeError(`La commande ${commandName} n'est pas valide ! `);
        }

        bot.commands.set(command.name, command);
        console.log(`Commande ${commandName} chargée!`);
    });
};


