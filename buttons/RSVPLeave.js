const fs = require('fs')
const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    id: 'rsvp_button_leave',
    permissions: [],
    run: async (client, interaction) => {
        try {
            // Get current attendee list
            let attendeeList = JSON.parse(fs.readFileSync('./attending.json'));
            // Find and remove attendee
            let eventName = interaction.message.embeds[0].title;
            let index = attendeeList.findIndex(attendee => attendee.username === interaction.user.username && attendee.event === eventName);
            attendeeList.splice(index, 1);
            // Save new attendee list
            fs.writeFileSync('./attending.json', JSON.stringify(attendeeList));
            console.log(attendeeList)
            
                        const embed = new EmbedBuilder()
                .setTitle(`Notification`)
                .setDescription(`You have left the event.`)
                .setColor('Red')
                .setTimestamp()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
            
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (err) {
            console.log(err)
            return interaction.reply({ content: `Sorry, I failed to leave the event...`, ephemeral: true });
        }
    }
}
