const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder().setName("userinfo").setDescription("Pour savoir les informations d'un utilisateur !").addUserOption(user => user.setName("membre").setDescription("Membre mentionné").setRequired(false)),
    async execute(client, interaction) {
        const status = {
            "online": '<:en_ligne:915024656426217542> En Ligne',
            "idle": '<:inactif:915024656145199155> Inactif',
            "dnd": '<:ne_pas_deranger:915024656195534859> Ne pas déranger',
            "offline": '<:hors_ligne:915024655620907010> Hors-ligne'
        }

        const badges = {
            DISCORD_EMPLOYEE: `<:staff_badge:915024656250044457>`,
            PARTNERED_SERVER_OWNER: `<:partner_badge:915024655641886790>`,
            BUGHUNTER_LEVEL_1: `<:discord_bug_hunter_lv1:915024656224886834>`,
            BUGHUNTER_LEVEL_2: `<:discord_bug_hunter_lv2:915024656346521620>`,
            HYPESQUAD_EVENTS: `<:badge_hypesquad:915024655776096307>`,
            HOUSE_BRAVERY: `<:hypesquad_bravery:915024656224911360>`,
            HOUSE_BRILLIANCE: `<:hypesquad_briliance:915024655880970281>`,
            HOUSE_BALANCE: `<:hypesquad_balance:915024656245878816>`,
            EARLY_SUPPORTER: `<:discord_early_supporter:915024655998402590`,
            TEAM_USER: `Team User`,
            SYSTEM: `<:verified_system:915024655859990568>`,
            VERIFIED_BOT: `<:bot_tag:915024656510119936>`,
            EARLY_VERIFIED_BOT_DEVELOPER: `<:bot_developpeur_verifie:915024656052924536>`
        };
        let user;
        if (interaction.options.getMember("membre") === null) {
            user = interaction.member
        } else {
            user = interaction.options.getMember("membre")
        }
        const UserFlags = (await user.user.fetchFlags()).toArray().map(flag => badges[flag]).join("\n ")
        const UserBadges = UserFlags ? `**Badges:** ${UserFlags}` : "\n";
        var permissions = [];


        let embed = new MessageEmbed()
            .setAuthor({ name: `Userinfo` })
            .setColor("DARK_PURPLE")
            .setDescription(`Pseudo: ${user.user.username} \n\ \n\ ID: ${user.user.id} \n\ \n\ ${UserBadges} \n\ \n\ Statut: ${status[user.presence.status]} \n\ \n\ Date: <t:${Math.floor(user.user.createdTimestamp / 1000)}:R>`)
            .setTimestamp()
            .setThumbnail(user.user.avatarURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
        await interaction.reply({ embeds: [embed] });

    }
}