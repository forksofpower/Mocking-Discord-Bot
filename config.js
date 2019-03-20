const dotenv = require('dotenv').config();

module.exports = {
    prefix: "!",
    token: process.env.DISCORD_TOKEN || "",
};
