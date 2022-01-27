import { v4 as uuidv4 } from 'uuid';

import type { RawTransaction } from '../common/types';

export class FormHandler {
  private readonly form = document.getElementById(
    'new-transaction-form'
  ) as HTMLFormElement;
  private readonly descriptionInput = this.form.querySelector(
    'input#description'
  ) as HTMLInputElement;
  private readonly amountInput = this.form.querySelector(
    'input#amount'
  ) as HTMLInputElement;

  handleData(e: SubmitEvent): RawTransaction {
    e.preventDefault();

    this.validate();

    return {
      id: uuidv4(),
      type: Number(this.amountInput.value) >= 1 ? 'income' : 'expense',
      description: this.descriptionInput.value,
      amount: Number(this.amountInput.value) * 100,
      date: Date.now()
    };
  }

  clear() {
    this.descriptionInput.value = '';
    this.amountInput.value = '';
  }

  private validate() {
    const onlyNumberRegex = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;

    if (!this.descriptionInput.value) throw new Error('Descrição necessária.');
    if (!this.amountInput.value) throw new Error('Valor necessário.');
    if (!this.amountInput.value.match(onlyNumberRegex)?.length)
      throw new Error('Valor inválido.');
    if (Number(this.amountInput.value) === 0)
      throw new Error('Valor inválido.');
  }
}
