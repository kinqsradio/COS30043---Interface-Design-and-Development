class TimeSeriesDailyModel {
  constructor(data) {
    // Fallback to empty object if "Meta Data" is missing
    const metaData = data["Meta Data"] || {};
    const timeSeries = data["Time Series (Daily)"] || {};

    this.information = metaData["1. Information"] || "No Info";
    this.symbol = metaData["2. Symbol"] || "Unknown";
    this.lastRefreshed = metaData["3. Last Refreshed"] || null;
    this.outputSize = metaData["4. Output Size"] || null;
    this.timeZone = metaData["5. Time Zone"] || null;

    // If the daily data is missing or empty, parseTimeSeries returns []
    this.timeSeries = this.parseTimeSeries(timeSeries);
  }

  parseTimeSeries(timeSeries) {
    return Object.entries(timeSeries).map(([date, values]) => ({
      date,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"], 10),
    }));
  }
}

export default TimeSeriesDailyModel;
