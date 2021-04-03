'use strict';

/* jshint -W117 */

/**
 * Calculate a svg rendered dimension.
 * It truncate everything before the first '<svg ' string
 *
 * @param svg {string}
 * @param browser {puppeteer.Browser}
 * @returns {Promise<{ height:number, width: number }>}
 */
async function calculateSvgDimension(svg, browser) {
    let page;

    try {
        page = await browser.newPage();
        const html = '<svg xmlns="http://www.w3.org/2000/svg">' + svg.substr(svg.toLowerCase().indexOf('<svg')) + '</svg>';
        await page.setContent(html, { waitUntil:'networkidle0' });

        return await page.evaluate(() => {
            const rect = document.getElementsByTagName('svg')[1].getBoundingClientRect();

            return { height: rect.height, width: rect.width };
        });
    } finally{
      if (page){
          await page.close();
      }
    }
}

module.exports = calculateSvgDimension;
