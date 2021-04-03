'use strict';

/* jshint -W117 */
/* jshint -W030 */

const { DOMParser }     = require('xmldom');
const { readFileSync }  = require('fs');
const path              = require('path');
const should            = require('should');

const SVGSpriter        = require('../lib/svg-sprite');

describe('shape', () => {

    it('should calculate the dimension if it svg does not contain viewBox or height, width properties', (done) => {
        const spriter = new SVGSpriter({
            shape: {
                dest: 'svg'
            }
        });

        const svgFilePath = path.join(__dirname, 'fixture/svg/weather-clear-dimension-calculation.svg');
        spriter.add(
            svgFilePath,
            'weather-clear-dimension-calculation.svg',
            readFileSync(svgFilePath, 'utf-8')
        );
        spriter.compile(function (error, result) {
            try {
                should(error).not.ok;
                should(result).be.an.Object;
                should(result).have.property('shapes');
                should(result.shapes).be.an.Array;

                const svg = result.shapes[0]._contents.toString();
                const dom = new DOMParser().parseFromString(svg, 'text/xml');

                should(dom.documentElement.getAttribute('height')).equal('43');
                should(dom.documentElement.getAttribute('width')).equal('43');

                done();
            } catch (error) {
                done(error);
            }
        });
    }).timeout(5000);
});
