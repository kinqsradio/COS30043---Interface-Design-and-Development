export class ExpenseService {
    constructor() {
        this.expenses = [];
    }

    addExpense(expense) {
        this.expenses.push(expense);
        this.notifyUpdate();
    }

    deleteExpense(index) {
        this.expenses.splice(index, 1);
        this.notifyUpdate();
    }

    getExpenses() {
        return this.expenses;
    }

    notifyUpdate() {
        const event = new CustomEvent('expensesUpdated', { detail: this.expenses });
        document.dispatchEvent(event);
    }
}
