const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'test',
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('petit test command'),
	async execute(interaction) {
		await interaction.reply({ content: 'réussi !' });

	},
};