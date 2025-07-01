// @ts-check
import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
 
  await page.goto('http://localhost:3000/login');

 
  await page.getByLabel('Username').fill('johndoe');

  
  await page.getByLabel('Password').fill('johnd@e');

  
  await page.getByRole('button', { name: /Log In/i }).click();

  
  //await expect(page).toHaveURL(/dashboard|home/i); 
  //await expect(page).toHaveURL(/dashboard|home|\/$/i);

});
