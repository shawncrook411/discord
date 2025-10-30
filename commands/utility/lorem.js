const { SlashCommandBuilder } = require ('discord.js');
const { readFile } = require('fs');

const random = Math.floor(Math.random() * 1000)

const lorem = readFile('lorem.txt', (err, data) => {
    return data
});


module.exports = {
    data: new SlashCommandBuilder().setName('lorem').setDescription('Displays words from lorem ipsum'),
    async execute(interaction) {
        await interaction.reply(
            lorem.split(' ').slice(0, random)
        );
    }
}


