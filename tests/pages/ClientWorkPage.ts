import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object for the EPAM Client Work page
 * (https://www.epam.com/services/client-work).
 */
export class ClientWorkPage {
  readonly page: Page;

  /** The main H1 heading that contains the "Client Work" text. */
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Client Work', level: 1 });
  }

  /** Wait until the page is fully loaded and the heading is visible. */
  async waitForLoad(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
  }
}
