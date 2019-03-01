/**
 * get default profile appearence options
 * @param {Object.<String,*>} defaultOptions - profile appearence options
 * @param {Number} [defaultOptions.width=600] - profile full width in pixels (including labels)
 * @param {Number} [defaultOptions.height=200] - profile full height in pixels(including labels)
 * @param {Boolean} [defaultOptions.liveProfile=true] - display elevation value on mouse move
 * @param {Boolean} [defaultOptions.zoomProfile=true] - option to zoom in the profile graph
 * @param {Boolean} [defaultOptions.showLabels=false] - display additional labels - total distance, denivelation...
 * @param {Boolean} [defaultOptions.showDistanceAxis=false] - display distances axis - bottom axis
 * @param {Boolean} [defaultOptions.showHeightAxis=false] - display elevation axis - left axis
 * @param {Number} [defaultOptions.heightsTicksDivider=50] - divider for heights ticks. Use smaller values like `20` to generate more ticks
 * @param {Number} [defaultOptions.distancesTicksDivider=50] - divider for distances ticks. Use smaller values like `20` to generate more ticks
 * @param {String} [defaultOptions.backgroundColor='#CCFFFF'] - sky color
 * @param {String} [defaultOptions.profileFillColor='#6CBB3C'] - terrain color
 * @param {String} [defaultOptions.profileStrokeColor='#41A317'] - terrain stroke color
 * @param {Number} [defaultOptions.profileStrokeWidth=3] - terrain stroke width
 * @param {String} [defaultOptions.infoColor='#000000'] - info overlay color
 * @param {Number} [defaultOptions.infoLineStrokeWidth=2] - vertical info line width
 * @param {String} [defaultOptions.infoLineStrokeColor='#FF0000'] - vertical info line color
 * @param {String} [defaultOptions.infoLineStrokeDash='0'] - vertical info line dash array, examples: '0', '5,5', '10,2,10'...
 */
export const defaultOptions = {
  width: 600,
  height: 200,
  liveProfile: true,
  zoomProfile: true,
  showLabels: false,
  showDistanceAxis: false,
  showHeightAxis: false,
  heightsTicksDivider: 50,
  distancesTicksDivider: 50,
  backgroundColor: '#CCFFFF',
  profileFillColor: '#6CBB3C',
  profileStrokeColor: '#41A317',
  profileStrokeWidth: 3,
  infoColor: '#000000',
  infoLineStrokeWidth: 2,
  infoLineStrokeColor: '#FF0000',
  infoLineStrokeDash: '0'
};
