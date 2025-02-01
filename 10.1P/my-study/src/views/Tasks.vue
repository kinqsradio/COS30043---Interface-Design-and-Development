<template>
  <div class="tasks-container">
    <h2>Tasks</h2>
    <!-- Input and Post Button -->
    <div class="form-group mt-4">
      <label for="statusInput" class="form-label">Status:</label>
      <div class="input-group">
        <input
          type="text"
          id="statusInput"
          v-model="strStatus"
          class="form-control"
          placeholder="Enter your status"
        />
        <button class="btn btn-primary ms-2" @click="add">Post</button>
      </div>
    </div>

    <!-- Status List -->
    <div class="status-list mt-4">
      <div
        v-for="(post, index) in statPosts"
        :key="index"
        class="status-item d-flex justify-content-between align-items-center mb-3"
      >
        <span class="status-text">{{ post }}</span>
        <button class="btn btn-danger btn-sm" @click="remove(index)">
          Del
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tasks",
  data() {
    return {
      statPosts: [],
      strStatus: "",
    };
  },
  methods: {
    add() {
      if (this.strStatus.trim() !== "") {
        this.statPosts.unshift(this.strStatus);
        this.strStatus = "";
      }
    },
    remove(index) {
      this.statPosts.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.tasks-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-weight: bold;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
  text-align: left;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-control {
  flex: 1;
  font-size: 14px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.btn {
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
}

.status-list {
  text-align: left;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.status-item:hover {
  background-color: #f1f1f1;
}

.status-text {
  font-size: 14px;
  color: #333;
  flex-grow: 1;
}

.btn-danger {
  font-size: 12px;
  padding: 6px 10px;
}
</style>
