new Vue({
    el: '#app',
    data: {
        units: [] // Array to store the data from JSON
    },
    methods: {
        fetchData() {
            // Fetching data from the JSON file
            fetch('7.2 units.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.units = data; // Assign data to Vue's units array
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('Failed to load data. Please check the file path or server setup.');
                });
        }
    }
});
