/**
 * Converts decimal degrees to radians
 * @param {!Number} deg 
 * @return {Number}
 */
export function deg2rad(deg) {
  return (deg * Math.PI) / 180.0;
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
