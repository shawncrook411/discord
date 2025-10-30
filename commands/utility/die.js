const { SlashCommandBuilder } = require ('discord.js');


module.exports = {
    data: new SlashCommandBuilder().setName('die').setDescription('Kills the bot'),
    async execute(interaction) {
        await interaction.reply('Bot has been shot! Killing bot now...');

        process.exit(0) // Is this allowed??? I mean it gets the job done but surely this isn't the intended process...
    }
}
