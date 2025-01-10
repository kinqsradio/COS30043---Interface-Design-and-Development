class GlobalQuoteModel {
    constructor(data) {
      const quote = data['Global Quote'];
  
      this.symbol = quote['01. symbol'];
      this.open = parseFloat(quote['02. open']);
      this.high = parseFloat(quote['03. high']);
      this.low = parseFloat(quote['04. low']);
      this.price = parseFloat(quote['05. price']);
      this.volume = parseInt(quote['06. volume'], 10);
      this.latestTradingDay = quote['07. latest trading day'];
      this.previousClose = parseFloat(quote['08. previous close']);
      this.change = parseFloat(quote['09. change']);
      this.changePercent = quote['10. change percent'];
    }
  }
  
  module.exports = GlobalQuoteModel;
  