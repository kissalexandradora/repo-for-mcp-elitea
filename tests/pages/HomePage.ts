import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object for the EPAM homepage (https://www.epam.com/).
 */
export class HomePage {
  readonly page: Page;

  /** "Accept All" button in the cookie-consent banner */
  readonly cookieAcceptBtn: Locator;

  /** "Services" toggle button in the main navigation */
  readonly servicesNavBtn: Locator;

  /** "Explore Our Client Work" link inside the hero carousel */
  readonly exploreClientWorkLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieAcceptBtn = page.getByRole('button', { name: 'Accept All' });
    this.servicesNavBtn = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('button', { name: 'Services' });
    this.exploreClientWorkLink = page
      .getByRole('link', { name: 'Explore Our Client Work' })
      .first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /** Dismiss the cookie banner if it is visible. */
  async acceptCookiesIfPresent(): Promise<void> {
    if (await this.cookieAcceptBtn.isVisible()) {
      await this.cookieAcceptBtn.click();
    }
  }

  /**
   * Open the "Services" dropdown in the main navigation.
   * The button is sometimes obscured by the hero image slider, so we
   * trigger the click via JavaScript to avoid pointer-event interception.
   */
  async openServicesMenu(): Promise<void> {
    await this.servicesNavBtn.evaluate((el: HTMLElement) => el.click());
    // Wait until the dropdown is expanded
    await this.servicesNavBtn.waitFor({ state: 'visible' });
  }

  /**
   * Click the "Explore Our Client Work" link in the hero carousel.
   * The link is inside a rotating slider; we use `force: true` to bypass
   * any transient overlay and navigate directly.
   */
  async clickExploreClientWork(): Promise<void> {
    await this.exploreClientWorkLink.click({ force: true });
  }
}
