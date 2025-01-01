// NameTest Component
const NameTest = {
    template: `
        <div>
            <h1>Name Test</h1>
            <p>Please enter your name:</p>
            <input type="text" v-model="strName" placeholder="Enter your name" class="form-control" />
            <p v-if="strName.toLowerCase() === 'anh'">Awesome name!</p>
            <p v-else-if="strName">{{ strName }} is not my name!</p>
        </div>
    `,
    data() {
        return { strName: '' };
    }
};

// PostManagement Component
const PostManagement = {
    data() {
        return {
            statPosts: [],
            strStatus: ''
        };
    },
    template: `
        <div>
            <h1>Post Management</h1>
            <div class="form-group">
                <label for="statusInput">Status:</label>
                <input type="text" id="statusInput" v-model="strStatus" class="form-control" placeholder="Enter your status">
                <button class="btn btn-primary mt-2" @click="add">Post</button>
            </div>
            <div v-if="statPosts.length">
                <div v-for="(post, index) in statPosts" :key="index" class="d-flex align-items-center mb-2">
                    <span class="flex-grow-1">{{ post }}</span>
                    <button class="btn btn-danger btn-sm" @click="remove(index)">Delete</button>
                </div>
            </div>
        </div>
    `,
    methods: {
        add() {
            if (this.strStatus.trim() !== '') {
                this.statPosts.unshift(this.strStatus);
                this.strStatus = '';
            }
        },
        remove(index) {
            this.statPosts.splice(index, 1);
        }
    }
};

// StudentMarks Component
const StudentMarks = {
    data() {
        return {
            studMarks: [
                { name: "Amy", mark: 90 },
                { name: "Bill", mark: 80 },
                { name: "Casey", mark: 78 },
                { name: "David", mark: 84 },
                { name: "Eve", mark: 72 },
                { name: "Frank", mark: 88 },
                { name: "Grace", mark: 95 }
            ]
        };
    },
    template: `
        <div>
            <h1>Student Marks</h1>
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in studMarks" :key="student.name">
                        <td>{{ student.name }}</td>
                        <td>{{ student.mark }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
};

// UnitDetails Component
const UnitDetails = {
    data() {
        return {
            units: []
        };
    },
    created() {
        fetch('./js/9.1 units.json')
            .then(response => response.json())
            .then(data => {
                this.units = data;
            });
    },
    template: `
        <div>
            <h1>Unit Details</h1>
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Credit Points</th>
                        <th>Type</th>
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
    `
};

// Vue Router Setup
const routes = [
    { path: '/', component: NameTest }, // Default route set to Name Test
    { path: '/post-management', component: PostManagement },
    { path: '/student-marks', component: StudentMarks },
    { path: '/unit-details', component: UnitDetails }
];

const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router
});
