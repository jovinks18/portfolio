import { expect, test } from "@playwright/test";

const internalRoutes = [
  "/",
  "/home",
  "/minimal",
  "/work/legali-ai",
  "/work/ab-inbev",
  "/work/maki-people",
  "/work/zolostays",
];

const experienceEntries = [
  {
    route: "/work/legali-ai",
    company: "Legali AI",
    role: "Chief of Staff — Product & Operations",
    displayRole: "Chief of Staff",
    period: "May 2026–Present · San Francisco, CA",
    dates: "May 2026–Present",
    summary: "7,000+ users · 2 AI pilots · 30% fewer follow-up delays",
  },
  {
    route: "/work/ab-inbev",
    company: "AB InBev Europe",
    role: "Data Analyst · BI Product Owner",
    displayRole: "Product Owner",
    period: "Feb 2025–May 2025 · Prague, Czechia",
    dates: "Feb 2025–May 2025",
    summary: "30+ users · 6 markets · 20+ reporting hours saved/month",
  },
  {
    route: "/work/maki-people",
    company: "Maki People",
    role: "Customer Success",
    displayRole: "Customer Success",
    period: "Jul 2024–Jan 2025 · Paris, France",
    dates: "Jul 2024–Jan 2025",
    summary: "7 enterprise accounts · 95% on-time go-live · 6 product improvements",
  },
  {
    route: "/work/zolostays",
    company: "Zolostays",
    role: "Product Intern",
    displayRole: "Product Intern",
    period: "Oct 2021–Mar 2022 · Bengaluru, India",
    dates: "Oct 2021–Mar 2022",
    summary: "20+ customer signals · 3 prioritized conversion blockers",
  },
] as const;

const projectRepositories = [
  ["Linea", "https://github.com/jovinks18/linea"],
  ["RavenStack CS Analysis", "https://github.com/jovinks18/ravenstack-cs-analysis"],
  ["LocalOps Agent Swarm", "https://github.com/jovinks18/localops-agent-swarm"],
  ["vocal-pantry", "https://github.com/jovinks18/vocal-pantry"],
  ["VisionAudit AI", "https://github.com/jovinks18/VisionAudit-AI"],
  ["UniMeet", "https://github.com/jovinks18/unimeet-app"],
  ["minify-context (mcx)", "https://github.com/jovinks18/minify-context"],
  ["local-schema-compiler", "https://github.com/jovinks18/local-schema-compiler"],
  ["vocal-mind", "https://github.com/jovinks18/vocal-mind"],
  ["my-dash", "https://github.com/jovinks18/my-dash"],
] as const;

for (const route of internalRoutes) {
  test(`${route} loads without a browser error`, async ({ page }) => {
    const browserErrors: string[] = [];
    page.on("pageerror", (error) => browserErrors.push(error.message));

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });

    expect(response?.ok()).toBe(true);
    await expect(page.locator("body")).not.toBeEmpty();
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(page.locator('a.skip-link[href="#main-content"]')).toHaveCount(1);
    expect(browserErrors).toEqual([]);
  });
}

test("skip link is the first keyboard stop", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");
  await expect(page.locator("a.skip-link")).toBeFocused();
});

test("cinematic page has one main heading and hierarchical section headings", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h2#education-heading")).toHaveCount(1);
  await expect(page.locator("h2#work-heading")).toHaveCount(1);
  await expect(page.locator("h2#projects-heading")).toHaveCount(1);
  await expect(page.locator("h2#contact-heading")).toHaveCount(1);
});

test("home section navigation uses real anchors", async ({ page }) => {
  await page.goto("/home", { waitUntil: "domcontentloaded" });

  for (const href of ["#education", "#experience", "#projects", "#notes", "#contact"]) {
    await expect(page.locator(`nav a[href="${href}"]`)).toHaveCount(1);
  }
});

test("reduced-motion preference enables native cinematic layout", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "load" });

  await expect(page.locator("main.cine")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".panel .stage").first()).toHaveCSS("position", "relative");
  await expect(page.locator(".panel .stage").first()).toHaveCSS("transform", "none");
});

test("internal work links point to every work route", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  for (const route of internalRoutes.filter((route) => route.startsWith("/work/"))) {
    await expect(page.locator(`a[href="${route}"]`)).toHaveCount(1);
  }
});

test("cinematic experience rows keep details concise", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  for (const entry of experienceEntries) {
    const link = page.locator(`#work a[href="${entry.route}"]`);

    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute(
      "aria-label",
      `View ${entry.company} — ${entry.role} experience details`
    );
    await expect(link).toContainText(entry.company);
    await expect(link).toContainText(entry.displayRole);
    await expect(link).not.toContainText(entry.dates);
    await expect(link).not.toContainText(entry.summary);
  }

  await expect(page.getByText("Earlier experience", { exact: true })).toHaveCount(0);
});

test("experience detail pages keep titles, dates, metadata, and headings consistent", async ({
  page,
}) => {
  for (const entry of experienceEntries) {
    await page.goto(entry.route, { waitUntil: "domcontentloaded" });

    await expect(page.locator("h1")).toHaveText(entry.company);
    await expect(page.locator(".work-role")).toHaveText(entry.role);
    await expect(page.locator(".work-kicker")).toHaveText(entry.period);
    await expect(page.getByRole("heading", { name: "What I owned" })).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "Selected impact" })).toHaveCount(1);
    await expect(page).toHaveTitle(
      `${entry.role} at ${entry.company} | Jovin Sivakumar`
    );
  }
});

test("primary profile CTAs use the expected destinations", async ({ page }) => {
  await page.goto("/home", { waitUntil: "domcontentloaded" });

  await expect(page.locator('a[href="https://github.com/jovinks18"]')).toHaveCount(2);
  await expect(
    page.locator('a[href="https://www.linkedin.com/in/jovinks"]')
  ).toHaveCount(2);
  await expect(
    page.locator('a[href="mailto:jovin.sivakumar@berkeley.edu"]')
  ).toHaveCount(2);
});

test("every project CTA points to its confirmed GitHub repository", async ({ page }) => {
  await page.goto("/home", { waitUntil: "domcontentloaded" });

  for (const [, repository] of projectRepositories) {
    await expect(page.locator(`a[href="${repository}"]`)).toHaveCount(1);
  }
});

test("cinematic project folders expose the correct GitHub CTA", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });

  for (const [project, repository] of projectRepositories) {
    const folder = page.getByRole("button", { name: project, exact: true });
    const controlledRegion = await folder.getAttribute("aria-controls");
    const folderId = await folder.getAttribute("id");

    if (!controlledRegion || !folderId) {
      throw new Error(`${project} folder is missing disclosure identifiers`);
    }

    await expect(folder).toHaveAttribute("aria-expanded", "false");
    await folder.evaluate((button: HTMLButtonElement) => button.click());
    await expect(folder).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(`#${controlledRegion}`)).toHaveAttribute(
      "aria-labelledby",
      folderId
    );
    await expect(
      page.locator(`.folder-detail a[href="${repository}"]`)
    ).toHaveCount(1);
  }
});
