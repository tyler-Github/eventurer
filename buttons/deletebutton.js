const fs = require('fs')
const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    id: 'rsvp_button_delete',
    permissions: ['Administrator'],
    run: async (client, interaction) => {
        try {
            // Get current events list
            let events = JSON.parse(fs.readFileSync('./events.json'));
            // Find and delete event
            let eventName = interaction.message.embeds[0].title;
            let index = events.findIndex(event => event.eventName === eventName);
            events.splice(index, 1);
            // Save new events list
            fs.writeFileSync('./events.json', JSON.stringify(events));
            // Get current attendee list
            let attendeeList = JSON.parse(fs.readFileSync('./attending.json'));
            // Filter attendees for the deleted event
            let eventAttendees = attendeeList.filter(attendee => attendee.event === eventName);
            // Get usernames of event attendees
            let usernames = eventAttendees.map(eventAttendee => eventAttendee.username);

            // Remove attendees from attendee list
            attendeeList = attendeeList.filter(attendee => attendee.event !== eventName);

            attendeeList.splice(index, 1);
            
            fs.writeFileSync('./attending.json', JSON.stringify(attendeeList));

            console.log(attendeeList)
            // Log usernames of event attendees in a channel
            let logChannelId = JSON.parse(fs.readFileSync('./logs.json'))[interaction.guild.id];
            let logChannel = client.channels.cache.get(logChannelId);

            const embed = new EmbedBuilder()
                .setTitle(eventName)
                .setDescription(`Event "${eventName}" has ended.`)
                .addFields({ name: 'Attendees:', value: usernames.join(', ') }) //map through the attendee list and get the usernames, join them with a comma
                .setColor('Green')
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

            logChannel.send({ embeds: [embed] });
            
                const embed2 = new EmbedBuilder()
                .setTitle(`Notification`)
                .setDescription(`Event "${eventName}" has been deleted.`)
                .setColor('Red')
                .setTimestamp()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

            return interaction.reply({ embeds: [embed2], ephemeral: true });
        } catch (err) {
            console.log(err)
            return interaction.reply({ content: `Sorry, I failed to delete the event...`, ephemeral: true });
        }
    }
};