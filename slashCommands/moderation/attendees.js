const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const fs = require('fs')

module.exports = {
    name: 'viewattendees',
    description: "View all attendees of a specific event.",
    cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'event',
            description: 'The event you want to view attendees for.',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        try {
            // Get current attendee list
            let attendeeList = JSON.parse(fs.readFileSync('./attending.json'));
            // Filter attendees for the specified event
            let eventAttendees = attendeeList.filter(attendee => attendee.event === interaction.options.get('event').value);
            // Get usernames of event attendees
            let usernames = eventAttendees.map(eventAttendee => eventAttendee.username);
            let attendeeListString = usernames.join(', ');

            const embed = new EmbedBuilder()
                .setTitle(`Attendees for event "${interaction.options.get('event').value}"`)
                .setDescription(attendeeListString || `No attendees found for this event.`)
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

            return interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            return interaction.reply({ content: `Sorry, I failed to view the attendees...`, ephemeral: true });
        }
    }
}