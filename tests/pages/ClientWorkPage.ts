import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object for the EPAM Client Work page
 * (https://www.epam.com/services/client-work).
 */
export class ClientWorkPage {
  readonly page: Page;

  /** The main "Client Work" h1 heading on the page */
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: 'Client Work', level: 1 });
  }

  /** Expected URL path for this page */
  static readonly PATH = '/services/client-work';
}
