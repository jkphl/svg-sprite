'use strict';

/* jshint -W117 */
const should         = require('should');
const BrowserManager = require('../lib/browser-mananger');

describe('BrowserManager', ()=>{

    it('should handle multiple instance creation', async () => {
        const browserManager = new BrowserManager();
        const [instance1, instance2] = await Promise.all([
            browserManager.getBrowser(),
            browserManager.getBrowser()
        ]);

        should.ok(instance1);
        should.equal(instance1, instance2);

        await browserManager.closeBrowser();
   }).timeout(10000);

   it('should not throw an exception when instance not exists but call closeBrowser', () => {
       const browserManager = new BrowserManager();

       return browserManager.closeBrowser();
   }).timeout(10000);

    it('should not throw an exception when instance exists but call closeBrowser multiple times', async () => {
        const browserManager = new BrowserManager();

        await browserManager.getBrowser();
        await browserManager.closeBrowser();
        await browserManager.closeBrowser();
    }).timeout(10000);

    it('should create separated browser instance/manager', async () => {
        const browserManager1 = new BrowserManager();
        const browserManager2 = new BrowserManager();

        should.notEqual(await browserManager1.getBrowser(), await browserManager2.getBrowser());

        await browserManager1.closeBrowser();
        await browserManager2.closeBrowser();
    }).timeout(10000);
});
