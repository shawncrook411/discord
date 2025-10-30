const dotenv = require('dotenv');
dotenv.config();

const { REST, Routes } = require('discord.js');

const clientId = process.env.client_id;
const guildId = process.env.guild_id;
const token = process.env.token;

const commands = [];

const commandPath = './commands/utility/'
const commandsList = ['help', 'game', 'lorem', 'roll', 'die']

commandsList.forEach((file) =>  {
    const command = require(`${commandPath}${file}.js`)
    commands.push(command.data.toJSON());
})

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		
		const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

module.exports = { commandsList }