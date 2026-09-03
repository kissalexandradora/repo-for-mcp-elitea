import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ClientWorkPage } from './pages/ClientWorkPage';

/**
 * Scenario: Navigate to EPAM homepage → open Services menu →
 * click "Explore Our Client Work" → verify "Client Work" heading is visible.
 */
test.describe('EPAM Services – Client Work navigation', () => {
  test('should navigate to Client Work page via Services menu and hero link', async ({ page }) => {
    const homePage = new HomePage(page);
    const clientWorkPage = new ClientWorkPage(page);

    // Step 1: Navigate to the EPAM homepage
    await homePage.goto();

    // Step 2: Dismiss cookie banner if present
    await homePage.acceptCookiesIfPresent();

    // Step 3: Select "Services" from the header menu (opens the dropdown)
    await homePage.openServicesMenu();

    // Verify the Services dropdown is now expanded
    await expect(homePage.servicesNavBtn).toHaveAttribute('aria-expanded', 'true');

    // Step 4: Click the "Explore Our Client Work" link in the hero section
    await homePage.clickExploreClientWork();

    // Step 5: Verify the "Client Work" page loaded and the heading is visible
    await expect(page).toHaveURL(new RegExp(ClientWorkPage.PATH));
    await expect(clientWorkPage.pageHeading).toBeVisible();
    await expect(clientWorkPage.pageHeading).toHaveText('Client Work');
  });
});
