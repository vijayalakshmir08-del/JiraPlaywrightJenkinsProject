const { test, expect } = require("@playwright/test");

const practicePage = "https://rahulshettyacademy.com/AutomationPractice/";

test("[SCRUM-15] TC1 - Select Radio2", async ({ page }) => {
  await page.goto(practicePage);

  const radios = page.locator('input[type="radio"]');
  await radios.nth(1).check();

  await expect(radios.nth(1)).toBeChecked();
  await expect(radios.nth(0)).not.toBeChecked();
  await expect(radios.nth(2)).not.toBeChecked();
});

test("[SCRUM-16] TC2 - Select Option2", async ({ page }) => {
  await page.goto(practicePage);

  const dropdown = page.locator("#dropdown-class-example");
  await dropdown.selectOption({ label: "Option2" });

  await expect(dropdown.locator("option:checked")).toHaveText("Option2");
});

test("[SCRUM-17] TC3 - Enter Vijaya and accept alert", async ({ page }) => {
  await page.goto(practicePage);
  await page.locator("#name").fill("Vijaya");

  const dialogPromise = page.waitForEvent("dialog");
  await page.locator("#alertbtn").click();

  const dialog = await dialogPromise;
  expect(dialog.message()).toBe("Hello Vijaya");
  await dialog.accept();
});

test("[SCRUM-18] TC4 - Hover and click Top", async ({ page }) => {
  await page.goto(practicePage);

  const hoverButton = page.locator("#mousehover");
  await hoverButton.scrollIntoViewIfNeeded();
  await hoverButton.hover();
  await page.getByText("Top", { exact: true }).click();

  await expect.poll(() => page.evaluate(() => window.scrollY))
    .toBeLessThan(10);
});

test("[SCRUM-19] TC5 - Hover and click Reload", async ({ page }) => {
  await page.goto(practicePage);

  const hoverButton = page.locator("#mousehover");
  await hoverButton.scrollIntoViewIfNeeded();
  await hoverButton.hover();

  const loaded = page.waitForEvent("load");
  await page.getByText("Reload", { exact: true }).click();
  await loaded;

  await expect(
    page.getByRole("heading", { name: "Practice Page" })
  ).toBeVisible();
});