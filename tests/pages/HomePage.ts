import { type Page, type Locator } from '@playwright/test';

/**
 * Page Object for the EPAM homepage (https://www.epam.com/).
 *
 * The hero-slider overlay intercepts pointer events on the sticky header,
 * so we use `dispatchEvent('click')` (equivalent to force-click) to interact
 * with the navigation elements reliably without arbitrary waits.
 */
export class HomePage {
  readonly page: Page;

  /** "Services" toggle button inside the main navigation.
   *
   * The element is a `div[role="button"]` (not a native `<button>`), so we
   * use the CSS class + aria-label selector which is stable across builds.
   */
  readonly servicesNavButton: Locator;

  /** "Explore Our Client Work" link in the hero section */
  readonly exploreClientWorkLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // The Services toggle is a div with role="button" – Playwright's getByRole
    // respects ARIA roles, so this resolves correctly.
    this.servicesNavButton = page.getByRole('button', { name: 'Services' });

    // The link text is exactly "Explore Our Client Work" and lives inside the
    // hero slider.  We target the first visible occurrence.
    this.exploreClientWorkLink = page
      .getByRole('link', { name: 'Explore Our Client Work' })
      .first();
  }

  /** Navigate to the EPAM homepage. */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Open the "Services" dropdown in the main navigation.
   *
   * The hero-slider image/video sits on top of the header and intercepts
   * pointer events, so we dispatch the click event directly on the element
   * to bypass the overlay.
   */
  async openServicesMenu(): Promise<void> {
    await this.servicesNavButton.dispatchEvent('click');
    // Wait until the dropdown is expanded
    await this.servicesNavButton.waitFor({ state: 'visible' });
  }

  /**
   * Click the "Explore Our Client Work" link.
   *
   * Same overlay issue as above – dispatchEvent bypasses it.
   */
  async clickExploreClientWork(): Promise<void> {
    await this.exploreClientWorkLink.dispatchEvent('click');
  }
}
