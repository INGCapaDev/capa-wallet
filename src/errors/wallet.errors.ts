export class SelectedCardNotFoundError extends Error {
  override readonly name = 'SelectedCardNotFoundError';

  constructor(id: string) {
    super(`Selected card is not in the wallet: ${id}`);
  }
}

export class InvalidWalletNavigationError extends Error {
  override readonly name = 'InvalidWalletNavigationError';

  constructor() {
    super('Wallet navigation produced an invalid card index');
  }
}
