const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });

  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });

  // Try to find B2BCTA by text
  const b2bSection = page.getByText('Партньор за вашия бизнес');
  const exists = await b2bSection.count();
  console.log('B2BCTA found:', exists > 0);

  if (exists > 0) {
    await b2bSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  } else {
    // Scroll to footer section
    const footer = page.getByText('Готови ли сте за');
    const footerExists = await footer.count();
    console.log('Footer found:', footerExists > 0);
    if (footerExists > 0) {
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    }
  }

  await page.screenshot({ path: 'b2bcta-section.png' });

  await browser.close();
  console.log('Screenshot saved to b2bcta-section.png');
})();
