import { ExpenseService } from './services/expenseService.js';
import { CSVService } from './services/csvService.js';
import { FormComponent } from './components/formComponent.js';
import { TableComponent } from './components/tableComponent.js';
import { ChartComponent } from './components/chartComponent.js';

// Initialize Services
const expenseService = new ExpenseService();
const csvService = new CSVService(expenseService);

// Initialize Components
const formComponent = new FormComponent(expenseService);
const tableComponent = new TableComponent(expenseService, csvService);
const chartComponent = new ChartComponent(expenseService);

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    formComponent.init();
    tableComponent.init();
    chartComponent.init();
});