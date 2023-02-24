const fs = require('fs')
const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'create',
    description: "Create a new event.",
    cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'set',
            description: 'Create a new event.',
            type: 1,
            options: [
                {
                    name: 'channel',
                    description: 'The channel of the event.',
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                },
                {
                    name: 'title',
                    description: 'The event embed title.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'time',
                    description: 'The event embed time.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'description',
                    description: 'The event embed description.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'link',
                    description: 'The event embed link.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        if(interaction.options._subcommand === 'set') {
            try {
                const eventName = interaction.options.get('title').value;
                const description = interaction.options.get('description').value;
                const channel = interaction.options.get('channel').channel;
                const time = interaction.options.get('time').value;
                const link = interaction.options.get('link').value;

                // Get current events
                let events = JSON.parse(fs.readFileSync('./events.json'));
                // Add new event
                events.push({ eventName: eventName });

                // Save new events
                fs.writeFileSync('./events.json', JSON.stringify(events));

                const embed = new EmbedBuilder()
                .setTitle(eventName)
                .setDescription(description || `Event "${eventName}" has been created.`)
                .addFields({ name: 'Time:', value:`<t:${time}>` ||  `No time was specified...`})
                .addFields({ name: 'link:', value: `[<:links:1066314912860749844>](${link})` || `No link was specified...`  })
                .setColor('Green')
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setEmoji('<:join:1066311530808868905>')
                    .setStyle('Secondary')
                    .setCustomId('rsvp_button'),
                    new ButtonBuilder()
                    .setEmoji('<:leave:1066311532260110396>')
                    .setStyle('Secondary')
                    .setCustomId('rsvp_button_leave'),
                    new ButtonBuilder()
                    .setEmoji('<:attendees:1066311528644624384>')
                    .setStyle('Secondary')
                    .setCustomId('rsvp_button_attendees'),
                    new ButtonBuilder()
                    .setEmoji('<:delete:1066311533853937764>')
                    .setStyle('Secondary')
                    .setCustomId('rsvp_button_delete')
                );



                await channel.send({ embeds: [embed], components: [buttons] });

                return interaction.reply({ content: `Event "${eventName}" has been created.`, ephemeral: true });

            } catch {
                return interaction.reply({ content: `Sorry, I failed creating the event...`, ephemeral: true });
            }
        }
    }
}
