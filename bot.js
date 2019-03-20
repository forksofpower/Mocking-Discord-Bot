const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.js");

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    // Ignore other bots and avoid "botception"
    if(message.author.bot) return;

    // Ignore messages that do not start with bot prefix
    if (message.content.indexOf(config.prefix) !== 0) return;

    // separate command, args, and data
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // const flags = args.filter(x => x[0] === '-');

    if (command === "mock") {
        // Get message by joining args
        const messageText = args.join(" ");
        let m;

        let fromUser = args.find(x => x === '-u');
        let generateImage = args.find(x => x === '-i');

        if (fromUser) {
            // retrieve latest message from user in channel history
            m = 'LATEST HILARIOUS MESSAGE FROM USER:' + args[args.indexOf('-u') + 1];
        } else {
            // check for text payload in message or grab latest message from channel history
            if (messageText !== null && messageText.charAt(0) !== '-') {
                m = messageText;
            } else {
                m = 'LATEST HILARIOUS MESSAGE FROM HISTORY';
            }
        }

        // translate message
        const mockMessage = translate(m);
        console.log(`Translated "${messageText}" to "${mockMessage}" `);

        // delete the command message
        message.delete().catch(_=>{});

        // format message options
        let options = {};
        if (generateImage) {
            // only send image for now
            // send image
            options = {
                files: [
                    './img/mock.png'
                ]
            }
        }
        message.channel.send(mockMessage, options);
    }
});

function tweak (c) {
    return Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase();
}
function translate(text) {
    return text.split("").map(tweak).join("");
}


client.login(config.token);
