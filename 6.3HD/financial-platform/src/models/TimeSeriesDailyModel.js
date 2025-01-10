class TimeSeriesDailyModel {
  constructor(data) {
    const metaData = data['Meta Data'];
    const timeSeries = data['Time Series (Daily)'];

    // Metadata
    this.information = metaData['1. Information'];
    this.symbol = metaData['2. Symbol'];
    this.lastRefreshed = metaData['3. Last Refreshed'];
    this.outputSize = metaData['4. Output Size'];
    this.timeZone = metaData['5. Time Zone'];

    // Time Series Data
    this.timeSeries = this.parseTimeSeries(timeSeries);
  }

  parseTimeSeries(timeSeries) {
    return Object.entries(timeSeries).map(([date, values]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'], 10),
    }));
  }
}

module.exports = TimeSeriesDailyModel;
