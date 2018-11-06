define(['marionette', 'models', 'collections', 'iconSelect'],
    function (Marionette, Models, Collections, IconListView) {

        var AddFormView = Marionette.View.extend({
            template: _.template(` <form class="form-add">
        <div class="card-header">
            <div class="card-buttons">
                <button class="card-btn" id="btn-close">
                    <!--<span class="card-btn-img" id='delete-btn'>&#10006</span>-->
                    <img class="card-btn-img" src="http://defaulticon.com/images/icons32x32/cancel.png?itok=vIT63GD3">
                </button>
            </div>
        </div>
        <div class="card-body">
            <label>Название</label>
                <br><input required type="text" id="name-marker">
            <label>Описание</label>
                <br><input required type="text" id="description-marker">
            <label>Координаты</label>
                <br><input required type="text" id="coordinates-marker">
            <label>Тип</label>
            <div class="styled-select" id="select-region"></div>
            </p>
            <p><input type="button" id="save-btn" value=Сохранить>
        </div>
        
    </form>`),


            initialize: function (collection, mapView) {
                this.collection = collection;
                this.newModel = new Models.MarkerModel();
                this.listenTo(this.newModel, 'sync', this.addModel);
                this.mapView = mapView;
            },
            className:'card',

            regions: {
                'iconRegion': '#select-region'
            },

            events: {
                'click @ui.saveBtn': 'saveMarker',
                'click @ui.closeBtn': 'closeWindow'
            },

            ui: {
                'inputName': '#name-marker',
                'inputDesc': '#description-marker',
                'inputCoords': '#coordinates-marker',
                'saveBtn': '#save-btn',
                'closeBtn': '#btn-close'
            },

            closeWindow: function (e) {
                e.preventDefault();
                this.destroy();
            },
            onDestroy(){
                this.mapView.map.un('click', this.getCoords);
                this.mapView.clearNewPoint();
            },

            addModel: function () {

                this.collection.add(this.newModel.attributes);
                //alert("add model in col");
                this.destroy();
                // this.newModel.unset();
            },


            saveMarker: function () {

                if (this.ui.inputName.val() != '') {
                    this.newModel.set('title', $('#name-marker').val())
                }

                if (this.ui.inputDesc.val() != '') {
                    this.newModel.set('description', $('#description-marker').val())
                }

                if (this.ui.inputCoords.val() != '') {
                    let point = {}
                    point.type = "Point";
                    point.coordinates = $('#coordinates-marker').val().split(',').map(string => parseFloat(string));
                    this.newModel.set('point', point);
                }

              //  debugger
                this.newModel.set('icon', +this.getChildView('iconRegion').el.value);


                this.newModel.save({wait: true}, {
                    success: function () {
                    }
                });
            },


            onRender() {
                this.iconCol = new Collections.IconCollection();
                let that = this;
                this.iconCol.fetch({
                    success: function f() {
                        //  debugger
                        let iconView = new IconListView(that.iconCol);
                        that.showChildView('iconRegion', iconView);
                        //that.triggerMethod('add:marker', that);
                    }
                });
                this.getCoords = function (evt) {
                    // debugger
                    that.ui.inputCoords.val(this.getControls().array_[3].element.outerText);
                    console.log(this.getControls().array_[3].element.outerText)
                    console.log(evt.coordinate)
                    var newPoint = new window.ol.Feature({
                        geometry: new window.ol.geom.Point(evt.coordinate)
                    });
                    newPoint.setStyle(new window.ol.style.Style({
                        image: new window.ol.style.Icon({
                            src: 'static/assets/red-pushpin.png',
                            size: [32, 32],
                            anchor: [0.3, 1]
                        })
                    }));

                    that.mapView.addNewPoint(newPoint);
                };
                this.mapView.map.on('click', this.getCoords);
            }


        });

        return AddFormView;

    })