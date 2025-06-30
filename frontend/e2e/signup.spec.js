// @ts-check
import { test, expect } from '@playwright/test';

test('signup with valid data - abdelhamid', async ({ page }) => {
  
  await page.goto('http://localhost:3000/signup');

  
  await page.getByLabel('First Name').fill('Abdelhamid');
  await page.getByLabel('Last Name').fill('Mouloudi');
  await page.getByLabel('Username').fill('abdelhamid');
  await page.getByLabel('email').fill('abdelhamid@example.com');
  await page.getByLabel('Password').fill('MySuperPassword123!');

  
  await page.getByRole('button', { name: /sign up/i }).click();

  
  //await expect(page).toHaveURL(/login/i);
});
