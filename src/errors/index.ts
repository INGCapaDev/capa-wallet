export class MissingApplicationRootError extends Error {
  override readonly name = 'MissingApplicationRootError';

  constructor() {
    super('Application root element is missing');
  }
}
