const Discord = require('discord.js');
const intents = 3276799; // Intéragir avec discord via le bot
const bot = new Discord.Client({ intents }); // Intéragir avec discord via le bot
const config = require('./config'); // Importer le fichier config.json
const LoadCommand = require('./loader/load_command'); // Importer le fichier load_command.js
const { EmbedBuilder } = require('discord.js');

bot.commands = new Discord.Collection(); // Créer une collection de commandes

bot.login(config.token); // Se connecter au bot
LoadCommand(bot); // Charger les commandes


bot.on('messageCreate', message => {

    if (message.content === '!play') {

        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
         
            .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        message.channel.send({ embeds: [exampleEmbed] });


        let randomNumber = Math.floor(Math.random() * 25) + 1;
        let essai = 5;

        const collector = message.channel.createMessageCollector({
            filter: (response) => {
                return !response.author.bot && response.content.startsWith('!');
            },
            time: 60000
        }); 

        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);

            const userGuess = parseInt(m.content);
            if (!isNaN(userGuess) && userGuess === randomNumber) {
                message.reply('Vous avez trouvé le bon nombre !');
                collector.stop();
            } else {
                essai--;
                if (essai === 0) {
                    message.reply(`Vous avez perdu, le bon nombre était ${randomNumber} !`);
                    collector.stop();
                } else {
                    message.reply(`Il ne vous reste que ${essai} vie(s) `);
                }
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    }


});


bot.on('ready', () => {
    console.log(`Le bot ${bot.user.tag} est prêt!`);
});







