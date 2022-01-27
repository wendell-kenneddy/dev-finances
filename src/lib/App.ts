import { normalizeTransaction } from './utils/normalizeTransaction';

import { TransactionStore } from './TransactionStore';
import { TableHandler } from './TableHandler';
import { FormHandler } from './FormHandler';
import { BalanceHandler } from './BalanceHandler';
import { ModalHandler } from './ModalHandler';
import { TransactionElement } from './TransactionElement';

import type { Transaction } from '../common/types';

export class App {
  private readonly store = new TransactionStore();
  private readonly tableHandler = new TableHandler();
  private readonly formHandler = new FormHandler();
  private readonly balanceHandler = new BalanceHandler();
  private readonly modalHandler = new ModalHandler(
    document.getElementById('new-transaction-modal') as HTMLDivElement,
    () => {
      this.formHandler.clear();
    }
  );

  constructor() {}

  init() {
    this.setupListeners();
    this.balanceHandler.updateBalance(this.calculateSummary());
    this.populateTable();
  }

  reload() {
    this.balanceHandler.updateBalance(this.calculateSummary());
    this.tableHandler.clear();
    this.populateTable();
  }

  private calculateSummary() {
    const transactions = this.store.get();

    return transactions.reduce(
      (acc, val) => {
        val.amount / 100 > 0
          ? (acc.incomes += val.amount / 100)
          : (acc.expenses += val.amount / 100);

        acc.total += val.amount / 100;
        return acc;
      },
      {
        incomes: 0,
        expenses: 0,
        total: 0
      }
    );
  }

  private setupListeners() {
    const newTransactionButton = document.querySelector(
      'button.new-transaction'
    ) as HTMLButtonElement;
    const cancelButton = document.querySelector(
      'button.cancel'
    ) as HTMLButtonElement;
    const newTransactionForm = document.getElementById(
      'new-transaction-form'
    ) as HTMLFormElement;

    newTransactionButton.addEventListener('click', () =>
      this.modalHandler.open()
    );

    cancelButton.addEventListener('click', () => {
      this.modalHandler.close();
      this.formHandler.clear();
    });

    newTransactionForm.addEventListener('submit', (e) => {
      this.handleNewTransaction(e);
    });
  }

  private handleNewTransaction(e: SubmitEvent) {
    try {
      const data = this.formHandler.handleData(e);
      const transactions = [data, ...this.store.get()];

      this.store.set(transactions);
      this.modalHandler.close();

      this.reload();
    } catch (error) {
      error instanceof Error && alert(error.message);
    }
  }

  private populateTable() {
    const transactions = this.store.get();
    const tableRows = transactions.map((transaction) => {
      return new TransactionElement(normalizeTransaction(transaction), (t) =>
        this.handleTransactionRemove(t)
      )
        .buildHTML()
        .getElement();
    });

    this.tableHandler.populate(tableRows);
  }

  private handleTransactionRemove(transaction: Transaction) {
    const filteredTransactions = this.store
      .get()
      .filter((t) => t.id !== transaction.id);

    this.store.set(filteredTransactions);
    this.reload();
  }
}
