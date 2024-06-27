const { SlashCommandBuilder } = require('@discordjs/builders');
const voiceDiscord = require('@discordjs/voice');
const { createAudioResource, createAudioPlayer } = require('@discordjs/voice');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('¡El bot se conecta al canal de voz!'),
    execute: async (interaction) => {
        const channel = interaction.member.voice.channel;
        if (!interaction.member.voice.channel) {
            return await interaction.reply({
                content: '¡Tenés que unirte a un canal para usar el comando!', ephemeral: true
            });
        } else {
            const connection = voiceDiscord.joinVoiceChannel({
                channelId: channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            console.log('Creando recurso de audio');
            const player = createAudioPlayer();
            const resource = createAudioResource('http://us-b4-p-e-qg12-audio.cdn.mdstrm.com/live-audio-aw-bkp/60a2745ff943100826374a70?aid=60106eadf34de307dd720e7b&pid=1TWTKLGmP5jnxrf9Irhgac8124MCQx6w&sid=oERbnvb5N6Dm5cjD9YsC0VPldcBBQbDh&uid=xy3DG9Qaq1OWFtH6JTl4O56bYhV8hwip&es=us-b4-p-e-qg12-audio.cdn.mdstrm.com&ote=1701897980778&ot=cNfjOSrtw4jVrf9dIZ1bUA&proto=https&pz=us&cP=128000&awCollectionId=60106eadf34de307dd720e7b&aw_0_1st.playerId=mediastream-player-aspen-pie&liveId=60a2745ff943100826374a70&referer=https%3A%2F%2Ffmaspen.com%2F&propertyName=mediastream-player-aspen-pie&listenerId=xy3DG9Qaq1OWFtH6JTl4O56bYhV8hwip.com/watch?v=dQw4w9WgXcQ', {
                inlineVolume: false
            });
            console.log('Reproduciendo audio');
            connection.subscribe(player);
            player.play(resource);
            console.log('Intentando conectarse al canal');
            await interaction.reply('¡Reproduciendo ASPEN! :)');
        }
    }
};
