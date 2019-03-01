import { assert } from 'chai';
import { distance } from '../src/helpers';

describe('Test helpers', () => {
  it('Should calculate distance', () => {
    let start = { lat: 42.0931683015078, lon: 24.0482193231583 };
    let end = { lat: 42.09327634423971, lon: 24.0481923334301 };

    assert.closeTo(distance(start, end), 12, 1);

    start = { lat: 42.0931683015078, lon: 24.0482193231583 };
    end = { lat: 42.10461018607023, lon: 24.0343582537025 };

    assert.closeTo(distance(start, end), 1712, 1);
  });
});
