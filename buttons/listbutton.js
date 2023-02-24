const fs = require('fs')
const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    id: 'rsvp_button_attendees',
    permissions: [],
    run: async (client, interaction) => {
        try {
            // Get current attendee list
            let attendeeList = JSON.parse(fs.readFileSync('./attending.json'));
            // Filter attendees for the specified event
            let eventName = interaction.message.embeds[0].title;
            let eventAttendees = attendeeList.filter(attendee => attendee.event === eventName);
            // Get usernames of event attendees
            let usernames = eventAttendees.map(eventAttendee => eventAttendee.username);
            let attendeeListString = usernames.join(', ');
            
                const embed = new EmbedBuilder()
                .setTitle('Heres the attendees:')
                .setDescription(` ${attendeeListString}`)
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
            
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (err) {
            console.log(err)
            return interaction.reply({ content: `Sorry, I failed to display the attendees..`, ephemeral: true });
        }
    }
}