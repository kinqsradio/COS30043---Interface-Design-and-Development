new Vue({
    el: '#app',
    data: {
        form: {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            confirmPassword: '',
            email: '',
            streetAddress: '',
            suburb: '',
            postcode: '',
            mobile: ''
        },
        formAction: "http://mercury.swin.edu.au/it000000/formtest.php", // Dynamically set action URL
        errors: {},
        showTerms: false
    },
    methods: {
        validateBeforeSubmit(event) {
            this.errors = {}; // Clear existing errors
            this.validateFields();

            if (Object.keys(this.errors).length === 0) {
                // No errors, allow form submission
                return true;
            } else {
                // Prevent form submission
                event.preventDefault();
            }
        },
        validateFields() {
            // First Name Validation
            if (!/^[A-Za-z]+$/.test(this.form.firstName)) {
                this.errors.firstName = 'First name must contain only letters.';
            }

            // Last Name Validation
            if (!/^[A-Za-z]+$/.test(this.form.lastName)) {
                this.errors.lastName = 'Last name must contain only letters.';
            }

            // Username Validation
            if (this.form.userName.length < 3) {
                this.errors.userName = 'Username must be at least 3 characters long.';
            }

            // Password Validation
            const specialCharRegex = /[$%^&*]/;
            if (this.form.password.length < 8 || !specialCharRegex.test(this.form.password)) {
                this.errors.password = 'Password must be at least 8 characters long and include one special character ($, %, ^, &, *).';
            }

            // Confirm Password Validation
            if (this.form.password !== this.form.confirmPassword) {
                this.errors.confirmPassword = 'Passwords do not match.';
            }

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.form.email)) {
                this.errors.email = 'Invalid email format.';
            }

            // Postcode Validation
            if (!/^\d{4}$/.test(this.form.postcode)) {
                this.errors.postcode = 'Postcode must be exactly 4 digits.';
            }

            // Mobile Validation
            if (!/^04\d{8}$/.test(this.form.mobile)) {
                this.errors.mobile = 'Mobile number must start with 04 and be 10 digits.';
            }
        }
    }
});
