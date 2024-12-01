const units = [
    { code: 'ICT10001', desc: 'Problem Solving with ICT', cp: 12.5, type: 'Core' },
    { code: 'COS10005', desc: 'Web Development', cp: 12.5, type: 'Core' },
    { code: 'INF10003', desc: 'Introduction to Business Information Systems', cp: 12.5, type: 'Core' },
    { code: 'INF10002', desc: 'Database Analysis and Design', cp: 12.5, type: 'Core' },
    { code: 'COS10009', desc: 'Introduction to Programming', cp: 12.5, type: 'Core' },
    { code: 'INF30029', desc: 'Information Technology Project Management', cp: 12.5, type: 'Core' },
    { code: 'ICT30005', desc: 'Professional Issues in Information Technology', cp: 12.5, type: 'Core' },
    { code: 'ICT30001', desc: 'Information Technology Project', cp: 12.5, type: 'Core' }
];

// Component for the list of units
const UnitList = {
    data() {
        return { units };
    },
    template: `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Description</th>
                    <th>More Info</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="unit in units" :key="unit.code">
                    <td>{{ unit.code }}</td>
                    <td>{{ unit.desc }}</td>
                    <td>
                        <router-link :to="'/unit/' + unit.code">show details</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    `
};

// Component for displaying unit details
const UnitDetail = {
    data() {
        return { units };
    },
    computed: {
        unit() {
            return this.units.find(unit => unit.code === this.$route.params.id);
        }
    },
    template: `
        <div v-if="unit">
            <h3>Unit Code: {{ unit.code }}</h3>
            <ul>
                <li>{{ unit.code }}</li>
                <li>{{ unit.desc }}</li>
                <li>{{ unit.cp }}</li>
                <li>{{ unit.type }}</li>
            </ul>
        </div>
        <div v-else>
            <p>Unit not found.</p>
        </div>
    `
};

// Define routes
const routes = [
    { path: '/', component: UnitList },
    { path: '/unit/:id', component: UnitDetail }
];

// Create VueRouter instance
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// Create Vue app
const app = Vue.createApp({});
app.use(router);
app.mount('#app');
