const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');

const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;

    do {
        context.font = `${fontSize -= 10}px sans-serif`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
};

module.exports = {
    name: "guildMemberAdd",
    async execute(client, member) {

        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('./asset/pictures/backgroud.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#277ecd';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = '38px sans-serif';
        context.fillStyle = '#277ecd';
        context.fillText('Bienvenue !', canvas.width / 2.5, canvas.height / 3.5);

        context.font = applyText(canvas, `${member.displayName} !`);
        context.fillStyle = '#0e0606';
        context.fillText(`${member.displayName} !`, canvas.width / 3, canvas.height / 2);

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        context.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        const channelB = client.channels.cache.get("CHANNEL")
        channelB.send({ files: [attachment] });

        member.roles.add('ROLES ID')
        let Bienvenue = new MessageEmbed()
            .setAuthor({ name: `Pseudo : ${member.user.username} ` })
            .setColor("GREEN")
            .setDescription(`ID: ${member.user.id} \n\ \n\ Compte: ${member.user.createdAt} \n\ \n\ Nombre: ${member.guild.memberCount}`)
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })

        client.channels.cache.get('LOGS CHANNEL').send({ embeds: [Bienvenue] })

    }
};