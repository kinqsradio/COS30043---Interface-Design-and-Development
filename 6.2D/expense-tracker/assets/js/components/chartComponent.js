export class ChartComponent {
    constructor(expenseService) {
        this.expenseService = expenseService;
        this.chart = null;
    }

    init() {
        const ctx = document.getElementById('spendingChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: { labels: [], datasets: [{ label: 'Total Spending', data: [], backgroundColor: 'rgba(0, 123, 255, 0.5)' }] },
            options: { responsive: true, scales: { x: { beginAtZero: true }, y: { beginAtZero: true } } },
        });

        document.addEventListener('expensesUpdated', (event) => {
            const expenses = event.detail;
            const totalsByDate = expenses.reduce((totals, expense) => {
                totals[expense.date] = (totals[expense.date] || 0) + expense.amount;
                return totals;
            }, {});

            this.chart.data.labels = Object.keys(totalsByDate);
            this.chart.data.datasets[0].data = Object.values(totalsByDate);
            this.chart.update();
        });
    }
}
