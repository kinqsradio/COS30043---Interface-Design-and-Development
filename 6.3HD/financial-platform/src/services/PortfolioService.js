const PortfolioService = {
  /**
   * Get all portfolios from local storage.
   * @returns {Object} An object with portfolio names as keys and their entries as values.
   */
  getAllPortfolios() {
    const portfolios = localStorage.getItem("allPortfolios");
    const parsedPortfolios = portfolios ? JSON.parse(portfolios) : {};
    console.log("Retrieved All Portfolios:", parsedPortfolios);
    return parsedPortfolios;
  },

  /**
   * Save all portfolios to local storage.
   * @param {Object} portfolios - Object containing all portfolios.
   */
  saveAllPortfolios(portfolios) {
    console.log("Saving All Portfolios:", portfolios);
    localStorage.setItem("allPortfolios", JSON.stringify(portfolios));
  },

  /**
   * Retrieve a specific portfolio by name.
   * @param {string} name - The name of the portfolio.
   * @returns {Array} Portfolio entries or an empty array if not found.
   */
  getPortfolio(name) {
    const portfolios = this.getAllPortfolios();
    console.log(`Retrieved Portfolio for "${name}":`, portfolios[name]?.entries || []);
    return portfolios[name]?.entries || []; // Only return the portfolio entries
  },

  /**
   * Save a specific portfolio by name, including its realized profit.
   * @param {string} name - The name of the portfolio.
   * @param {Array} portfolio - The portfolio entries to save.
   */
  savePortfolio(name, portfolio) {
    const portfolios = this.getAllPortfolios();
    if (!portfolios[name]) {
      portfolios[name] = { entries: [], realizedProfit: 0 };
    }
    portfolios[name].entries = portfolio; // Save portfolio entries
    console.log(`Saving Portfolio "${name}":`, portfolios[name]);
    this.saveAllPortfolios(portfolios);
  },

  /**
   * Delete a portfolio by name.
   * @param {string} name - The name of the portfolio to delete.
   */
  deletePortfolio(name) {
    const portfolios = this.getAllPortfolios();
    delete portfolios[name];
    console.log(`Delete Portfolio "${name}":`, portfolios[name]);
    this.saveAllPortfolios(portfolios);
  },

  /**
   * Save the realized profit for a specific portfolio.
   * @param {string} portfolioName - The name of the portfolio.
   * @param {number} realizedProfit - The realized profit to save.
   */
  saveRealizedProfit(portfolioName, realizedProfit) {
    const portfolios = this.getAllPortfolios();
    if (!portfolios[portfolioName]) {
      portfolios[portfolioName] = { entries: [], realizedProfit: 0 };
    }
    portfolios[portfolioName].realizedProfit = realizedProfit; // Save realized profit
    this.saveAllPortfolios(portfolios);
    console.log(`Successfully saved realized profit for "${portfolioName}":`, portfolios[portfolioName].realizedProfit);
  },

  /**
   * Retrieve the realized profit for a specific portfolio.
   * @param {string} portfolioName - The name of the portfolio.
   * @returns {number} The realized profit or 0 if not found.
   */
  getRealizedProfit(portfolioName) {
    const portfolios = this.getAllPortfolios();
    console.log(`Retrieved realized profit for "${portfolioName}":`, portfolios[portfolioName].realizedProfit);
    return portfolios[portfolioName]?.realizedProfit || 0;
  },
};

export default PortfolioService;
