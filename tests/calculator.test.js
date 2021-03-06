import { assert } from 'chai';
import { Calculator } from '../src/main';
import { lineString, multiLineString, points } from './data';

describe('Test Calculator', () => {
   it('Calculates profile parameters from MultiLineString', () => {
    const calculator = new Calculator(multiLineString);

    assert.isArray(calculator.vertices);
    assert.closeTo(calculator.parameters.length, 252, 1);
    assert.closeTo(calculator.parameters.realLength, 252, 1);
    assert.closeTo(calculator.parameters.ascend, 8, 1);
    assert.closeTo(calculator.parameters.descend, 4, 1);
    assert.closeTo(calculator.parameters.minh, 560, 1);
    assert.closeTo(calculator.parameters.maxh, 564, 1);
  });

  it('Calculates profile parameters from LineString', () => {
    const calculator = new Calculator(lineString);

    assert.isArray(calculator.vertices);
    assert.closeTo(calculator.parameters.length, 252, 1);
    assert.closeTo(calculator.parameters.realLength, 252, 1);
    assert.closeTo(calculator.parameters.ascend, 8, 1);
    assert.closeTo(calculator.parameters.descend, 4, 1);
    assert.closeTo(calculator.parameters.minh, 560, 1);
    assert.closeTo(calculator.parameters.maxh, 564, 1);
  });

  it('Calculates profile parameters from array of points', () => {
    const calculator = new Calculator(points);

    assert.isArray(calculator.vertices);
    assert.closeTo(calculator.parameters.length, 252, 1);
    assert.closeTo(calculator.parameters.realLength, 252, 1);
    assert.closeTo(calculator.parameters.ascend, 8, 1);
    assert.closeTo(calculator.parameters.descend, 4, 1);
    assert.closeTo(calculator.parameters.minh, 560, 1);
    assert.closeTo(calculator.parameters.maxh, 564, 1);
  });
});
