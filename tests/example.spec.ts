import { test, expect } from '@playwright/test';

test('dashMate homepage has microphone button', async ({ page }) => {
  await page.goto('/');
  
  // Check for the microphone button
  const micButton = page.locator('button').filter({ hasText: /start listening|stop listening/i });
  await expect(micButton).toBeVisible();
  
  // Check for the task list heading
  await expect(page.getByRole('heading', { name: /Your Tasks/i })).toBeVisible();
});

test('microphone button toggles state', async ({ page }) => {
  await page.goto('/');
  
  const micButton = page.locator('button').filter({ hasText: /start listening/i });
  await expect(micButton).toBeVisible();
  
  // Click to start listening
  await micButton.click();
  
  // Button should now show stop listening
  const stopButton = page.locator('button').filter({ hasText: /stop listening/i });
  await expect(stopButton).toBeVisible();
  
  // Click again to stop
  await stopButton.click();
  
  // Should be back to start listening
  await expect(micButton).toBeVisible();
});

test('task list displays correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check for task items
  const taskItems = page.locator('li').filter({ hasText: /Review meeting notes|Update project proposal|Call the team/ });
  
  // Verify at least one task is visible
  const count = await taskItems.count();
  expect(count).toBeGreaterThan(0);
});