import { distance } from '../helpers';

/**
 * Use this class for calculating profile parameters
 */
export default class Calculator {
  /**
   * Creates profile calculator
   * @param {!Object.<String,*>|Array.<Number>} inputGeometry - GeoJSON Feature or geometry, or array of coordinates
   */
  constructor(inputGeometry) {
    if (inputGeometry.type === 'Feature') {
      inputGeometry = inputGeometry.geometry;
    }

    /**
     * array of vertices
     * @private
     * @type {Array.<Object>}
     */
    this._vertices = this._formatGeometry(inputGeometry);
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
   * @param {!Object.<String,*>|Array.<Number>} geometry - GeoJSON `MultiLineString` or `LineString`, or array of coordinates
   * @returns {Object.<String,*>}
   */
  _formatGeometry(geometry) {
    if (!geometry) throw 'Geometry not set';

    if (Array.isArray(geometry)) {
      return geometry.map(vertex => this._formatVertex(vertex));
    } else {
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
