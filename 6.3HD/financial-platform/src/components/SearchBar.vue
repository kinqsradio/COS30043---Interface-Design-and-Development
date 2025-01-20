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

<script src="@/scripts/searchBar.js"></script>

<style scoped src="@/styles/searchBar.css"></style>
