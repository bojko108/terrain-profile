# terrain-profile

Calculates and draws a terrain profile

## Install

You can install it with NPM:

```bash
npm install terrain-profile
```

or Yarn

```bash
yarn add terrain-profile
```

and then:

```js
import { Calculator } from 'terrain-profile';

// input geometry or feature
const multiLineString = {
  type: 'MultiLineString',
  coordinates: [
    [
      [24.048219, 42.093168, 560],
      [24.048192, 42.093276, 561],
      [24.048198, 42.093375, 562],
      [24.048258, 42.093556, 563],
      [24.048101, 42.093782, 562],
      [24.047584, 42.093988, 560],
      [24.046901, 42.094151, 561],
      [24.046682, 42.094178, 560],
      [24.046598, 42.094162, 562],
      [24.046428, 42.094166, 563],
      [24.046033, 42.094171, 564]
    ]
  ]
};

// calculate profile parameters
const calculator = new Calculator(multiLineString);

console.log(calculator.vertices);
// result is:
// [
//   { lat: 42.093168, lon: 24.048219, h: 560, dist: 0 },
//   { lat: 42.093276, lon: 24.048192, h: 561, dist: 12.227634483109352 },
//   { lat: 42.093375, lon: 24.048198, h: 562, dist: 23.259403426787898 },
//   { lat: 42.093556, lon: 24.048258, h: 563, dist: 44.00886374875728 },
//   { lat: 42.093782, lon: 24.048101, h: 562, dist: 72.31307358580551 },
//   { lat: 42.093988, lon: 24.047584, h: 560, dist: 120.7868641823526 },
//   { lat: 42.094151, lon: 24.046901, h: 561, dist: 180.05154223952798 },
//   { lat: 42.094178, lon: 24.046682, h: 560, dist: 198.38979910612818 },
//   { lat: 42.094162, lon: 24.046598, h: 562, dist: 205.55348373511953 },
//   { lat: 42.094166, lon: 24.046428, h: 563, dist: 219.60321720630384 },
//   { lat: 42.094171, lon: 24.046033, h: 564, dist: 252.23653171834349 }
// ]

console.log(calculator.parameters);
// result is:
// {
//     length: 252.23653171834349,
//     realLength: 252.7660603467696,
//     ascend: 8,
//     descend: 4,
//     minh: 560,
//     maxh: 564
// }
```

# Info

## Calculator

```js
import { Calculator } from 'terrain-profile';
```

Use this class to calculate profile parameters from GeoJSON feature or geometry. Currently it supports `MultiLineString` and `LineString` geometries. Input geometry should have elevation values as the calculator does not calculate them. Following profile parameters are calculated:

| Parameter    | Info                           |
| ------------ | ------------------------------ |
| `length`     | total length in meters         |
| `realLength` | total oblique length in meters |
| `ascend`     | total ascending in meters      |
| `descend`    | total descending in meters     |
| `minh`       | minimum elevation in meters    |
| `maxh`       | maximum elevation in meters    |

And vertices are formatted as follows:

| Parameter | Info                                    |
| --------- | --------------------------------------- |
| `lat`     | geographic latitude in decimal degrees  |
| `lon`     | geographic longitude in decimal degrees |
| `h`       | elevation in meters                     |
| `dist`    | distance from start in meters           |

## Drawer

To be implemented

<!-- ```js
import { Drawer } from 'terrain-profile';
``` -->

## Dependencies

## Tests

Check [tests](https://github.com/bojko108/terrain-profile/tree/master/tests) for more examples.

## License

terrain-profile is [MIT](https://github.com/bojko108/terrain-profile/tree/master/LICENSE) License @ bojko108
