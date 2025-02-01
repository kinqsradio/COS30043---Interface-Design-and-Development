<template>
  <div class="units-container">
    <h2>Units</h2>
    <table class="table table-bordered table-hover mt-4">
      <thead>
        <tr>
          <th style="width: 15%;">Code</th>
          <th style="width: 45%;">Description</th>
          <th style="width: 20%;">Credit Points</th>
          <th style="width: 20%;">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="unit in units" :key="unit.code">
          <td>{{ unit.code }}</td>
          <td>{{ unit.desc }}</td>
          <td>{{ unit.cp }}</td>
          <td>{{ unit.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import units from '../assets/units.json';
export default {
  name: "Units",
  data() {
    return {
      units,
    };
  },
};
</script>

<style scoped>
.units-container {
  max-width: 1000px;
  margin: 0 auto; /* Centers the container */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* Centers all text inside */
}

h2 {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
}

.table {
  margin: 0 auto; /* Centers the table within the container */
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
}

.table thead th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
}

.table tbody tr td {
  text-align: center;
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.table td, .table th {
  padding: 10px;
  font-size: 14px;
}
</style>
