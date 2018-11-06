define(['marionette', 'ol'],
    function (Marionette) {

        const MapView = Marionette.View.extend({
            id: 'map',
            template: _.template(`
                                  <div id="mouse-position"></div>`),

            events: {},

            addMap() {


                let mousePositionControl = new window.ol.control.MousePosition({
                    coordinateFormat: window.ol.coordinate.createStringXY(4),
                    projection: 'EPSG:4326',
                    className: 'custom-mouse-position',
                    target: document.getElementById('mouse-position'),
                    undefinedHTML: '&nbsp;'
                });


                this.map = new window.ol.Map({

                    controls: window.ol.control.defaults({
                        attributionOptions: {
                            collapsible: false
                        }
                    }).extend([mousePositionControl]),

                    target: 'map',
                    layers: [
                        new window.ol.layer.Tile({source: new window.ol.source.OSM()})
                    ],

                    view: new window.ol.View({

                        center: window.ol.proj.fromLonLat([39.7146, 47.2305]),
                        zoom: 17,
                        minZoom: 5,
                        maxZoom: 17
                    })
                });

                 this.vectorSource = new window.ol.source.Vector();


                this.vectorLayer = new window.ol.layer.Vector(
                    {
                        source: this.vectorSource,
                        // declutter: true
                    });
                // debugger

                this.map.addLayer(this.vectorLayer);

                this.newPointSource = new window.ol.source.Vector();
                newPointLayer = new window.ol.layer.Vector(
                    {
                        source: this.newPointSource
                    });
                this.map.addLayer(newPointLayer);
            },

            addPoint(feature) {

                this.vectorSource.addFeature(feature);
                 // debugger


            },

            addNewPoint(feature){
                this.newPointSource.clear();
                this.newPointSource.addFeature(feature);
            },

            clearNewPoint(){
                this.newPointSource.clear()
            },

            onAttach() {
                this.addMap();
            }
        })

        return MapView;

    });