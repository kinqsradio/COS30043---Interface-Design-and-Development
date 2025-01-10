import StockService from "@/services/StockService";

const state = {
  topGainersLosers: {
    gainers: [],
    losers: [],
    active: [],
  },
  selectedCategory: "gainers", // Default category
};

const getters = {
  selectedData(state) {
    return state.topGainersLosers[state.selectedCategory] || [];
  },
};

const mutations = {
  setTopGainersLosers(state, data) {
    state.topGainersLosers = data;
  },
  setSelectedCategory(state, category) {
    state.selectedCategory = category;
  },
};

const actions = {
  async fetchTopGainersLosers({ commit }) {
    try {
      const data = await StockService.getTopGainersLosers();
      commit("setTopGainersLosers", {
        gainers: data.topGainers,
        losers: data.topLosers,
        active: data.mostActivelyTraded,
      });
    } catch (error) {
      console.error("Error fetching top gainers/losers:", error.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
