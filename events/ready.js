const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const commands = [];
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		const clientId = '801705417411133450';
		const guildId = '782340186876411946';

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			commands.push(command.data.toJSON());
		}

		const rest = new REST({ version: '9' }).setToken(token);

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: commands },
				);

				console.log('Successfully reloaded application (/) commands.');
			}
			catch (error) {
				console.error(error);
			}
		})();
	},
};