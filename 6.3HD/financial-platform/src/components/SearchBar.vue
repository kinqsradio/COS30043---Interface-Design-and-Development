<template>
  <div class="search-bar">
    <div class="search-bar-container">
      <!-- Magnifying glass icon -->
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      
      <!-- Input Field -->
      <input
        v-model="query"
        type="text"
        placeholder="Search for a stock symbol..."
        @keyup.enter="emitSearch"
        class="search-input"
      />
    </div>

    <!-- Search Button -->
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
  align-items: center; 
  gap: 10px;
  margin-bottom: 20px;
}

/* Container holding icon + input, so they look like one element */
.search-bar-container {
  display: flex;
  flex: 1; /* make it grow to fill space */
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 10px; /* horizontal padding for icon & input */
  position: relative;
}

/* The magnifying glass icon */
.search-icon {
  width: 16px;
  height: 16px;
  color: #888; /* lighten if desired */
  margin-right: 8px;
  flex-shrink: 0;
}

/* The input field */
.search-input {
  flex: 1;
  padding: 10px 0; /* vertical padding only, since horizontal is in container */
  border: none;
  font-size: 16px;
  outline: none; /* Remove default outline */
  background-color: transparent;
}

/* Highlight input on focus */
.search-input:focus {
  border: none;
  outline: none;
}

/* Search button */
.search-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>
