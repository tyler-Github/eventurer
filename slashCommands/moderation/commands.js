const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'commands',
    description: "View a list of all available commands.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        // Randomly generate a number between 0 and 1
        const randomNum = Math.random();
        // Set a threshold for when the advertisement message will be sent (e.g. 10% of the time)
        const threshold = 0.1;
        // Check if the random number is less than the threshold
        if (randomNum < threshold) {
            interaction.reply({ content: `Don't forget to upvote the bot! https://discordbotlist.com/bots/eventurer/upvote` });
        }

        const embed = new EmbedBuilder()
            .setTitle('Commands')
            .addFields({ name: '/create', value: ` Create new events with the simple '/create' command. You can specify the event's name, date, time, location, and even add a description.` })
            .addFields({ name: '/credits', value: ` Use '/credits' to view the bot's creators and give them your thanks for developing this amazing bot.` })
            .addFields({ name: '/info', value: ` Get detailed information about the bot and its commands with '/info' command.` })
            .addFields({ name: '/invite', value: ` Invite the bot to your server with '/invite' command. This will generate a unique invite link that you can use to add the bot to your server.` })
            .addFields({ name: '/messageattendees', value: ` Send messages to all attendees of an event with '/messageattendees' command. This is great for sending reminders or updates about the event.` })
            .addFields({ name: '/ping', value: ` Check if the bot is online by using '/ping' command. This is a quick way to make sure the bot is running and available to take commands.` })
            .addFields({ name: '/setlogchannel', value: ` Set a channel for event logs using '/setlogchannel' command. This allows you to keep track of all event-related activity in a specific channel.` })
            .addFields({ name: '/viewattendees', value: ` View the attendees of an event with '/viewattendees' command. This is a great way to see who has RSVP'd.` })
            .setColor('Green')
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        return interaction.reply({ embeds: [embed] });;
    }
};