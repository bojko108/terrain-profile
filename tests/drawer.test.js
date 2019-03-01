import 'jsdom-global/register';
import { assert } from 'chai';
import { Drawer } from '../src/main';
import { lineString, multiLineString, points } from './data';

describe('Test Drawer', () => {
  it('Draws a profile from MultiLineString', () => {
    const drawer = new Drawer(multiLineString);
    const svg = drawer.getSVG();

    assert.isNotNull(svg);
    assert.isNotNull(svg.querySelector('#profileGraph'));
  });

  it('Draws a profile from LineString', () => {
    const drawer = new Drawer(lineString);
    const svg = drawer.getSVG();

    assert.isNotNull(svg);
    assert.isNotNull(svg.querySelector('#profileGraph'));
  });

  it('Draws a profile from array of points', () => {
    const drawer = new Drawer(points);
    const svg = drawer.getSVG();

    assert.isNotNull(svg);
    assert.isNotNull(svg.querySelector('#profileGraph'));
  });

  it('Draws a profile with different style', () => {
    const options = {
      showLabels: true,
      showDistanceAxis: true,
      showHeightAxis: true,
      profileFillColor: '#01ff70',
      profileStrokeColor: '#3d9970'
    };
    const drawer = new Drawer(points);
    const svg = drawer.getSVG(options);

    assert.isNotNull(svg);
    assert.isNotNull(svg.querySelector('#labelTotalDistance'));
    assert.isNotNull(svg.querySelector('#labelElevGain'));
    assert.isNotNull(svg.querySelector('#labelElevLost'));
    assert.isTrue(svg.getElementsByClassName('tick').length > 0);
    assert.equal(svg.querySelector('#profileGraph').getAttribute('fill'), options.profileFillColor);
    assert.equal(svg.querySelector('#profileGraph').getAttribute('stroke'), options.profileStrokeColor);
  });
});
