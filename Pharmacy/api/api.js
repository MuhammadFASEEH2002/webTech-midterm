const axios = require("axios");

const instance = axios.create({
    baseURL: "http://localhost:3002",
});

module.exports = instance;
