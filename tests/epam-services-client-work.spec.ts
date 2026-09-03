import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ClientWorkPage } from './pages/ClientWorkPage';

/**
 * Scenario: Navigate to the Client Work page via the Services header menu.
 *
 * Steps:
 *  1. Navigate to https://www.epam.com/
 *  2. Select "Services" from the header menu
 *  3. Click the "Explore Our Client Work" link
 *  4. Verify that the "Client Work" text is visible on the page
 *
 * Note: The EPAM homepage renders a full-viewport hero slider whose
 * image/video layer intercepts pointer events on the sticky header.
 * We use `dispatchEvent('click')` to bypass the overlay without resorting
 * to arbitrary timeouts.
 */
test.describe('EPAM Services – Client Work navigation', () => {
  test('should navigate to Client Work page via Services menu', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const clientWorkPage = new ClientWorkPage(page);

    // Step 1 – Open the EPAM homepage
    await homePage.goto();

    // Step 2 – Open the "Services" dropdown in the main navigation
    await homePage.openServicesMenu();

    // Confirm the dropdown is expanded before proceeding
    await expect(homePage.servicesNavButton).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    // Step 3 – Click "Explore Our Client Work"
    await homePage.clickExploreClientWork();

    // Step 4 – Verify "Client Work" heading is visible on the destination page
    await clientWorkPage.waitForLoad();

    await expect(clientWorkPage.heading).toBeVisible();
    await expect(page).toHaveURL(/\/services\/client-work/);
    await expect(page).toHaveTitle(/Client Work/);
  });
});
