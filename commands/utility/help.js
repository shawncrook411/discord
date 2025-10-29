const { SlashCommandBuilder } = require ('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('Displays the available commands'),
    async execute(interaction) {
        await interaction.reply('reply-all-commands!');
    }
}


