const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const moment = require('moment');
const paginationEmbed = require('discord.js-pagination');

module.exports = {
    name: 'info',
    description: "Displays information about the bot.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {        
        try {
            const uptime = moment.utc(moment.duration(client.uptime).asMilliseconds()).format("D [days], H [hrs], m [mins], s [secs]");
            const guildCount = client.guilds.cache.size;
            let memberCount = 0;
            client.guilds.cache.forEach(guild => {
                memberCount += guild.memberCount;
            });
            
            const os = require('os');
const cpu = os.cpus()[0];
const botRam = process.memoryUsage().rss / 1024 / 1024;
const overallRam = os.totalmem() / 1024 / 1024 / 1024;
const usedRam = os.freemem() / 1024 / 1024 / 1024;
const availableRam = os.totalmem() / 1024 / 1024 / 1024 - os.freemem() / 1024 / 1024 / 1024;
const ramUsage = (availableRam / overallRam) * 100;

            const embed = new EmbedBuilder()
    .setTitle('Bot Info')
    .addFields({ name: 'Servers:', value: ` ${client.guilds.cache.size}` })
    .addFields({ name: 'Users:', value: ` ${client.users.cache.size}` })
                .addFields({ name: 'Channels:', value: ` ${client.channels.cache.size}` })
    .addFields({ name: 'Uptime:', value: ` ${uptime}` })
            .addFields({ name: 'CPU:', value: `OS: ${os.platform()} [${os.arch()}]\nCores: ${cpu.model}\nUsage: ${cpu.speed} MHz`, inline: true})
            .addFields({ name: 'Bot\'s RAM:', value: `Used: ${botRam} MB\nAvailable: ${availableRam} GB\nUsage: ${(botRam / availableRam) * 100}%`, inline: true })
            .addFields({ name: 'Overall RAM:', value: `Used: ${usedRam} GB\nAvailable: ${availableRam} GB\nUsage: ${ramUsage}%`, inline: true })
           
    .setColor('Green')
    .setTimestamp()
    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
            
            const embed2 = new EmbedBuilder()
    .setTitle('Bot Commands')
    .addFields({ name: 'Commands:', value: `Test` })
    .setTimestamp()
    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

            return interaction.reply({ embeds: [embed] });
            
          

        } catch (err) {
            console.log(err);
            return interaction.reply({ content: `Sorry, I failed to display the bot's info...`})
        }
    }
}
