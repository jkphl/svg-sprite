'use strict';

/* jshint -W117 */
const { readFile }  = require('fs');
const path          = require('path');
const { promisify } = require('util');
const should        = require('should');

const BrowserManager      = require('../lib/browser-mananger');
const calculateSvgDimension = require('../lib/svg-sprite/calculate-svg-dimension');

const readFileAsync = promisify(readFile);

describe('calculateSvgDimension', () => {
    let browserManager;

    before(async () => {
        browserManager = new BrowserManager();
    });

    after(() => browserManager.closeBrowser());

    it('should return with the svg dimension', async () => {
        const svgFilePath = path.join(__dirname, 'fixture/svg/weather-clear-dimension-calculation.svg');
        const svg = await readFileAsync(svgFilePath, 'utf-8');
        const dimension = await calculateSvgDimension(svg, await browserManager.getBrowser());

        should.deepEqual(dimension,{ width: 43, height: 43 });
    }).timeout(5000);
});
