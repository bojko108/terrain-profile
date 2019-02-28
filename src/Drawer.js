import Calculator from './Calculator';

export default class Drawer {
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
