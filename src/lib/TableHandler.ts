export class TableHandler {
  private readonly table = document.getElementById(
    'transactions-table'
  ) as HTMLTableElement;
  private readonly tbody = this.table.querySelector(
    'tbody'
  ) as HTMLTableSectionElement;

  populate(rows: HTMLTableRowElement[]) {
    rows.forEach((row) => this.tbody.appendChild(row));

    return this;
  }

  clear() {
    this.tbody.innerHTML = '';
    return this;
  }
}
