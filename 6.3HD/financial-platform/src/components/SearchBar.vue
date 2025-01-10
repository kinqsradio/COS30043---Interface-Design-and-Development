<template>
    <div class="search-bar">
      <input
        v-model="query"
        type="text"
        placeholder="Search for a stock symbol..."
        @keyup.enter="emitSearch"
        class="search-input"
      />
      <button @click="emitSearch" class="search-button">Search</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchBar",
    data() {
      return {
        query: "", // The search query entered by the user
      };
    },
    methods: {
      /**
       * Emit the search query to the parent component
       */
      emitSearch() {
        if (this.query.trim() !== "") {
          this.$emit("search", this.query.trim());
          this.query = ""; // Clear input after emitting
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .search-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .search-button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  </style>
  