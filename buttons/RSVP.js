const fs = require('fs')
const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    id: 'rsvp_button',
    permissions: [],
    run: async (client, interaction) => {
        try {
            // Get current attendee list
            let attendeeList = JSON.parse(fs.readFileSync('./attending.json'));
            // Check if user is already attending event
            let eventName = interaction.message.embeds[0].title;
            let alreadyAttending = attendeeList.find(attendee => attendee.username === interaction.user.username && attendee.event === eventName);
            if (alreadyAttending) return interaction.reply({ content: `❌ ${ interaction.user }, You are already attending this event.`, ephemeral: true });
        // Add new attendee
        attendeeList.push({ username: interaction.user.username, event: eventName, id: interaction.user.id });
        // Save new attendee list
        fs.writeFileSync('./attending.json', JSON.stringify(attendeeList));
        console.log(attendeeList)
            
                  const embed = new EmbedBuilder()
                .setTitle(`Notification`)
                .setDescription(`You have RSVP'd to the event.`)
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
            
        return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch(err) {
        console.log(err)
        return interaction.reply({ content: `Sorry, I failed to RSVP you to the event...`, ephemeral: true });
    }
}
}