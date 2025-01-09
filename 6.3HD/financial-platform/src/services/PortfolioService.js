const STORAGE_KEY = 'userPortfolio';

const PortfolioService = {
  /**
   * Retrieve the user's portfolio from local storage.
   * @returns {Array} Portfolio data or an empty array if none exists.
   */
  getPortfolio() {
    const portfolio = localStorage.getItem(STORAGE_KEY);
    return portfolio ? JSON.parse(portfolio) : [];
  },

  /**
   * Save the portfolio to local storage.
   * @param {Array} portfolio - Array of portfolio entries.
   */
  savePortfolio(portfolio) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  },

  /**
   * Add a new entry to the portfolio.
   * @param {Object} entry - The portfolio entry to add.
   */
  addEntry(entry) {
    const portfolio = this.getPortfolio();
    portfolio.push(entry);
    this.savePortfolio(portfolio);
  },

  /**
   * Delete an entry from the portfolio by index.
   * @param {number} index - The index of the entry to delete.
   */
  deleteEntry(index) {
    const portfolio = this.getPortfolio();
    portfolio.splice(index, 1);
    this.savePortfolio(portfolio);
  },

  /**
   * Update an entry in the portfolio.
   * @param {number} index - The index of the entry to update.
   * @param {Object} updatedEntry - The updated portfolio entry.
   */
  updateEntry(index, updatedEntry) {
    const portfolio = this.getPortfolio();
    portfolio[index] = updatedEntry;
    this.savePortfolio(portfolio);
  },
};

export default PortfolioService;
