import type { Transaction } from '../common/types';

export class TransactionElement {
  private elementHasBeenPopulated: boolean = false;
  private element: HTMLTableRowElement = document.createElement('tr');

  constructor(
    private readonly transaction: Transaction,
    private readonly onRemove: (transaction: Transaction) => void
  ) {}

  toString() {
    return JSON.stringify(this.transaction, null, 2);
  }

  getElement() {
    return this.element;
  }

  buildHTML() {
    if (this.elementHasBeenPopulated) {
      console.log('element already populated');
      return this;
    }

    this.appendTds();
    this.appendRemoveButton();

    this.elementHasBeenPopulated = true;
    return this;
  }

  private appendTds() {
    this.element.innerHTML = `
      <td class="description">${this.transaction.description}</td>
      <td class="${this.transaction.type}">${this.transaction.amount}</td>
      <td>${this.transaction.date}</td>
    `;
  }

  private appendRemoveButton() {
    const td = document.createElement('td');
    const removeButton = document.createElement('button');
    const image = document.createElement('img');

    removeButton.type = 'button';
    removeButton.name = 'Remover transação';
    removeButton.classList.add('remove-transaction');
    removeButton.onclick = () => this.onRemove(this.transaction);

    image.src = '/minus.svg';
    image.alt = 'Remover transação';
    image.width = 24;
    image.height = 24;

    removeButton.appendChild(image);
    td.appendChild(removeButton);
    this.element.appendChild(td);
  }
}
