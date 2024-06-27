const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildVoiceStates]
});
console.log(`
 _______  _______  _______  _______  __    _         _______  _______  _______ 
|   _   ||       ||       ||       ||  |  | |       |  _    ||       ||       |
|  |_|  ||  _____||    _  ||    ___||   |_| | ____  | |_|   ||   _   ||_     _|
|       || |_____ |   |_| ||   |___ |       ||____| |       ||  | |  |  |   |  
|       ||_____  ||    ___||    ___||  _    |       |  _   | |  |_|  |  |   |  
|   _   | _____| ||   |    |   |___ | | |   |       | |_|   ||       |  |   |  
|__| |__||_______||___|    |_______||_|  |__|       |_______||_______|  |___|  
`);
client.login(token);
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Hubo un error ejecutando el comando!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Hubo un error ejecutando el comando!', ephemeral: true });
		}
	}
});
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
console.log('Refrescando comandos');
};
client.once(Events.ClientReady, () => {
	console.log('¡Listo!');
});



