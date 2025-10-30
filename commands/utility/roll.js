const { SlashCommandBuilder } = require ('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Returns a random number between 1 and the chosen die size')
        .addStringOption((option) => 
            option
                .setName('choice')
                .setDescription('The die size to be rolled')
                .setRequired(true)
                .addChoices(
                    { name: 'd4', value: '4'},
                    { name: 'd6', value: '6'},
                    { name: 'd8', value: '8'},
                    { name: 'd10', value: '10'},
                    { name: 'd20', value: '20'},
                )),
    async execute(interaction) {
        (
            await interaction.reply(
                `Roll: ${Math.floor(Math.random() * parseInt(interaction.options.getString('choice'))).toString()}`
            )
        );
    }
}


