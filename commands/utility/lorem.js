const { SlashCommandBuilder } = require ('discord.js');
const { readFileSync } = require('fs');

const random = Math.floor(Math.random() * 100)

const lorem = readFileSync('./commands/utility/lorem.txt', 'utf8').split(' ').slice(0, random).join(" ")

module.exports = {
    data: new SlashCommandBuilder().setName('lorem').setDescription('Displays words from lorem ipsum'),
    async execute(interaction) {
        await interaction.reply(
            lorem
        );
    }
}
