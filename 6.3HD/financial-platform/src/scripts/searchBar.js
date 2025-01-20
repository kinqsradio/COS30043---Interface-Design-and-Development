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