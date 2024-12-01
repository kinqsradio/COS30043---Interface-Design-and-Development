new Vue({
    el: '#app',
    data: {
        posts: [] // Array to store retrieved data
    },
    methods: {
        fetchData() {
            const url = "https://jsonplaceholder.typicode.com/posts";
            // Using jQuery to fetch data
            $.getJSON(url, (data) => {
                this.posts = data.map(post => {
                    return {
                        id: post.id,
                        title: post.title
                    };
                });
            }).fail(() => {
                alert("Failed to fetch data. Please check your internet connection.");
            });
        }
    }
});
