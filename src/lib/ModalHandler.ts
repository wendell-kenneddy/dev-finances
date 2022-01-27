export class ModalHandler {
  private hasListener: boolean = false;

  constructor(
    private readonly element: HTMLDivElement,
    private readonly onClose: () => void
  ) {}

  open() {
    this.element?.classList.add('active');

    if (!this.hasListener) {
      window.addEventListener('keydown', (e) => this.closeOnEsc(e));
      this.hasListener = true;
    }
  }

  close() {
    this.element?.classList.remove('active');
    this.onClose();

    if (this.hasListener) {
      window.removeEventListener('keydown', (e) => this.closeOnEsc(e));
      this.hasListener = false;
    }
  }

  private closeOnEsc(e: KeyboardEvent) {
    const key = e.key;

    if (key === 'Escape') this.close();
  }
}
