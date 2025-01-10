# financial-platform

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Folder Structure

```
src/
├── assets/                 # Static assets like images, icons, etc.
│   └── logo.png
├── components/             # Reusable UI components
│   ├── AddPortfolioForm.vue   # Form for adding portfolio entries
│   ├── BaseChart.vue          # Base component for rendering charts
│   ├── DashboardStats.vue     # Stats card for dashboard
│   ├── PriceCard.vue          # Price display card
│   ├── PortfolioTable.vue     # Table for displaying portfolio data
│   └── SearchBar.vue          # Search bar for finding stocks
├── layouts/               # Page layouts (optional)
│   └── DefaultLayout.vue      # Layout wrapper for all pages
├── router/                # Vue Router configuration
│   └── index.js               # Routing for all pages
├── scripts/                
│   └── tableSorting.js               # Sort DashboardStats stock tables
├── services/              # Logic for local storage and APIs
│   ├── ApiService.js          # Fetch data from APIs (e.g., Alpha Vantage)
│   ├── PortfolioService.js    # Manage portfolio in Local Storage
│   ├── SearchService.js       # Handle search functionality
│   └── StockService.js         # Stock data (e.g., intraday) API logic
├── models/              # Models for API response
│   ├── GlobalQuoteModel.js          
│   ├── SymbolSearchModel.js    
│   ├── TimeSeriesDailyModel.js       
│   └── TopGainersLosersModels.js         
│
├── store/                 # Vuex state management
│   ├── index.js              # Vuex store setup
│   └── modules/              # Modular Vuex store
│       ├── dashboard.js        # Dashboard-specific state
│       ├── portfolio.js        # Portfolio-specific state
│       └── search.js           # Search-specific state
├── views/                 # Page-level components
│   ├── Dashboard.vue          # Main dashboard view
│   ├── Portfolio.vue          # Portfolio view
│   ├── Search.vue             # Search view
│   └── Charts.vue             # Charts and trend analysis view
├── App.vue                # Main Vue application component
├── main.js                # Application entry point
└── styles/                # Global CSS/SCSS styles
    ├── global.css            # General styles
    ├── dashboard.css            
    ├── tables.css            
    └── variables.css         # CSS variables for theming
```

### Endpoints

| **Endpoint**             | **Function**                          | **Purpose**                                                                                      | **Used In**               |
|---------------------------|----------------------------------------|--------------------------------------------------------------------------------------------------|---------------------------|
| `TIME_SERIES_DAILY`       | Daily stock data                     | Fetch daily stock prices to display historical data and trends.                                 | **Portfolio**, **Charts** |
| `GLOBAL_QUOTE`            | Real-time stock quote                | Fetch the latest stock price, volume, and percentage changes.                                   | **Portfolio** |
| `SYMBOL_SEARCH`           | Search for stocks                    | Enable users to search for stocks by name or ticker symbol.                                     | **Search**                |
| `TOP_GAINERS_LOSERS`      | Market trends                        | Fetch top gainers, losers, and most active tickers for the US market.                           | **Dashboard**             |

---

### **Where and Why These Endpoints Are Used**

#### **1. Dashboard**
- **Endpoints**:
  - `TOP_GAINERS_LOSERS`: To display trending stocks (top gainers, losers, and active tickers).
- **Purpose**: Summarize real-time market data, highlight trends.

#### **2. Portfolio**
- **Endpoints**:
  - `GLOBAL_QUOTE`: To update real-time portfolio values.
  - `TIME_SERIES_DAILY`: To calculate historical performance of portfolio holdings.
- **Purpose**: Track user portfolios and display current values and gains/losses.

#### **3. Search**
- **Endpoints**:
  - `SYMBOL_SEARCH`: To search stocks by name or ticker.
- **Purpose**: Allow users to find stocks.

#### **4. Charts**
- **Endpoints**:
  - `TIME_SERIES_DAILY`: For daily trends.
- **Purpose**: Visualize stock performance trends over various timeframes.

---

### **Summary of Final Endpoints**

| **View/Component**       | **Endpoints Used**                                                                 |
|---------------------------|------------------------------------------------------------------------------------|
| **Dashboard**            | `TOP_GAINERS_LOSERS`                 |
| **Portfolio**            | `GLOBAL_QUOTE`, `TIME_SERIES_DAILY`                                                |
| **Search**               | `SYMBOL_SEARCH`                                                        |
| **Charts**               | `TIME_SERIES_DAILY` |

---