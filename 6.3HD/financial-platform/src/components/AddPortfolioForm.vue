<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="symbol">Stock Symbol:</label>
        <input v-model="symbol" id="symbol" type="text" placeholder="e.g., AAPL" required />
      </div>
      <div>
        <label for="units">Units:</label>
        <input v-model.number="units" id="units" type="number" placeholder="e.g., 10" required />
      </div>
      <div>
        <label for="price">Purchase Price:</label>
        <input v-model.number="price" id="price" type="number" placeholder="e.g., 150.50" required />
      </div>
      <button type="submit">Add to Portfolio</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        symbol: '',
        units: null,
        price: null,
      };
    },
    methods: {
      submitForm() {
        if (this.symbol && this.units && this.price) {
          const newEntry = {
            symbol: this.symbol.toUpperCase(),
            units: this.units,
            purchasePrice: this.price,
          };
          this.$emit('add', newEntry);
          this.resetForm();
        }
      },
      resetForm() {
        this.symbol = '';
        this.units = null;
        this.price = null;
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  label {
    font-weight: bold;
  }
  
  input {
    padding: 5px;
    font-size: 14px;
  }
  
  button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  