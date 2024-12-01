Vue.component('app-mypost', {
    data: function() {
        return {
            statPosts: [],
            strStatus: ''
        };
    },
    template: `
        <div>
            <!-- Input and Post Button -->
            <div class="form-group">
                <label for="statusInput">Status:</label>
                <input type="text" id="statusInput" v-model="strStatus" class="form-control" placeholder="Enter your status">
                <button class="btn btn-primary mt-2" @click="add">Post</button>
            </div>

            <!-- Status List -->
            <div>
                <div v-for="(post, index) in statPosts" :key="index" class="status-item">
                    <span>{{ post }}</span>
                    <button class="btn btn-danger btn-sm" @click="remove(index)">Del</button>
                </div>
            </div>
        </div>
    `,
    methods: {
        add: function() {
            if (this.strStatus.trim() !== '') {
                this.statPosts.unshift(this.strStatus);
                this.strStatus = '';
            }
        },
        remove: function(index) {
            this.statPosts.splice(index, 1);
        }
    }
});

new Vue({
    el: '#app'
});
