const { SlashCommandBuilder } = require ('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('Displays the available commands'),
    async execute(interaction) {
        await interaction.reply(
        `
            Here are all the commands!

            /help - displays the available commands
            /lorem - displays words from lorem ipsum
            /die - kills the bot :(
            /roll - returns a random number between 1 and the chosen die size
            /game - starts a game of tic tac toe
        `
        );
    }
}


