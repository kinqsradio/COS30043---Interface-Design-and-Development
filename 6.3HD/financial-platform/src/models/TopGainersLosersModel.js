class TopGainersLosersModel {
  constructor(data) {
    this.metadata = data.metadata;
    this.lastUpdated = data.last_updated;
    this.topGainers = this.parseEntries(data.top_gainers);
    this.topLosers = this.parseEntries(data.top_losers);
    this.mostActivelyTraded = this.parseEntries(data.most_actively_traded);
  }

  parseEntries(entries) {
    return entries.map(entry => ({
      ticker: entry.ticker,
      price: parseFloat(entry.price),
      changeAmount: parseFloat(entry.change_amount),
      changePercentage: entry.change_percentage,
      volume: parseInt(entry.volume, 10),
    }));
  }
}
  
module.exports = TopGainersLosersModel;
  