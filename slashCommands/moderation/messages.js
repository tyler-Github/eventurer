const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'messageattendees',
    description: "Message all attendees of a specific event.",
    cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageChannels', // permission required
    options: [
        {
            name: 'event',
            description: 'The event you want to message attendees for.',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'message',
            description: 'The message you want to send to attendees.',
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
            // Get user IDs of event attendees
            let userIds = eventAttendees.map(eventAttendee => eventAttendee.id);

            const embed = new EmbedBuilder()
            .setTitle(interaction.options.get('event').value)
            .setDescription(interaction.options.get('message').value || `Couldn't fetch message...`)
            .setColor('Green')
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

            // Message event attendees
            userIds.forEach(userId => {
                client.users.fetch(userId)
                    .then(user => user.send({ embeds: [embed] }))
                    .catch(err => console.log(err));
            });
            return interaction.reply({ content: `Successfully sent message to attendees of event "${interaction.options.get('event').value}".`, ephemeral: true });
        } catch (err) {
            console.log(err);
            return interaction.reply({ content: `Sorry, I failed to message the attendees...`, ephemeral: true });
        }
    }
};