import type { RawTransaction } from '../common/types';

export class TransactionStore {
  private readonly key = '@devfinances:transactions';

  get(): RawTransaction[] {
    return JSON.parse(localStorage.getItem(this.key) as string) || [];
  }

  set(value: any) {
    localStorage.setItem(this.key, JSON.stringify(value, null, 2));
  }
}
