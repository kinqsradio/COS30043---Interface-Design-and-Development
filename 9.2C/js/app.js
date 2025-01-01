// Shared State for Units
let globalUnits = [];

// Load units.json dynamically
fetch('./js/9.2 units.json')
    .then(response => response.json())
    .then(data => {
        globalUnits = data;
    })
    .catch(error => console.error('Error fetching units:', error));

// Hardcoded credentials
const users = [
    { username: 'admin', password: 'password' }
];

// Login Component
const Login = {
    template: `
        <div class="container mt-5">
            <h2>Login</h2>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="username" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" class="form-control" required>
                </div>
                <button class="btn btn-primary" type="submit">Login</button>
            </form>
            <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        login() {
            const user = users.find(
                u => u.username === this.username && u.password === this.password
            );

            if (user) {
                this.$router.push('/dashboard');
            } else {
                this.errorMessage = 'Invalid username or password';
            }
        }
    }
};

// View Units Component
const ViewUnits = {
    data() {
        return {
            units: globalUnits,
            currentPage: 1,
            perPage: 5
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.units.length / this.perPage);
        },
        paginatedUnits() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.units.slice(start, end);
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    },
    template: `
        <div>
            <h3>View Units</h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Credit Points</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in paginatedUnits" :key="unit.code">
                        <td>{{ unit.code }}</td>
                        <td>{{ unit.desc }}</td>
                        <td>{{ unit.cp }}</td>
                        <td>{{ unit.type }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary mx-2" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button class="btn btn-primary mx-2" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
            </div>
        </div>
    `
};

// Insert Unit Component
const InsertUnit = {
    data() {
        return {
            unit: { code: '', desc: '', cp: '', type: '' },
            message: '',
            messageType: ''
        };
    },
    methods: {
        async insertUnit() {
            try {
                globalUnits.push({ ...this.unit });
                this.message = 'Unit added and saved successfully';
                this.messageType = 'success';
                this.unit = { code: '', desc: '', cp: '', type: '' };
                
                // Here you would typically make an API call to your backend
                // For example:
                // await fetch('/api/units', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(this.unit)
                // });
                
            } catch (error) {
                this.message = 'Error saving unit';
                this.messageType = 'danger';
                console.error('Error saving unit:', error);
            }
        }
    },
    template: `
        <div>
            <h3>Insert Unit</h3>
            <form @submit.prevent="insertUnit">
                <div class="form-group">
                    <label for="code">Code</label>
                    <input type="text" id="code" v-model="unit.code" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="desc">Description</label>
                    <input type="text" id="desc" v-model="unit.desc" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="cp">Credit Points</label>
                    <input type="number" id="cp" v-model="unit.cp" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="type">Type</label>
                    <input type="text" id="type" v-model="unit.type" class="form-control" required>
                </div>
                <button class="btn btn-primary" type="submit">Insert</button>
            </form>
            <div v-if="message" :class="'alert alert-' + messageType" class="mt-3">
                {{ message }}
            </div>
        </div>
    `
};

// Delete Unit Component
const DeleteUnit = {
    data() {
        return {
            unitCode: '',
            message: '',
            messageType: ''
        };
    },
    methods: {
        async deleteUnit() {
            try {
                const index = globalUnits.findIndex(u => u.code === this.unitCode);
                if (index !== -1) {
                    globalUnits.splice(index, 1);
                    this.message = 'Unit deleted and saved successfully';
                    this.messageType = 'success';
                    this.unitCode = '';
                    
                    // Here you would typically make an API call to your backend
                    // For example:
                    // await fetch(`/api/units/${this.unitCode}`, {
                    //     method: 'DELETE'
                    // });
                    
                } else {
                    this.message = 'Unit not found';
                    this.messageType = 'warning';
                }
            } catch (error) {
                this.message = 'Error deleting unit';
                this.messageType = 'danger';
                console.error('Error deleting unit:', error);
            }
        }
    },
    template: `
        <div>
            <h3>Delete Unit</h3>
            <form @submit.prevent="deleteUnit">
                <div class="form-group">
                    <label for="code">Code</label>
                    <input type="text" id="code" v-model="unitCode" class="form-control" required>
                </div>
                <button class="btn btn-danger" type="submit">Delete</button>
            </form>
            <div v-if="message" :class="'alert alert-' + messageType" class="mt-3">
                {{ message }}
            </div>
        </div>
    `
};

// Dashboard Component
const Dashboard = {
    components: {
        ViewUnits,
        InsertUnit,
        DeleteUnit
    },
    template: `
        <div class="container mt-5">
            <h2>Dashboard</h2>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'ViewUnits' }" @click="setTab('view')">View</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'InsertUnit' }" @click="setTab('insert')">Insert</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'DeleteUnit' }" @click="setTab('delete')">Delete</a>
                </li>
            </ul>
            <div class="mt-4">
                <component :is="activeTab"></component>
            </div>
        </div>
    `,
    data() {
        return {
            activeTab: 'ViewUnits'
        };
    },
    methods: {
        setTab(tab) {
            const tabs = {
                view: 'ViewUnits',
                insert: 'InsertUnit',
                delete: 'DeleteUnit'
            };
            this.activeTab = tabs[tab];
        }
    }
};

// Vue Router Setup
const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard }
];

const router = new VueRouter({ routes });

// Create Vue instance with router
new Vue({
    el: '#app',
    router
});