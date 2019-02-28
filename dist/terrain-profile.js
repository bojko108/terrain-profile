/** 
 * terrain-profile - v1.0.0
 * description: Calculates and draws a terrain profile
 * author: bojko108 <bojko108@gmail.com>
 * 
 * github: https://github.com/bojko108/terrain-profile
 */
    
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Flattens the input array and returns a new array
 * @param {!Array} list 
 * @return {Array}
 */

/**
 * Converts decimal degrees to radians
 * @param {!Number} deg 
 * @return {Number}
 */
function deg2rad(deg) {
  return (deg * Math.PI) / 180.0;
}
/**
 * Converts radians to decimal degrees 
 * @param {!Number} rad 
 * @return {Number}
 */


/**
 * Calculates distance between points using Haversine formula.
 * @param {!Object.<String,*>} start - start point: {lat, lon}
 * @param {!Object.<String,*>} end - end point: {lat, lon}
 * @return {Number} distance in meters
 */
function distance(start, end) {
  const R = 6378137, //m
    lat1 = deg2rad(start.lat),
    lat2 = deg2rad(end.lat),
    dlat = lat2 - lat1,
    dlon = deg2rad(end.lon - start.lon);

  const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Use this class for calculating profile parameters
 */
class Calculator {
  /**
   * Creates profile calculator
   * @param {!Object.<String,*>} geojson - Feature or geometry
   */
  constructor(geojson) {
    /**
     * array of vertices
     * @private
     * @type {Array.<Object>}
     */
    this._vertices = this._formatGeometry(geojson.type === 'Feature' ? geojson.geometry : geojson);
    /**
     * profile parameters
     * @private
     * @type {Object.<String,*>}
     */
    this._parameters = this._calculateProfileParameters();
  }
  /**
   * get calculated vertices
   * @public
   * @readonly
   * @returns {Array.<Object>}
   */
  get vertices() {
    return this._vertices;
  }
  /**
   * get calculated profile parameters
   * @public
   * @readonly
   * @returns {Object.<String,*>}
   */
  get parameters() {
    return this._parameters;
  }
  /**
   * Formats the input geometry
   * @private
   * @param {!Object.<String,*>} geometry - `MultiLineString` or `LineString`
   * @returns {Object.<String,*>}
   */
  _formatGeometry(geometry) {
    if (!geometry) throw 'Geometry not set';

    const type = geometry.type;

    if (type !== 'MultiLineString' && type !== 'LineString') throw `Geometry is not supported: ${type}`;

    if (type === 'MultiLineString') {
      let array = [];
      geometry.coordinates.forEach(part => {
        array.push(...part.map(vertex => this._formatVertex(vertex)));
      });
      return array;
    } else {
      return geometry.coordinates.map(vertex => this._formatVertex(vertex));
    }
  }
  /**
   * Formats a vertex
   * @private
   * @param {!Array.<Number>} vertex - [longitude, latitude, elevation]
   * @returns {Object.<String,*>}
   */
  _formatVertex(vertex) {
    return {
      lat: vertex[1],
      lon: vertex[0],
      h: vertex[2] || 0,
      dist: 0
    };
  }
  /**
   * Calculates profile parameters
   * @private
   * @returns {Object.<String,*>}
   */
  _calculateProfileParameters() {
    let descend = 0,
      ascend = 0,
      minh = 10000,
      maxh = -10000,
      length = 0,
      realLength = 0,
      i = 0,
      n = this._vertices.length;

    // start from first vertex
    this._vertices[0].dist = 0;

    for (i; i < n - 1; i++) {
      let p1 = this._vertices[i];
      let p2 = this._vertices[i + 1];
      let dist = distance(p1, p2);

      // calculate total length in meters
      length += dist;

      // set distance from start for current vertex
      this._vertices[i + 1].dist = length;

      // calculate total ascending and descending in meters
      const dh = p2.h - p1.h;
      if (dh <= 0) {
        descend += dh;
      } else {
        ascend += dh;
      }

      // calculate oblique length in meters
      realLength += Math.sqrt(dh * dh + dist * dist);

      // calculate max and min h in meters
      const curmin = Math.min(p1.h, p2.h),
        curmax = Math.max(p1.h, p2.h);

      minh = Math.min(minh, curmin);
      maxh = Math.max(maxh, curmax);
    }

    ascend = Math.abs(ascend);
    descend = Math.abs(descend);

    return {
      length,
      realLength,
      ascend,
      descend,
      minh,
      maxh
    };
  }
}

class Drawer {
  constructor(container, geojson) {
    this._container = container;
    this._calculator = new Calculator(geojson);
  }

  getSVG() {
    let data = this._calculator.vertices.map(point => {
      return {
        x: point.dist,
        y: point.h
      };
    });
  }
}

exports.Calculator = Calculator;
exports.Drawer = Drawer;
