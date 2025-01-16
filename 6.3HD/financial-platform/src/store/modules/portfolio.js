import PortfolioService from "@/services/PortfolioService";
import StockService from "@/services/StockService";

export default {
  namespaced: true,

  // Reactive data for the portfolio module
  state() {
    return {
      portfolioNames: [],
      selectedPortfolio: null,
      portfolio: [],
      searchResults: [],
      realizedProfit: 0,
    };
  },

  // Synchronous mutations to update state
  mutations: {
    SET_PORTFOLIO_NAMES(state, names) {
      state.portfolioNames = names;
    },
    SET_SELECTED_PORTFOLIO(state, portfolioName) {
      console.log("Setting selected portfolio:", portfolioName);
      state.selectedPortfolio = portfolioName;
    },
    SET_PORTFOLIO(state, portfolioData) {
      state.portfolio = portfolioData;
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
    },
    SET_REALIZED_PROFIT(state, profit) {
      state.realizedProfit = profit;
    },
    ADD_PORTFOLIO_NAME(state, name) {
      state.portfolioNames.push(name);
    },
    CLEAR_SEARCH_RESULTS(state) {
      state.searchResults = [];
    },
  },

  // **Getters** for derived state
  getters: {
    /**
     * The total current value of the portfolio.
     */
    totalPortfolioValue(state) {
      return state.portfolio.reduce(
        (total, entry) => total + (entry.currentPrice || 0) * entry.shares,
        0
      );
    },
  },

  actions: {
    /**
     * Load all portfolio names from PortfolioService.
     */
    loadPortfolioNames({ commit }) {
      const allPortfolios = PortfolioService.getAllPortfolios();
      commit("SET_PORTFOLIO_NAMES", Object.keys(allPortfolios));
    },

    /**
     * Loads the selected portfolio data and updates each entry's current price.
     */
    loadPortfolio({ state, commit, dispatch }) {
      if (!state.selectedPortfolio) return;
    
      const portfolios = PortfolioService.getAllPortfolios();
      const selectedPortfolio = portfolios[state.selectedPortfolio] || { entries: [], realizedProfit: 0 };
    
      // Ensure entries is always an array
      const portfolioEntries = Array.isArray(selectedPortfolio.entries) ? selectedPortfolio.entries : [];
    
      commit("SET_PORTFOLIO", portfolioEntries);
      commit("SET_REALIZED_PROFIT", selectedPortfolio.realizedProfit);
    
      // Update current price for each entry
      portfolioEntries.forEach((entry, index) => {
        dispatch("updateCurrentPrice", { symbol: entry.symbol, index });
      });
    },
    

    setSelectedPortfolio({ commit }, portfolioName) {
      console.log("SET_SELECTED_PORTFOLIO", portfolioName)
      commit("SET_SELECTED_PORTFOLIO", portfolioName);
    },

    createPortfolio({ state, commit }, name) {
      if (name && !state.portfolioNames.includes(name)) {
        // Create an empty portfolio with zero realized profit
        PortfolioService.savePortfolio(name, []);
        PortfolioService.saveRealizedProfit(name, 0);

        // Add to state
        commit("ADD_PORTFOLIO_NAME", name);
        commit("SET_SELECTED_PORTFOLIO", name);
        commit("SET_PORTFOLIO", []);
        commit("SET_REALIZED_PROFIT", 0);
      } else {
        alert("Portfolio name already exists or is invalid.");
      }
    },

    deleteCurrentPortfolio({ state, commit, dispatch }) {
      if (!state.selectedPortfolio) return;

      if (
        confirm(`Are you sure you want to delete portfolio "${state.selectedPortfolio}"?`)
      ) {
        PortfolioService.deletePortfolio(state.selectedPortfolio);

        // Reload names after deletion
        dispatch("loadPortfolioNames");

        // If there are still portfolios left, select the first one
        if (state.portfolioNames.length > 0) {
          commit("SET_SELECTED_PORTFOLIO", state.portfolioNames[0]);
          dispatch("loadPortfolio");
        } else {
          commit("SET_SELECTED_PORTFOLIO", null);
          commit("SET_PORTFOLIO", []);
        }
      }
    },

    async handleSearch({ commit }, query) {
      try {
        const results = await StockService.searchStocks(query);
        commit("SET_SEARCH_RESULTS", results.bestMatches);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },

    addToPortfolio({ state, commit, dispatch }, stock) {
      const purchasePrice = parseFloat(prompt("Enter Purchase Price:"));
      const shares = parseInt(prompt("Enter Number of Shares:"), 10);

      if (isNaN(purchasePrice) || isNaN(shares)) {
        alert("Invalid input. Please enter valid numbers.");
        return;
      }

      // Make a copy of the existing portfolio
      const updatedPortfolio = [...state.portfolio];
      const existingEntryIndex = updatedPortfolio.findIndex(
        (entry) => entry.symbol === stock.symbol
      );

      if (existingEntryIndex !== -1) {
        const existingEntry = updatedPortfolio[existingEntryIndex];
        const totalShares = existingEntry.shares + shares;
        const totalCost =
          existingEntry.price * existingEntry.shares + purchasePrice * shares;

        existingEntry.shares = totalShares;
        existingEntry.price = totalCost / totalShares;
      } else {
        updatedPortfolio.push({
          symbol: stock.symbol,
          price: purchasePrice,
          shares,
          currentPrice: null,
        });
      }

      // Persist updated portfolio
      PortfolioService.savePortfolio(state.selectedPortfolio, updatedPortfolio);
      commit("SET_PORTFOLIO", updatedPortfolio);

      // Update current price for the newly added symbol
      if (existingEntryIndex === -1) {
        dispatch("updateCurrentPrice", {
          symbol: stock.symbol,
          index: updatedPortfolio.length - 1,
        });
      }

      // Clear search results so the search results section hides
      commit("CLEAR_SEARCH_RESULTS");
    },

    sellShares({ state, commit }, index) {
      const entry = state.portfolio[index];
      if (!entry) return;

      const sharesToSell = parseInt(
        prompt(`Enter number of shares to sell (Available: ${entry.shares}):`),
        10
      );

      if (isNaN(sharesToSell) || sharesToSell <= 0 || sharesToSell > entry.shares) {
        alert("Invalid number of shares.");
        return;
      }

      // Calculate realized profit
      const sellValue = sharesToSell * entry.currentPrice;
      const costOfSharesToSell = sharesToSell * entry.price;
      const profitDelta = sellValue - costOfSharesToSell;

      // Update the portfolio
      const updatedPortfolio = [...state.portfolio];
      updatedPortfolio[index].shares -= sharesToSell;

      if (updatedPortfolio[index].shares === 0) {
        updatedPortfolio.splice(index, 1);
      }

      // Persist updated portfolio and realized profit
      const updatedRealizedProfit = state.realizedProfit + profitDelta;
      PortfolioService.savePortfolio(state.selectedPortfolio, updatedPortfolio);
      PortfolioService.saveRealizedProfit(state.selectedPortfolio, updatedRealizedProfit);

      // Commit changes to state
      commit("SET_PORTFOLIO", updatedPortfolio);
      commit("SET_REALIZED_PROFIT", updatedRealizedProfit);
    },

    async updateCurrentPrice({ state, commit }, { symbol, index }) {
      try {
        const quote = await StockService.getGlobalQuote(symbol);
        const updatedPortfolio = [...state.portfolio];
        updatedPortfolio[index].currentPrice = quote.price;
        commit("SET_PORTFOLIO", updatedPortfolio);
      } catch (error) {
        console.error(`Error fetching current price for ${symbol}:`, error);
      }
    },
  },
};
