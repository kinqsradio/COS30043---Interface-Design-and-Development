<template>
  <form @submit.prevent="submitForm">
    <input v-model="symbol" placeholder="Symbol" required />
    <input v-model.number="price" placeholder="Purchase Price" required />
    <input v-model.number="shares" placeholder="Shares" required />
    <button type="submit">Add to Portfolio</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      symbol: "",
      price: 0,
      shares: 0,
    };
  },
  methods: {
    submitForm() {
      this.$emit("add", {
        symbol: this.symbol,
        price: this.price,
        shares: this.shares,
      });
      this.symbol = "";
      this.price = 0;
      this.shares = 0;
    },
  },
};
</script>
