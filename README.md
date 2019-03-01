# terrain-profile

Calculates a terrain profile from GeoJSON or array of coordinates. The terrain profile can be drawn as SVG using [d3](https://www.npmjs.com/package/d3). Input data must have elevation values calculated as the calculator only calculates profile statistics based on the input data.

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
import { Calculator, Drawer, defaultOptions } from 'terrain-profile';
```

# Info

## Calculator

Use this class to calculate profile statistics from GeoJSON feature or geometry. Currently it supports `MultiLineString` and `LineString` geometries. Input geometry should have elevation values as the calculator does not calculate them. Following profile parameters are calculated:

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
```

## Drawer

Use this class to draw a terrain profile as SVG element. It uses [d3](https://www.npmjs.com/package/d3) to draw the chart. You can pass additional options to change the resulting SVG.

```js
import { Drawer } from 'terrain-profile';

// input geometry or feature
const points = [
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
];

const drawer = new Drawer(multiLineString);
// draw the profile
drawer.getSVG();
```

![profile](https://github.com/bojko108/terrain-profile/blob/master/tests/example.png)

Or you can modify the profile options:

```js
const options = {
  showLabels: true,
  showDistanceAxis: true,
  showHeightAxis: true,
  profileFillColor: '#01ff70',
  profileStrokeColor: '#3d9970'
};

drawer.getSVG(options);
```

![profile2](https://github.com/bojko108/terrain-profile/blob/master/tests/example2.png)

Following listeners can be set (`options.liveProfile` should be set to `true` as well):

- `onEnter` - callback on mouse in
- `onMove` - callback on mouse move
- `onLeave` - callback on mouse out

```js
const drawer = new Drawer(
  multiLineString,
  () => {
    console.log('on mouse in');
  },
  ({ lat, lon, dist, h }) => {
    console.log('on mouse move');
  },
  () => {
    console.log('on mouse out');
  }
);

// OR

drawer.onMove = ({ lat, lon, dist, h }) => {
  console.log('on mouse move');
};
```

## Default options

Set of default options used for drawing a profile:

| Parameter               | Info                                                              | Default Value |
| ----------------------- | ----------------------------------------------------------------- | ------------- |
| `width`                 | Total width in pixels                                             | 600           |
| `height`                | Total height in pixels                                            | 200           |
| `liveProfile`           | Display elevation value on mouse move.                            | true          |
| `zoomProfile`           | Option to zoom in the profile graph                               | true          |
| `showLabels`            | Display additional labels                                         | false         |
| `showDistanceAxis`      | display distances axis - bottom axis                              | false         |
| `showHeightAxis`        | Display elevation axis - left axis                                | false         |
| `heightsTicksDivider`   | Divider for heights ticks. Use smaller values like `20`           | 50            |
| `distancesTicksDivider` | Divider for distances ticks. Use smaller values like `20`         | 50            |
| `backgroundColor`       | Sky color                                                         | `#CCFFFF`     |
| `profileFillColor`      | Terrain color                                                     | `#6CBB3C`     |
| `profileStrokeColor`    | Terrain stroke color                                              | `#41A317`     |
| `profileStrokeWidth`    | Terrain stroke width                                              | 3             |
| `infoColor`             | Info overlay color                                                | `#000000`     |
| `infoLineStrokeWidth`   | Vertical info line width                                          | 2             |
| `infoLineStrokeColor`   | Vertical info line color                                          | `#FF0000`     |
| `infoLineStrokeDash`    | Vertical info line dash array, examples: '0', '5,5', '10,2,10'... | `0`           |

## Dependencies

- [d3](https://www.npmjs.com/package/d3)

## Tests

Check [tests](https://github.com/bojko108/terrain-profile/tree/master/tests) for more examples.

## License

terrain-profile is [MIT](https://github.com/bojko108/terrain-profile/tree/master/LICENSE) License @ bojko108
