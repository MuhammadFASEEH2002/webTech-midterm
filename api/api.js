const axios = require("axios");

const instance = axios.create({
    baseURL: "http://localhost:9207",
});

module.exports = instance;
