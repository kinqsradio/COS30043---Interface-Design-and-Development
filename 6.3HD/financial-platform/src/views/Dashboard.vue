<template>
  <div>
    <h1>Dashboard</h1>

    <!-- Section: Top Gainers and Losers -->
    <section>
      <h2>Top Gainers and Losers</h2>
      <div v-if="topGainersLosers">
        <p><strong>Top Gainer:</strong> {{ topGainersLosers.gainers?.[0]?.ticker || 'N/A' }} - ${{ topGainersLosers.gainers?.[0]?.price || 'N/A' }}</p>
        <p><strong>Top Loser:</strong> {{ topGainersLosers.losers?.[0]?.ticker || 'N/A' }} - ${{ topGainersLosers.losers?.[0]?.price || 'N/A' }}</p>
        <p><strong>Most Active:</strong> {{ topGainersLosers.active?.[0]?.ticker || 'N/A' }} - ${{ topGainersLosers.active?.[0]?.price || 'N/A' }}</p>
      </div>
      <p v-else>Loading top gainers and losers...</p>
    </section>

    <!-- Section: Real-Time Stock Quotes -->
    <section>
      <h2>Real-Time Stock Quotes</h2>
      <div v-if="stockQuotes.length">
        <div v-for="quote in stockQuotes" :key="quote.symbol">
          <p><strong>{{ quote.symbol }}</strong>: ${{ quote.price }} ({{ quote.change }}%)</p>
        </div>
      </div>
      <p v-else>Loading stock quotes...</p>
    </section>

    <!-- Section: Dashboard Stats -->
    <section>
      <h2>Dashboard Statistics</h2>
      <div>
        <p><strong>Total Gainers:</strong> {{ topGainersLosers.gainers?.length || 0 }}</p>
        <p><strong>Total Losers:</strong> {{ topGainersLosers.losers?.length || 0 }}</p>
        <p><strong>Total Active Stocks:</strong> {{ topGainersLosers.active?.length || 0 }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import StockService from '@/services/StockService';

export default {
  name: 'DashboardPage',
  data() {
    return {
      topGainersLosers: {
        gainers: [],
        losers: [],
        active: [],
      },
      stockQuotes: [],
    };
  },
  async created() {
    // Fetch top gainers/losers
    this.fetchTopGainersLosers();

    // Fetch real-time stock quotes for predefined symbols
    this.fetchStockQuotes(['AAPL', 'GOOGL', 'MSFT']); // Example symbols
  },
  methods: {
    async fetchTopGainersLosers() {
      try {
        const data = await StockService.getTopGainersLosers();

        // Assign the correct data structure
        this.topGainersLosers = {
          gainers: data.top_gainers || [],
          losers: data.top_losers || [],
          active: data.most_actively_traded || [],
        };

        console.log('Parsed Top Gainers, Losers, and Active Tickers:', this.topGainersLosers);
      } catch (error) {
        console.error('Error fetching top gainers/losers:', error.message);
        this.topGainersLosers = { gainers: [], losers: [], active: [] };
      }
    },
    async fetchStockQuotes(symbols) {
      try {
        const quotes = await Promise.all(
          symbols.map(async (symbol) => {
            const data = await StockService.getGlobalQuote(symbol);
            return {
              symbol: data['Global Quote']['01. symbol'],
              price: data['Global Quote']['05. price'],
              change: data['Global Quote']['10. change percent'],
            };
          })
        );
        this.stockQuotes = quotes;
      } catch (error) {
        console.error('Error fetching stock quotes:', error.message);
      }
    },
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>
