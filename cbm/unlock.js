const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder().setName("unlock").setDescription("Débloquer un channel"),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            let permError = new MessageEmbed({
                title: "Permissions manquantes",
                description: `:x: ${interaction.user} Tu n'as pas la permission (\`Gestions des Message\`) pour exécuter cette commande`,
                footer: {
                    text: "Tu esssayes de faire quoi ?!",
                    icon_url: interaction.user.displayAvatarURL({ dynamic: true })
                },
                color: "#fe0000",
                timestamp: new Date()
            })
            return await interaction.reply({ embeds: [permError] })
        }
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            if (!interaction.channel.name.startsWith(`${interaction.channel.name}`)) {
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setDescription("Ce channel est déja débloqué.")
                        .setTimestamp()
                    ]
                });
            } else {
                interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: null
                })
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor("YELLOW")
                        .setTitle('Salon Débloqué ✔️')
                        .setDescription(`Ce salon est actuellement débloqué.`)
                        .setTimestamp()
                    ]
                });
            }
        }
    }
}