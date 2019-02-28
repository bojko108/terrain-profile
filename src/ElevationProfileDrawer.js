// import { mouse as d3Mouse, event as d3Event } from 'd3';
// import { select as d3Select } from 'd3-selection';
// import { scaleLinear as d3ScaleLinear } from 'd3-scale';
// import { min as d3Min, extent as d3Extent, bisector as d3Bisector } from 'd3-array';
// import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis';
// import { area as d3Area, curveBasis as d3CurveBasis } from 'd3-shape';
// import { zoom as d3Zoom, zoomTransform as d3ZoomTransform } from 'd3-zoom';

// //import olFeature from 'ol/Feature';
// import olGeomPoint from 'ol/geom/Point';

// /**
//  * Use this class to draw elevation profiles
//  * 
//  * @export
//  * @class ElevationProfileDrawer
//  * @see ../test/alabak
//  * @see ../test/profile
//  */
// export default class ElevationProfileDrawer {
//     /**
//      * Creates an instance of ElevationProfileDrawer.
//      * @param {!Object.<String,*>} profileData - profile data - an array of points with elevation data
//      * @param {!MappClass} mapp - used to draw features on
//      */
//     constructor(profileData, mapp) {
//         // process input data
//         // in the future can be extendewd to read from GeoJSON...
//         this.__processRawData(profileData);

//         /**
//          * reference to main map class
//          * @private
//          * @type {MappClass}
//          */
//         this._mapp = mapp;
//         /**
//          * profile appearence options
//          * @private
//          * @type {Object.<String,*>}
//          */
//         this._options = ElevationProfileDrawer.getDefaultOptions();
//         /**
//          * marker, drawn on the map - when `this._options.liveProfile = true`
//          * @private
//          * @type {ol.Feature}
//          */
//         this._marker = null;
//     }

//     /**
//      * get default profile appearence options
//      * @static
//      * @public
//      * @return {Object.<String,*>}
//      * @param {Object.<String,*>} options - profile appearence options
//      * @param {Number} [options.width=600] - profile full width in pixels (including labels)
//      * @param {Number} [options.height=200] - profile full height in pixels(including labels)
//      * @param {Object.<String,*>} options.profileStyle - profile graph options
//      * @param {Boolean} [options.profileStyle.liveProfile=true] - display elevation value on mouse move
//      * @param {Boolean} [options.profileStyle.zoomProfile=true] - option to zoom in the profile graph
//      * @param {Boolean} [options.profileStyle.showOnMap=true] - display profile location on the map on mouse move
//      * @param {Boolean} [options.profileStyle.showLabels=false] - display additional labels - total distance, denivelation...
//      * @param {Boolean} [options.profileStyle.showDistanceAxis=false] - display distances axis - bottom axis
//      * @param {Boolean} [options.profileStyle.showHeightAxis=false] - display elevation axis - left axis
//      * @param {Number} [options.profileStyle.heightsTicksDivider=50] - divider for heights ticks. Use smaller values like `20` 
//      * to generate more ticks
//      * @param {Number} [options.profileStyle.distancesTicksDivider=50] -  - divider for distances ticks. Use smaller values like `20` 
//      * to generate more ticks
//      * @param {String} [options.profileStyle.backgroundColor='#CCFFFF'] - sky color
//      * @param {String} [options.profileStyle.profileFillColor='#6CBB3C'] - terrain color
//      * @param {String} [options.profileStyle.profileStrokeColor='#41A317'] - terrain stroke color
//      * @param {Number} [options.profileStyle.profileStrokeWidth=3] - terrain stroke width
//      * @param {String} [options.profileStyle.infoColor='#000000'] - info overlay color
//      * @param {Number} [options.profileStyle.infoLineStrokeWidth=2] - vertical info line width
//      * @param {String} [options.profileStyle.infoLineStrokeColor='#FF0000'] - vertical info line color
//      * @param {String} [options.profileStyle.infoLineStrokeDash='0'] - vertical info line dash array, examples: '0', '5,5', '10,2,10'...
//      * @param {Object.<String,*>} options.markerStyle - map marker style, see {@link StyleClass} for more details
//      */
//     static getDefaultOptions() {
//         return {
//             width: 600,
//             height: 200,
//             profileStyle: {
//                 liveProfile: true,
//                 zoomProfile: true,
//                 showOnMap: true,
//                 showLabels: false,
//                 showDistanceAxis: false,
//                 showHeightAxis: false,
//                 heightsTicksDivider: 50,
//                 distancesTicksDivider: 50,
//                 backgroundColor: '#CCFFFF',
//                 profileFillColor: '#6CBB3C',
//                 profileStrokeColor: '#41A317',
//                 profileStrokeWidth: 3,
//                 infoColor: '#000000',
//                 infoLineStrokeWidth: 2,
//                 infoLineStrokeColor: '#FF0000',
//                 infoLineStrokeDash: '0'
//             },
//             markerStyle: {
//                 name: 'default',
//                 circle: {
//                     radius: 8,
//                     strokeColor: '#41A317',
//                     strokeWidth: 3,
//                     fillColor: '#6CBB3C'
//                 },
//                 label: {
//                     labelMask: '{elevation} m',
//                     font: '18px consolas',
//                     textAlign: 'right',
//                     textBaseline: 'bottom',
//                     fillColor: '#FFFFFF',
//                     strokeColor: '#ABABAB',
//                     strokeWidth: 2,
//                     maxScale: 1000000,
//                     offsetX: 0,
//                     offsetY: -10
//                 }
//             }
//         };
//     }
//     /**
//      * get raw profile data
//      * @public
//      * @return {Object.<String,*>}
//      */
//     getData() {
//         return this._rawData;
//     }
//     /**
//      * get profile as SVG element
//      * @param {Object.<String,*>} [parameters] - see {@link ElevationProfileDrawer.getDefaultOptions}
//      * @return {SVGElement}
//      */
//     getSVG(parameters) {
//         const profileOptions = {
//             width: (parameters.width !== undefined ? parameters.width : this._options.width),
//             height: (parameters.height !== undefined ? parameters.height : this._options.height),

//             profileStyle: {
//                 liveProfile: (parameters.profileStyle && parameters.profileStyle.liveProfile !== undefined ? parameters.profileStyle.liveProfile : this._options.profileStyle.liveProfile),
//                 zoomProfile: (parameters.profileStyle && parameters.profileStyle.zoomProfile !== undefined ? parameters.profileStyle.zoomProfile : this._options.profileStyle.zoomProfile),
//                 showOnMap: (parameters.profileStyle && parameters.profileStyle.showOnMap !== undefined ? parameters.profileStyle.showOnMap : this._options.profileStyle.showOnMap),
//                 showLabels: (parameters.profileStyle && parameters.profileStyle.showLabels !== undefined ? parameters.profileStyle.showLabels : this._options.profileStyle.showLabels),
//                 showDistanceAxis: (parameters.profileStyle && parameters.profileStyle.showDistanceAxis !== undefined ? parameters.profileStyle.showDistanceAxis : this._options.profileStyle.showDistanceAxis),
//                 showHeightAxis: (parameters.profileStyle && parameters.profileStyle.showHeightAxis !== undefined ? parameters.profileStyle.showHeightAxis : this._options.profileStyle.showHeightAxis),
//                 heightsTicksDivider: (parameters.profileStyle && parameters.profileStyle.heightsTicksDivider !== undefined ? parameters.profileStyle.heightsTicksDivider : this._options.profileStyle.heightsTicksDivider),
//                 distancesTicksDivider: (parameters.profileStyle && parameters.profileStyle.distancesTicksDivider !== undefined ? parameters.profileStyle.distancesTicksDivider : this._options.profileStyle.distancesTicksDivider),
//                 backgroundColor: (parameters.profileStyle && parameters.profileStyle.backgroundColor !== undefined ? parameters.profileStyle.backgroundColor : this._options.profileStyle.backgroundColor),
//                 profileFillColor: (parameters.profileStyle && parameters.profileStyle.profileFillColor !== undefined ? parameters.profileStyle.profileFillColor : this._options.profileStyle.profileFillColor),
//                 profileStrokeColor: (parameters.profileStyle && parameters.profileStyle.profileStrokeColor !== undefined ? parameters.profileStyle.profileStrokeColor : this._options.profileStyle.profileStrokeColor),
//                 profileStrokeWidth: (parameters.profileStyle && parameters.profileStyle.profileStrokeWidth !== undefined ? parameters.profileStyle.profileStrokeWidth : this._options.profileStyle.profileStrokeWidth),
//                 infoColor: (parameters.profileStyle && parameters.profileStyle.infoColor !== undefined ? parameters.profileStyle.infoColor : this._options.profileStyle.infoColor),
//                 infoLineStrokeWidth: (parameters.profileStyle && parameters.profileStyle.infoLineStrokeWidth !== undefined ? parameters.profileStyle.infoLineStrokeWidth : this._options.profileStyle.infoLineStrokeWidth),
//                 infoLineStrokeColor: (parameters.profileStyle && parameters.profileStyle.infoLineStrokeColor !== undefined ? parameters.profileStyle.infoLineStrokeColor : this._options.profileStyle.infoLineStrokeColor),
//                 infoLineStrokeDash: (parameters.profileStyle && parameters.profileStyle.infoLineStrokeDash !== undefined ? parameters.profileStyle.infoLineStrokeDash : this._options.profileStyle.infoLineStrokeDash)
//             },

//             markerStyle: parameters.markerStyle || this._options.markerStyle
//         };

//         const
//             data = this._rawData.track.vertices,
//             marker = profileOptions.markerStyle,
//             chartWidth = (profileOptions.width && profileOptions.width >= 200 ? profileOptions.width : 200),
//             chartHeight = (profileOptions.height && profileOptions.height > 100 ? profileOptions.height : 100);

//         let container = d3Select('body').append('svg');

//         // set full height and width of the profile container
//         container
//             .attr('width', chartWidth)
//             .attr('height', chartHeight);

//         const
//             chartMargins = {
//                 top: 30,
//                 right: 10,
//                 bottom: (profileOptions.profileStyle.showLabels ? 65 : (profileOptions.profileStyle.showDistanceAxis ? 20 : 0)),
//                 left: (profileOptions.profileStyle.showLabels ? (profileOptions.profileStyle.showHeightAxis ? 50 : (profileOptions.profileStyle.showDistanceAxis ? 15 : 0)) : (profileOptions.profileStyle.showHeightAxis ? 40 : (profileOptions.profileStyle.showDistanceAxis ? 15 : 0)))
//             },
//             width = chartWidth - chartMargins.right - chartMargins.left,
//             height = chartHeight - chartMargins.top - chartMargins.bottom,
//             heightsTicks = Math.round(height / profileOptions.profileStyle.heightsTicksDivider),
//             distancesTicks = Math.round(width / profileOptions.profileStyle.distancesTicksDivider),
//             g = container.append('g')
//                 .attr('transform', "translate(" + chartMargins.left + "," + chartMargins.top + ")"),
//             xScale = d3ScaleLinear()
//                 .range([0, width])
//                 .domain(d3Extent(data, d => d.dist)),
//             yScale = d3ScaleLinear()
//                 .range([height, 0])
//                 .domain(d3Extent(data, d => d.elev)),
//             xAxis = d3AxisBottom(xScale),
//             yAxis = d3AxisLeft(yScale),
//             areaFn = d3Area()
//                 .x(d => xScale(d.dist))
//                 .y0(yScale(d3Min(data, d => d.elev)))
//                 .y1(d => yScale(d.elev))
//                 .curve(d3CurveBasis),
//             bisectDistance = d3Bisector((d) => { return d.dist; }).left,
//             drawFeature = (location, style) => {
//                 this.__createMarker(location, style);
//             },
//             handleMouseMove = function () {
//                 let
//                     transform = d3ZoomTransform(this),
//                     xt = transform.rescaleX(xScale),
//                     yt = transform.rescaleY(yScale),
//                     x0 = xt.invert(d3Mouse(this)[0]),
//                     i = bisectDistance(data, x0, 1),
//                     d0 = data[i - 1],
//                     d1 = data[i],
//                     d = x0 - d0.dist > d1.dist - x0 ? d1 : d0;

//                 infoOverlay.attr('transform', `translate(${transform.applyX(xScale(d.dist))},${transform.applyY(yScale(d.elev))})`);
//                 infoOverlay.select('#textHeight').text(d.elev.toFixed(0) + ' m');

//                 overlay.select('#lineY').attr('x1', transform.applyX(xScale(d.dist)));
//                 overlay.select('#lineY').attr('y1', -chartMargins.top);
//                 overlay.select('#lineY').attr('x2', transform.applyX(xScale(d.dist)));
//                 overlay.select('#lineY').attr('y2', height);

//                 // move elevation text so it does not go outside the SVG element
//                 infoOverlay.select('#textHeight').attr('x', ((xt(data[i].dist) > xt(data[data.length - 1].dist) - 70) ? -70 : 9));

//                 if (profileOptions.profileStyle.showOnMap) {
//                     drawFeature(d, marker);
//                 }
//             },
//             handleMouseOver = function () {
//                 infoOverlay.style('display', null);
//                 overlay.select('#lineY').attr('display', null);
//             },
//             handleMouseOut = () => {
//                 infoOverlay.style('display', 'none');
//                 overlay.select('#lineY').attr('display', 'none');

//                 if (this._marker) {
//                     this._mapp.defaultLayer.removeFeature(this._marker);
//                     this._marker = null;
//                 }
//             },
//             handleZoom = function () {
//                 let t = d3Event.transform,
//                     xt = t.rescaleX(xScale),
//                     yt = t.rescaleY(yScale);
//                 g.select('#profileGraph').attr('d',
//                     areaFn
//                         .x((d) => xt(d.dist))
//                         .y0(yt(d3Min(data, d => d.elev)))
//                         .y1(d => yt(d.elev)));
//                 g.select('#axisDistance').call(xAxis.scale(xt).ticks(distancesTicks).tickFormat(d => ((d / 1000).toLocaleString('BG'))));
//                 g.select('#axisHeight').call(yAxis.scale(yt).ticks(heightsTicks).tickFormat(d => (d.toLocaleString('BG'))));
//             },
//             zoom = d3Zoom()
//                 .scaleExtent([1, 5])
//                 .translateExtent([[0, 0], [width, height]])
//                 .extent([[0, 0], [width, height]])
//                 .on('zoom', handleZoom);

//         let
//             // transparent overlay - for handeling mouse events
//             overlay,
//             // overlay for displaying current elevation
//             infoOverlay,
//             // used to display distances axis at the bottom
//             distancesAxis,
//             // used to display heights axis at the left
//             heightsAxis,
//             totalDistance = Math.round(data[data.length - 1].dist) / 1000,
//             elevationLost = Math.round(data.reduce((acc, cur, idx, arr) => {
//                 if (idx > 0 && (cur.elev < arr[idx - 1].elev)) {
//                     acc += arr[idx - 1].elev - cur.elev;
//                 }
//                 return acc;
//             }, 0)),
//             elevationGain = Math.round(data.reduce((acc, cur, idx, arr) => {
//                 if (idx > 0 && (cur.elev > arr[idx - 1].elev)) {
//                     acc += cur.elev - arr[idx - 1].elev;
//                 }
//                 return acc;
//             }, 0));

//         // profile background
//         g.append('rect')
//             .attr('id', 'profileBackground')
//             .attr('fill', profileOptions.profileStyle.backgroundColor)
//             .attr('y', -chartMargins.top)
//             .attr('width', width)
//             .attr('height', height + chartMargins.top);

//         // profile graph
//         g.append('path')
//             .attr('id', 'profileGraph')
//             .datum(data)
//             .attr('clip-path', 'url(#clip)')
//             .attr('fill', profileOptions.profileStyle.profileFillColor)
//             .attr('stroke', profileOptions.profileStyle.profileStrokeColor)
//             .attr('stroke-width', profileOptions.profileStyle.profileStrokeWidth)
//             .attr('d', areaFn);

//         // distances axis
//         if (profileOptions.profileStyle.showDistanceAxis) {
//             distancesAxis = g.append('g')
//                 .attr('id', 'axisDistance')
//                 .attr('transform', `translate(0, ${height})`)
//                 .call(d3AxisBottom(xScale).ticks(distancesTicks).tickFormat(d => ((d / 1000).toLocaleString('BG'))));
//         }

//         if (profileOptions.profileStyle.showHeightAxis) {
//             // heights axis
//             heightsAxis = g.append('g')
//                 .attr('id', 'axisHeight')
//                 .call(d3AxisLeft(yScale).ticks(heightsTicks).tickFormat(d => (d.toLocaleString('BG'))));
//         }

//         if (profileOptions.profileStyle.showLabels) {
//             // distances axis label
//             if (profileOptions.profileStyle.showDistanceAxis) {
//                 distancesAxis.append('text')
//                     .attr('fill', '#333')
//                     .attr('y', 35)
//                     .attr('x', 0)
//                     .attr('text-anchor', 'start')
//                     .text('Distance in kilometers')
//             }

//             if (profileOptions.profileStyle.showHeightAxis) {
//                 // heights axis label
//                 heightsAxis.append('text')
//                     .attr('fill', '#333')
//                     .attr('transform', 'rotate(-90)')
//                     .attr('y', -35)
//                     .attr('x', -height)
//                     .attr('text-anchor', 'start')
//                     .text('Height in meters')
//             }

//             // label for total distance
//             g.append('g')
//                 .attr('id', 'labelTotalDistance')
//                 .append('text')
//                 .classed('heading', true)
//                 .attr('y', height + 35)
//                 .attr('x', width)
//                 .attr('font-family', 'sans-serif')
//                 .attr('text-anchor', 'end')
//                 .attr('startOffset', '100%')
//                 .text('Total distance:')
//                 .append('tspan')
//                 .text(` ${totalDistance} km`);

//             // label for total elevation gain
//             g.append('g')
//                 .attr('id', 'labelElevGain')
//                 .append('text')
//                 .classed('heading', true)
//                 .attr('y', height + 50)
//                 .attr('x', width)
//                 .attr('font-family', 'sans-serif')
//                 .attr('text-anchor', 'end')
//                 .attr('startOffset', '100%')
//                 .text('Elevation gain:')
//                 .append('tspan')
//                 .text(` ${elevationGain.toLocaleString('BG')} m`);

//             // label for total elevation lost
//             g.append('g')
//                 .attr('id', 'labelElevLost')
//                 .append('text')
//                 .classed('heading', true)
//                 .attr('y', height + 65)
//                 .attr('x', width)
//                 .attr('font-family', 'sans-serif')
//                 .attr('text-anchor', 'end')
//                 .attr('startOffset', '100%')
//                 .text('Elevation lost:')
//                 .append('tspan')
//                 .text(` ${elevationLost.toLocaleString('BG')} m`);
//         }

//         if (profileOptions.profileStyle.liveProfile) {
//             // profile overlay - used for mouse events and info lines
//             overlay = g.append('g')
//                 .attr('id', 'profileOverlay')
//                 .attr('cursor', 'crosshair')
//                 .on('mousemove', handleMouseMove)
//                 .on('mouseover', handleMouseOver)
//                 .on('mouseout', handleMouseOut);

//             overlay.append('rect')
//                 .attr('fill', 'none')
//                 .attr('pointer-events', 'all')
//                 .attr('y', -chartMargins.top)
//                 .attr('width', width)
//                 .attr('height', height + chartMargins.top);

//             overlay.append('line')
//                 .attr('id', 'lineY')
//                 .attr('pointer-events', 'none')
//                 .attr('stroke-width', profileOptions.profileStyle.infoLineStrokeWidth)
//                 .attr('stroke', profileOptions.profileStyle.infoLineStrokeColor)
//                 .attr('stroke-dasharray', profileOptions.profileStyle.infoLineStrokeDash)
//                 .attr('x1', 0)
//                 .attr('y1', 0)
//                 .attr('x2', 0)
//                 .attr('y2', 0);

//             // info objects
//             infoOverlay = g.append('g')
//                 .style('display', 'none')
//                 .attr('pointer-events', 'none');

//             infoOverlay.append('circle')
//                 .attr('r', 5)
//                 .attr('style', 'fill: ' + profileOptions.profileStyle.infoColor);

//             infoOverlay.append('text')
//                 .attr('id', 'textHeight')
//                 .attr('font-family', 'consolas')
//                 .attr('font-size', '20')
//                 .attr('font-weight', 'bold')
//                 .attr('style', 'fill: ' + profileOptions.profileStyle.infoColor)
//                 .attr('x', 9)
//                 .attr('dy', -5);

//             if (profileOptions.profileStyle.zoomProfile) {
//                 container.append('defs').append('clipPath')
//                     .attr('id', 'clip')
//                     .append("rect")
//                     .attr('y', -chartMargins.top)
//                     .attr('width', width)
//                     .attr('height', height + chartMargins.top);

//                 overlay.attr('clip-path', 'url(#profileOverlay)');
//                 overlay.call(zoom);
//             }
//         }

//         return container.node();
//     }
//     /**
//      * process raw input data
//      * @param {Object.<String,*>} profileData 
//      */
//     __processRawData(profileData) {
//         this._rawData = profileData;
//     }
//     /**
//      * create or update elevation marker drawn on the map
//      * @param {Object.<String,*>} location - marker data
//      * @param {Number} location.lat - geographic latitude
//      * @param {Number} location.lon - geographic longitude
//      * @param {Number} location.elev - elevation in meters
//      * @param {Object.<String,*>} style 
//      */
//     __createMarker(location, style) {
//         let
//             elevation = location.elev.toFixed(0),
//             geometry = new olGeomPoint([location.lon, location.lat]);

//         geometry.transform('EPSG:4326', this._mapp.projection);

//         if (this._marker) {
//             this._marker.set('elevation', elevation);
//             this._marker.setGeometry(geometry);
//         } else {
//             this._marker = this._mapp.defaultLayer.createNewFeature(
//                 geometry,
//                 {
//                     elevation: elevation
//                 },
//                 style);
//         }
//     }
// }