const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Guild } = require('discord.js');
const moment = require("moment");
moment.locale("FR");
module.exports = {
    data: new SlashCommandBuilder().setName("serverinfo").setDescription("Pour avoir les informations du serveur !"),
    async execute(client, interaction) {
        console.log(interaction.guild)
        let embed = new MessageEmbed()
            .setAuthor({ name: `Serveur` })
            .setColor("BLUE")
            .setDescription(`Nom: \`${interaction.guild.name}\`\n\ Owner: \`${await (interaction.guild.fetchOwner().then(m => m.user.tag))}\`\nBoost: \`${interaction.guild.premiumTier}\`\n\ Date de Création: **${moment.utc(interaction.guild.createdAt).format("LLLL")}**`)
            .setTimestamp()
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
        await interaction.reply({ embeds: [embed] });

    }
}