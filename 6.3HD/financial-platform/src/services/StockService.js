const ApiService = require('./ApiService');

const API_KEY = 'demo'
// 'B5X8ZE7X305K32L3'
//'OO1L6GN27CG5A9H0';

const StockService = {
  /**
   * Fetch intraday time series data.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @param {string} interval - The interval between data points (e.g., "5min").
   * @param {object} options - Optional parameters: adjusted, extended_hours, month, outputsize, datatype.
   * @returns {Promise<object>} - A promise resolving to the intraday time series data.
   */
  getIntradayData(symbol, interval, options = {}) {
    const params = {
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      interval,
      apikey: API_KEY,
      ...options,
    };

    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from TIME_SERIES_INTRADAY API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching intraday data:', error);
        throw error;
      });
  },

  /**
   * Fetch daily time series data.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @param {object} options - Optional parameters: outputsize, datatype.
   * @returns {Promise<object>} - A promise resolving to the daily time series data.
   */
  getDailyData(symbol, options = {}) {
    const params = {
      function: 'TIME_SERIES_DAILY',
      symbol,
      apikey: API_KEY,
      ...options,
    };

    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from TIME_SERIES_DAILY API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching daily data:', error);
        throw error;
      });
  },

  /**
   * Fetch weekly time series data.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @param {object} options - Optional parameters: datatype.
   * @returns {Promise<object>} - A promise resolving to the weekly time series data.
   */
  getWeeklyData(symbol, options = {}) {
    const params = {
      function: 'TIME_SERIES_WEEKLY',
      symbol,
      apikey: API_KEY,
      ...options,
    };

    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from TIME_SERIES_WEEKLY API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching weekly data:', error);
        throw error;
      });
  },

  /**
   * Fetch monthly time series data.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @param {object} options - Optional parameters: datatype.
   * @returns {Promise<object>} - A promise resolving to the monthly time series data.
   */
  getMonthlyData(symbol, options = {}) {
    const params = {
      function: 'TIME_SERIES_MONTHLY',
      symbol,
      apikey: API_KEY,
      ...options,
    };

    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from TIME_SERIES_MONTHLY API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching monthly data:', error);
        throw error;
      });
  },

  /**
   * Fetch the latest stock quote.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @param {object} options - Optional parameters: datatype.
   * @returns {Promise<object>} - A promise resolving to the stock quote data.
   */
  getGlobalQuote(symbol, options = {}) {
    const params = {
      function: 'GLOBAL_QUOTE',
      symbol,
      apikey: API_KEY,
      ...options,
    };

    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from GLOBAL_QUOTE API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching global quote:', error);
        throw error;
      });
  },

  /**
   * Search for stocks or companies by keyword.
   *
   * @param {string} keywords - The search keyword (e.g., "microsoft").
   * @param {object} options - Optional parameters: datatype.
   * @returns {Promise<object>} - A promise resolving to the search results.
   */
  searchStocks(keywords, options = {}) {
    const params = {
      function: 'SYMBOL_SEARCH',
      keywords,
      apikey: API_KEY,
      ...options,
    };

    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from SYMBOL_SEARCH API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        throw error;
      });
  },

  /**
   * Fetch company overview data.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @returns {Promise<object>} - A promise resolving to the company overview data.
   */
  getCompanyOverview(symbol) {
    const params = {
      function: 'OVERVIEW',
      symbol,
      apikey: API_KEY,
    };

    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from OVERVIEW API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching company overview:', error);
        throw error;
      });
  },

  /**
   * Fetch earnings data for a stock.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @returns {Promise<object>} - A promise resolving to the earnings data.
   */
  getEarnings(symbol) {
    const params = {
      function: 'EARNINGS',
      symbol,
      apikey: API_KEY,
    };

    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from EARNINGS API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching earnings data:', error);
        throw error;
      });
  },

  /**
   * Fetch top gainers, losers, and most active tickers.
   *
   * @returns {Promise<object>} - A promise resolving to the top gainers, losers, and active tickers data.
   */
  getTopGainersLosers() {
    const params = {
      function: 'TOP_GAINERS_LOSERS',
      apikey: API_KEY,
    };
  
    return ApiService.get('', { params })
      .then(response => {
        console.log('Response from TOP_GAINERS_LOSERS API:', response.data); // Log the API response
        return response.data; // Return the data as usual
      })
      .catch(error => {
        console.error('Error fetching top gainers/losers:', error);
        throw error;
      });
  },
  
};

module.exports = StockService;