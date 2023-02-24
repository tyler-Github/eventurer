const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    description: "Generate an invite link for the bot.",
    cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
        try {
               const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('INVITE')
                        .setURL("https://discord.com/api/oauth2/authorize?client_id=671809535320522786&permissions=414464855104&scope=bot")
                        .setStyle('Link'),
                );
            
            const embed = new EmbedBuilder()
                .setTitle('Invite Link')
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

            return interaction.reply({ embeds: [embed], components: [buttons] });
        } catch (err) {
            console.log(err);
            return interaction.reply({ content: `Sorry, I failed to generate an invite link...`, ephemeral: true });
        }
    }
}