export class FormComponent {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }

    init() {
        const form = document.getElementById('expenseForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const date = document.getElementById('date').value;
            const category = document.getElementById('category').value;
            const amount = parseFloat(document.getElementById('amount').value);
            this.expenseService.addExpense({ date, category, amount });
            form.reset();
        });
    }
}
