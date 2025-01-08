export class TableComponent {
    constructor(expenseService, csvService) {
        this.expenseService = expenseService;
        this.csvService = csvService;
    }

    init() {
        const tableBody = document.getElementById('expensesTable').querySelector('tbody');
        const importButton = document.getElementById('importCsv');
        const exportButton = document.getElementById('exportCsv');

        // Update Table on Data Change
        document.addEventListener('expensesUpdated', (event) => {
            const expenses = event.detail;
            tableBody.innerHTML = expenses.map((expense, index) => `
                <tr>
                    <td>${expense.date}</td>
                    <td>${expense.category}</td>
                    <td>$${expense.amount.toFixed(2)}</td>
                    <td><button class="btn btn-sm btn-danger" data-index="${index}">Delete</button></td>
                </tr>
            `).join('');

            // Attach Delete Handlers
            tableBody.querySelectorAll('.btn-danger').forEach(button => {
                button.addEventListener('click', () => {
                    const index = parseInt(button.getAttribute('data-index'), 10);
                    this.expenseService.deleteExpense(index);
                });
            });
        });

        // Handle Import/Export
        importButton.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) this.csvService.importFromCSV(file);
        });

        exportButton.addEventListener('click', () => {
            this.csvService.exportToCSV();
        });
    }
}
