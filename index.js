const { Client, Collection, GatewayIntentBits, } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const token = process.env.token;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// Creates and loads commands into client
const commandPath = './commands/utility/'
const { commandsList } = require('./deploy-commands.js')

commandsList.forEach((file) =>  {
    const command = require(`${commandPath}${file}.js`)
    client.commands.set(command.data.name, command)
})

// Creates events listeners
const eventPath = './events/'
const events = ['interactionCreate', 'ready']

events.forEach((file) => {
    const event = require(`${eventPath}${file}.js`)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
})

client.login(token);



