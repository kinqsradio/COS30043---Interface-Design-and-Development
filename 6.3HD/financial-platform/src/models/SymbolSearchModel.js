class SymbolSearchModel {
    constructor(data) {
      this.bestMatches = this.parseMatches(data.bestMatches);
    }
  
    parseMatches(matches) {
      return matches.map(match => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        marketOpen: match['5. marketOpen'],
        marketClose: match['6. marketClose'],
        timezone: match['7. timezone'],
        currency: match['8. currency'],
        matchScore: parseFloat(match['9. matchScore']),
      }));
    }
  }
  
  module.exports = SymbolSearchModel;
  