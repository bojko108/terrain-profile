/**
 * Flattens the input array and returns a new array
 * @param {!Array} list 
 * @return {Array}
 */
export function flatten(list) {
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}
/**
 * Converts decimal degrees to radians
 * @param {!Number} deg 
 * @return {Number}
 */
export function deg2rad(deg) {
  return (deg * Math.PI) / 180.0;
}
/**
 * Converts radians to decimal degrees 
 * @param {!Number} rad 
 * @return {Number}
 */
export function rad2deg(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Calculates distance between points using Haversine formula.
 * @param {!Object.<String,*>} start - start point: {lat, lon}
 * @param {!Object.<String,*>} end - end point: {lat, lon}
 * @return {Number} distance in meters
 */
export function distance(start, end) {
  const R = 6378137, //m
    lat1 = deg2rad(start.lat),
    lat2 = deg2rad(end.lat),
    dlat = lat2 - lat1,
    dlon = deg2rad(end.lon - start.lon);

  const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
