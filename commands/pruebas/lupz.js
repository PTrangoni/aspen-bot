const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lupz')
        .setDescription('Le dice putito a lucas'),
    async execute(interaction) {
        await interaction.reply('Lucas putito');
    },
}; 