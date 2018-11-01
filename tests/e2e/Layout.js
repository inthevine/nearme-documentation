import { Selector, ClientFunction } from "testcafe";

import LayoutPO from "./page-objects/Layout";

const Layout = new LayoutPO();

fixture("Layout").page(`${Layout.URL.staging}`);

test("Sidebar menu is collapsed on page load", async t => {
  await t.expect(Layout.SidebarItemExpanded.count).eql(0);
});

test("No sidebar item is active on page load", async t => {
  await t.expect(Layout.SidebarItemActive.count).eql(0);
});

test("Expanding menu works", async t => {
  await t
    .click(Layout.SidebarItem.withText(Layout.HowPOSWorksPhrase))
    .click(Layout.SidebarItemExpanded.find("a").withText(Layout.AboutPOSPhrase));

  const headerText = await Selector("h1")().textContent;

  await t.expect(headerText).eql(Layout.AboutPOSPhrase);
});

test("External links have target and rel attributes", async t => {
  await t.click(Selector("h4").withText(Layout.HowPOSWorksPhrase));

  await t.expect(Layout.TOSLink.withAttribute("target", "_blank").exists).ok();
  await t.expect(Layout.TOSLink.withAttribute("rel", "external noopener").exists).ok();
});

// test("Contributors are showing up", async t => {
/*
    Because there is a limit on github api requests (pretty low, 100) and it runs on every page reload
   lets not test this, because it will cause tests to be flaky
  */
// });
