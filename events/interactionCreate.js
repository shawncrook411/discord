const { Events, MessageFlags } = require('discord.js');

module.exports = {
    name : Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {            
            
            const command = interaction.client.commands.get(interaction.commandName);
            
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;   
            }
            
            try {
                await command.execute(interaction);
                
            } catch (error) {
                console.error(error);
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        flags: MessageFlags.Ephemeral
                    })
                }
            }
        }

        if (interaction.isButton()) {
            const gameCommand = interaction.client.commands.get('game')

            if (gameCommand && gameCommand.handleButton) {
                try {
                    await gameCommand.handleButton(interaction)
                } catch (error){
                    console.error(error);

                    if (!interaction.replied && !interaction.deffered) {
                        await interaction.reply({
                            content: 'There was an error handling this button!',
                            flags: MessageFlags.Ephemeral
                        })
                    }
                }
            }
        }
    }
}