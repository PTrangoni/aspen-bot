const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Desconecta al bot del canal.'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (connection === undefined) {
            await interaction.reply("No estoy unido a ningún canal de voz");
            return;
        };
        console.log('Saliendo del canal')
        console.log('Destruyendo Conexión')
        connection.destroy();
        await interaction.reply('¡Adiós!');
    },
};