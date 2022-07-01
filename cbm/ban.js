const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
    data: new SlashCommandBuilder().setName("ban").setDescription("Pour bannir les membres").addUserOption(option => option.setName("member").setDescription("Veuillez indiquer un utilisateur").setRequired(true)).addStringOption(option => option.setName("raison").setDescription("Veuillez indiquer une raison.").setRequired(false)).addStringOption(option => option.setName("temps").setDescription("Veuillez indiquer un temps.").setRequired(false)),
    async execute(client, interaction) {
        let member = interaction.options.getMember("member") || interaction.options.get("member");
        let reason = interaction.options.getString("raison");
        let time = interaction.options.getString("temps");
        if (!reason) reason = "Aucune raison donnée";
        if (!time) {
            let embed = new MessageEmbed()
                .setAuthor({ name: `Bannissement - ${member.user.username}`, iconURL: member.user.displayAvatarURL() })
                .setColor("DARK_BLUE")
                .setDescription(`${member.user.username} n\'a pas fait gaffe à son fessier !`)
                .setThumbnail(interaction.guild.iconURL())
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() }).setTimestamp()
            await interaction.reply({ embeds: [embed] });
            let banmp = new MessageEmbed()
                .setAuthor({ name: "Ban Undercraft" })
                .setColor("DARK_RED")
                .setDescription(`Raison: ${reason} \n\ Modérateur/Modératrice: ${interaction.user.username} `)
            await member.send({ embeds: [banmp] }).catch(err => {})
            await interaction.guild.members.ban(member, { reason: reason }).catch(err => {});
            let logs = new MessageEmbed()
                .setAuthor({ name: "Logs Ban" })
                .setColor("RED")
                .setDescription(`ID: ${member.user.id} \n\ Pseudo: ${member.user.username} \n\ Modo: ${interaction.user.username} \n\ Raison: ${reason}`)
            client.channels.cache.get('LOGS ID').send({ embeds: [logs] })
        } else if (time) {
            let embed = new MessageEmbed()
                .setAuthor({ name: `Bannissement Temporaire - ${member.user.username}`, iconURL: member.user.displayAvatarURL() })
                .setColor("DARK_BLUE")
                .setDescription(`${member.user.username} n\'a pas fait gaffe à sont faissier !`)
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL())
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            await interaction.reply({ embeds: [embed] });
            let banmp = new MessageEmbed()
                .setAuthor({ name: "Ban Temporaire Undercraft" })
                .setColor("DARK_RED")
                .setDescription(`Raison: ${reason} \n\ Modérateur/Modératrice: ${interaction.user.username} `)
            await member.send({ embeds: [banmp] }).catch(err => {})
            await interaction.guild.members.ban(member, { reason: reason }).catch(err => {});

            let logs = new MessageEmbed()
                .setAuthor({ name: "Logs Ban" })
                .setColor("RED")
                .setDescription(`ID: ${member.user.id} \n\ Pseudo: ${member.user.username} \n\ Modo: ${interaction.user.username} \n\ Raison: ${reason}\n\ Temps : ${time}`)
            client.channels.cache.get('LOGS ID').send({ embeds: [logs] })
            setTimeout(async() => {
                await interaction.guild.members.unban(member, { reason: reason });
            }, ms(time));
        }
    }
}