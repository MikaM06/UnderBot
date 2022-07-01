const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: Object.keys(Intents.FLAGS) });
const cley = require('./data/cley.json');
const token = cley.token;
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { channel } = require('node:diagnostics_channel');
client.commands = new Collection();

client.on("ready", async () => {

    // Les statut vous pouvez les modifier est mettre se que vous voulez  
       const arrayOfStatus = [
         `Github`,
         `${client.users.cache.size} Membres`,
       ]
     
     // 20000 = 20 seconde (vous pouvez changer)
       setInterval(() => {
           client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)], type: "WATCHING" }]})
       }, 20000)
     })

const commands = [];
const commandFiles = fs.readdirSync('./cbm').filter(file => file.endsWith('.js'));

const clientId = 'BOT ID';
const guildId = 'SERVEUR ID';

for (const file of commandFiles) {
    const command = require(`./cbm/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command)
}

const rest = new REST({ version: '9' }).setToken(token);

(async() => {
    try {
        console.log('[/] à bien réussi a reload !');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );

        console.log('[/] Commande Reload !');
    } catch (error) {
        console.error(error);
    }
})();
const eventFiles = fs.readdirSync('./Event').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./Event/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.login(token);