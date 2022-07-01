const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Afficher la page d'aide"),
    async execute(client, interaction) {
        let embed = new MessageEmbed()
            .setAuthor({ name: `Help` })
            .setColor("BLUE")
            .setDescription("Commandes staff : \`lock\` \`unlock\`\`ban\`\`kick\`\n\nCommandes utilisateurs : \`discord\` \`userinfo\` \`help\`")
            .setTimestamp()
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
        await interaction.reply({ embeds: [embed] });
    }
}