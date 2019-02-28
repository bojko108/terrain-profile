import { assert } from 'chai';
import { distance, flatten } from '../src/helpers';

describe('Helpers tests', () => {
  it('Should calculate distance', () => {
    let start = { lat: 42.0931683015078, lon: 24.0482193231583 };
    let end = { lat: 42.09327634423971, lon: 24.0481923334301 };

    assert.closeTo(distance(start, end), 12, 1);

    start = { lat: 42.0931683015078, lon: 24.0482193231583 };
    end = { lat: 42.10461018607023, lon: 24.0343582537025 };

    assert.closeTo(distance(start, end), 1712, 1);
  });

  it('Should flatten arrays', () => {
    const expected = [1, 2, 3, 4, 5, 6];
    const result = flatten([[1, [2, [[3]]]], 4, [5, [[[6]]]]]);

    assert.isArray(result);
    assert.sameOrderedMembers(result, expected);
  });
});
