const PortfolioService = {
  /**
   * Get all portfolios from local storage.
   * @returns {Object} An object with portfolio names as keys and their entries as values.
   */
  getAllPortfolios() {
    const portfolios = localStorage.getItem("allPortfolios");
    return portfolios ? JSON.parse(portfolios) : {};
  },

  /**
   * Save all portfolios to local storage.
   * @param {Object} portfolios - Object containing all portfolios.
   */
  saveAllPortfolios(portfolios) {
    localStorage.setItem("allPortfolios", JSON.stringify(portfolios));
  },

  /**
   * Retrieve a specific portfolio by name.
   * @param {string} name - The name of the portfolio.
   * @returns {Array} Portfolio entries or an empty array if not found.
   */
  getPortfolio(name) {
    const portfolios = this.getAllPortfolios();
    return portfolios[name] || [];
  },

  /**
   * Save a specific portfolio by name.
   * @param {string} name - The name of the portfolio.
   * @param {Array} portfolio - The portfolio entries to save.
   */
  savePortfolio(name, portfolio) {
    const portfolios = this.getAllPortfolios();
    portfolios[name] = portfolio;
    this.saveAllPortfolios(portfolios);
  },

  /**
   * Delete a portfolio by name.
   * @param {string} name - The name of the portfolio to delete.
   */
  deletePortfolio(name) {
    const portfolios = this.getAllPortfolios();
    delete portfolios[name];
    this.saveAllPortfolios(portfolios);
  },
};

export default PortfolioService;
