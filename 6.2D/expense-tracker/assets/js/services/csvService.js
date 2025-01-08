export class CSVService {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }

    exportToCSV() {
        const expenses = this.expenseService.getExpenses();
        const headers = ['Date', 'Category', 'Amount'];
        const rows = expenses.map(e => `${e.date},${e.category},${e.amount}`);
        const csvContent = [headers.join(','), ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'expenses.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
