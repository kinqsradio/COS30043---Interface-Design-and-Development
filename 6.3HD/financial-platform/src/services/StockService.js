import ApiService from './ApiService';
import TimeSeriesDailyModel from '@/models/TimeSeriesDailyModel';
import GlobalQuoteModel from '@/models/GlobalQuoteModel';
import SymbolSearchModel from '@/models/SymbolSearchModel';
import TopGainersLosersModel from '@/models/TopGainersLosersModel';

const API_KEY = 'B5X8ZE7X305K32L3';
// 'B5X8ZE7X305K32L3'
// 'OO1L6GN27CG5A9H0';

const StockService = {
  /**
   * Fetch daily time series data.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @param {object} options - Optional parameters: outputsize, datatype.
   * @returns {Promise<TimeSeriesDailyModel>} - A promise resolving to a structured daily time series data.
   */
  async getDailyData(symbol, options = {}) {
    const params = {
      function: 'TIME_SERIES_DAILY',
      symbol,
      apikey: API_KEY,
      ...options,
    };

    try {
      const response = await ApiService.get('', { params });
      console.log('Response from TIME_SERIES_DAILY API:', response.data);
      return new TimeSeriesDailyModel(response.data);
    } catch (error) {
      console.error('Error fetching daily data:', error);
      throw error;
    }
  },

  /**
   * Fetch the latest stock quote.
   *
   * @param {string} symbol - The stock symbol (e.g., "IBM").
   * @param {object} options - Optional parameters: datatype.
   * @returns {Promise<GlobalQuoteModel>} - A promise resolving to a structured global quote data.
   */
  async getGlobalQuote(symbol, options = {}) {
    const params = {
      function: 'GLOBAL_QUOTE',
      symbol,
      apikey: API_KEY,
      ...options,
    };

    try {
      const response = await ApiService.get('', { params });
      console.log('Response from GLOBAL_QUOTE API:', response.data);
      return new GlobalQuoteModel(response.data);
    } catch (error) {
      console.error('Error fetching global quote:', error);
      throw error;
    }
  },

  /**
   * Search for stocks or companies by keyword.
   *
   * @param {string} keywords - The search keyword (e.g., "microsoft").
   * @param {object} options - Optional parameters: datatype.
   * @returns {Promise<SymbolSearchModel>} - A promise resolving to structured search results.
   */
  async searchStocks(keywords, options = {}) {
    const params = {
      function: 'SYMBOL_SEARCH',
      keywords,
      apikey: API_KEY,
      ...options,
    };

    try {
      const response = await ApiService.get('', { params });
      console.log('Response from SYMBOL_SEARCH API:', response.data);
      return new SymbolSearchModel(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  },

  /**
   * Fetch top gainers, losers, and most active tickers.
   *
   * @returns {Promise<TopGainersLosersModel>} - A promise resolving to structured top gainers/losers data.
   */
  async getTopGainersLosers() {
    const params = {
      function: 'TOP_GAINERS_LOSERS',
      apikey: 'demo', //API_KEY | use demo api key in here
    };

    try {
      const response = await ApiService.get('', { params });
      console.log('Response from TOP_GAINERS_LOSERS API:', response.data);
      return new TopGainersLosersModel(response.data);
    } catch (error) {
      console.error('Error fetching top gainers/losers:', error);
      throw error;
    }
  },
};

// Export as ESM
export default StockService;
