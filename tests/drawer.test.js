import { assert } from 'chai';
import 'jsdom-global/register';
import { Drawer } from '../src/main';
import { lineString, multiLineString } from './data';

describe('Test Drawer', () => {
  it('Draws a profile from MultiLineString', () => {
    let drawer = new Drawer(multiLineString);
    let svg = drawer.getSVG();

    assert.isDefined(svg);
  });

  it('Draws a profile from LineString', () => {
    let drawer = new Drawer(lineString);
    let svg = drawer.getSVG();

    assert.isDefined(svg);
  });
});
