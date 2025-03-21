// tests/vision-board.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Vision Board App", () => {
  // Helper function to log in using dummy credentials.
  async function login(page) {
    await page.goto("/login");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "password");
    await page.click('button:has-text("Login")');
    // Wait until dashboard loads.
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator("h1")).toHaveText(/My Vision Board/i);
  }

  test("should navigate from home to login", async ({ page }) => {
    await page.goto("/");
    // Click on the Login button on the home page.
    await page.getByRole("button", { name: /login/i }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("h1")).toHaveText(/login/i);
  });

  test("should navigate from home to register", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /register/i }).click();
    await expect(page).toHaveURL(/\/register/);
    await expect(page.locator("h1")).toHaveText(/register/i);
  });

  test("should login and display the dashboard", async ({ page }) => {
    await login(page);
  });

  test("should add a new goal and display it on the dashboard", async ({
    page,
  }) => {
    await login(page);

    // Click the "Add Goal" button
    await page.click('button:has-text("Add Goal")');
    await expect(page).toHaveURL(/\/add-goal/);

    // Fill out the add-goal form
    await page.fill('input[type="text"]', "New Test Goal");
    await page.fill("textarea", "This is a test goal description.");
    // Optionally fill an image URL if the input exists
    // (If your input doesn't have a placeholder, adjust the selector)
    await page.fill(
      'input[type="text"][placeholder="Image URL"]',
      "https://via.placeholder.com/150"
    );
    await page.fill('input[type="date"]', "2025-05-01");

    // Submit the form
    await page.click('button:has-text("Create Goal")');
    // Expect redirection to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    // Verify the new goal appears on the dashboard
    await expect(
      page.locator("h3", { hasText: "New Test Goal" })
    ).toBeVisible();
  });

  test("should view a goal and delete it", async ({ page }) => {
    await login(page);

    // Add a new goal to later delete it.
    await page.click('button:has-text("Add Goal")');
    await expect(page).toHaveURL(/\/add-goal/);
    await page.fill('input[type="text"]', "Goal To Delete");
    await page.fill("textarea", "This goal will be deleted.");
    await page.fill('input[type="date"]', "2025-05-01");
    await page.click('button:has-text("Create Goal")');
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(
      page.locator("h3", { hasText: "Goal To Delete" })
    ).toBeVisible();

    // Click the goal card to navigate to its detail page.
    await page.locator("h3", { hasText: "Goal To Delete" }).first().click();
    await expect(page).toHaveURL(/\/goals\/\d+/);

    // Click the "Delete" button on the detail page.
    await page.click('button:has-text("Delete")');
    // Expect a redirection back to dashboard.
    await expect(page).toHaveURL(/\/dashboard/);
    // Verify the deleted goal is no longer present.
    await expect(page.locator("h3", { hasText: "Goal To Delete" })).toHaveCount(
      0
    );
  });
});
