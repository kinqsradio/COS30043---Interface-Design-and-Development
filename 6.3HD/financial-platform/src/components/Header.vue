<template>
    <div class="header text-center py-3">
      <h1 class="mb-0" style="color: black;">{{ title }}</h1>
      <p v-if="subtitle" style="color: black;">{{ subtitle }}</p>
    </div>
</template>
  
<script>
  export default {
    name: "HeaderComponent",
    props: {
      title: {
        type: String,
        default: "",
      },
      subtitle: {
        type: String,
        default: "",
      },
    },
    computed: {
      computedTitle() {
        if (this.title) return this.title;
  
        // Match the current route
        const route = this.$route.name;
        if (route === "dashboard") return "Dashboard";
        if (route === "portfolio") return "Portfolio";
        return "Default Title";
      },
    },
  };
</script>
  
<style scoped>
  .header {
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
  }
</style>
  