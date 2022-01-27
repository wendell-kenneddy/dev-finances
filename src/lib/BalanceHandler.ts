import { formatCurrency } from './utils/formatCurrency';

export class BalanceHandler {
  private readonly container = document.getElementById(
    'transactions-summary'
  ) as HTMLElement;

  updateBalance(summary: { incomes: number; expenses: number; total: number }) {
    const { incomes, expenses, total } = summary;

    this.updateIncomes(incomes);
    this.updateExpenses(expenses);
    this.updateTotal(total);
  }

  private updateIncomes(amount: number) {
    const incomesContainer = this.container.querySelector(
      '.card-incomes .card-value'
    ) as HTMLSpanElement;

    incomesContainer.innerText = formatCurrency(amount);
  }

  private updateExpenses(amount: number) {
    const expensesContainer = this.container.querySelector(
      '.card-expenses .card-value'
    ) as HTMLSpanElement;

    expensesContainer.innerText = formatCurrency(amount);
  }

  private updateTotal(amount: number) {
    const totalContainer = this.container.querySelector(
      '.card-total .card-value'
    ) as HTMLSpanElement;

    totalContainer.innerText = formatCurrency(amount);
  }
}
