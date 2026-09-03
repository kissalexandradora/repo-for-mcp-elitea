import { test, expect } from '@playwright/test';

test('Navigate to EPAM Services and verify Client Work page text', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Open the Services menu in the header
  await page.getByRole('link', { name: 'Services' }).click();

  // Click the "Explore Our Client Work" link
  await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

  // Verify that "Client Work" is visible on the page
  await expect(page.getByText('Client Work')).toBeVisible();
});