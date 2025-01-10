<template>
    <div class="portfolio">
      <h1>Portfolio Management</h1>
      <!-- Portfolio Selection and Management -->
      <div class="portfolio-management">
        <label for="portfolio-select">Select Portfolio:</label>
        <select id="portfolio-select" v-model="selectedPortfolio" @change="loadPortfolio">
          <option v-for="name in portfolioNames" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
        <button @click="createPortfolio">New Portfolio</button>
        <button @click="deleteCurrentPortfolio" v-if="portfolioNames.length > 0">
          Delete Portfolio
        </button>
      </div>
  
      <!-- Search Bar Component -->
      <SearchBar @search="handleSearch" />
  
      <!-- Search Results -->
      <div v-if="searchResults.length" class="search-results">
        <h3>Search Results:</h3>
        <ul>
          <li v-for="result in searchResults" :key="result.symbol">
            {{ result.symbol }} - {{ result.name }}
            <button @click="addToPortfolio(result)">Add to Portfolio</button>
          </li>
        </ul>
      </div>
  
      <!-- Portfolio Overview -->
      <div class="portfolio-overview" v-if="portfolio.length">
        <h3>Portfolio Summary:</h3>
        <p>Total Portfolio Value: ${{ calculatePortfolioValue().toFixed(2) }}</p>
        <p>Realized Profit: ${{ realizedProfit.toFixed(2) }}</p>
      </div>
  
      <!-- Portfolio Table Component -->
      <PortfolioTable
        :portfolio="portfolio"
        @sell="sellShares"
      />
    </div>
  </template>
  
  <script>
  import SearchBar from "@/components/SearchBar.vue";
  import PortfolioTable from "@/components/PortfolioTable.vue";
  import StockService from "@/services/StockService";
  import PortfolioService from "@/services/PortfolioService";
  
  export default {
    name: "PortfolioPage",
    components: {
      SearchBar,
      PortfolioTable,
    },
    data() {
      return {
        portfolioNames: [], // List of all portfolio names
        selectedPortfolio: null, // Currently selected portfolio
        portfolio: [], // Current portfolio data
        searchResults: [], // Search results
        realizedProfit: 0, // Realized profit for current portfolio
      };
    },
    created() {
      this.loadPortfolioNames();
      if (this.portfolioNames.length > 0) {
        this.selectedPortfolio = this.portfolioNames[0];
        this.loadPortfolio();
      }
    },
    methods: {
      loadPortfolioNames() {
        this.portfolioNames = Object.keys(PortfolioService.getAllPortfolios());
      },
      loadPortfolio() {
        if (this.selectedPortfolio) {
          this.portfolio = PortfolioService.getPortfolio(this.selectedPortfolio);
          this.portfolio.forEach((entry, index) => {
            this.updateCurrentPrice(entry.symbol, index);
          });
        }
      },
      createPortfolio() {
        const name = prompt("Enter a name for the new portfolio:");
        if (name && !this.portfolioNames.includes(name)) {
          PortfolioService.savePortfolio(name, []);
          this.portfolioNames.push(name);
          this.selectedPortfolio = name;
          this.portfolio = [];
        } else {
          alert("Portfolio name already exists or is invalid.");
        }
      },
      deleteCurrentPortfolio() {
        if (confirm(`Are you sure you want to delete portfolio "${this.selectedPortfolio}"?`)) {
          PortfolioService.deletePortfolio(this.selectedPortfolio);
          this.loadPortfolioNames();
          if (this.portfolioNames.length > 0) {
            this.selectedPortfolio = this.portfolioNames[0];
            this.loadPortfolio();
          } else {
            this.selectedPortfolio = null;
            this.portfolio = [];
          }
        }
      },
      async handleSearch(query) {
        try {
          const results = await StockService.searchStocks(query);
          this.searchResults = results.bestMatches;
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      },
      addToPortfolio(stock) {
        const purchasePrice = parseFloat(prompt("Enter Purchase Price:"));
        const shares = parseInt(prompt("Enter Number of Shares:"), 10);
  
        if (isNaN(purchasePrice) || isNaN(shares)) {
          alert("Invalid input. Please enter valid numbers.");
          return;
        }
  
        const existingEntryIndex = this.portfolio.findIndex(
          (entry) => entry.symbol === stock.symbol
        );
  
        if (existingEntryIndex !== -1) {
          const existingEntry = this.portfolio[existingEntryIndex];
          const totalShares = existingEntry.shares + shares;
          const totalCost =
            existingEntry.price * existingEntry.shares +
            purchasePrice * shares;
  
          existingEntry.shares = totalShares;
          existingEntry.price = totalCost / totalShares;
  
          PortfolioService.savePortfolio(this.selectedPortfolio, this.portfolio);
        } else {
          const newEntry = {
            symbol: stock.symbol,
            price: purchasePrice,
            shares,
            currentPrice: null,
          };
  
          this.portfolio.push(newEntry);
          PortfolioService.savePortfolio(this.selectedPortfolio, this.portfolio);
          this.updateCurrentPrice(stock.symbol, this.portfolio.length - 1);
        }
      },
      sellShares(index) {
        const entry = this.portfolio[index];
        const sharesToSell = parseInt(
          prompt(`Enter number of shares to sell (Available: ${entry.shares}):`),
          10
        );
  
        if (isNaN(sharesToSell) || sharesToSell <= 0 || sharesToSell > entry.shares) {
          alert("Invalid number of shares.");
          return;
        }
  
        const sellValue = sharesToSell * entry.currentPrice;
        const costOfSharesToSell = sharesToSell * entry.price;
        this.realizedProfit += sellValue - costOfSharesToSell;
  
        entry.shares -= sharesToSell;
  
        if (entry.shares === 0) {
          this.portfolio.splice(index, 1);
        }
        PortfolioService.savePortfolio(this.selectedPortfolio, this.portfolio);
      },
      async updateCurrentPrice(symbol, index) {
        try {
          const quote = await StockService.getGlobalQuote(symbol);
          this.portfolio[index].currentPrice = quote.price;
        } catch (error) {
          console.error(`Error fetching current price for ${symbol}:`, error);
        }
      },
      calculatePortfolioValue() {
        return this.portfolio.reduce((total, entry) => {
          return total + (entry.currentPrice || 0) * entry.shares;
        }, 0);
      },
    },
  };
  </script>
  
  <style scoped src="../styles/portfolio.css"></style>
  