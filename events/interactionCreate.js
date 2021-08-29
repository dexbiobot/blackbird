module.exports = {
	name: 'interactionCreate',
	execute(interaction, client) {
		if (!interaction.isCommand()) return;

		if (!client.commands.has(interaction.commandName)) return;
		try {
			client.commands.get(interaction.commandName).execute(interaction);
		}
		catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};