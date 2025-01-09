const axios = require('axios');

const ApiService = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  timeout: 10000,
});

module.exports = ApiService;
