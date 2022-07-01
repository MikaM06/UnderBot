const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder().setName("lock").setDescription("bloquer Un channel"),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
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
            if (interaction.channel.name.startsWith("『🔒』")) {
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setDescription("Ce channel est déja bloqué.")

                        .setTimestamp()
                    ]
                });
            } else {
                interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor("DARK_RED")
                        .setTitle('Salon Bloqué')
                        .setDescription(`
                            Ce salon est actuellement bloqué.
                            `)
                        .setTimestamp()
                    ]
                });
            }
        }
    }
}