define(['marionette', 'collections', 'iconSelect', 'msgView',
        'tpl!templates/cardView.tpl', 'tpl!templates/cardChange.tpl'],
    function (Marionette, Collections, IconListView, MessageView, cardViewTpl, cardChangeTpl) {

        const cardViewTemplate = cardViewTpl;

        const cardChangeTemplate = cardChangeTpl;

        const MarkerCardView = Marionette.View.extend({
            className: 'card',
            template: cardViewTemplate,
            changeMode: false,
            iconCol: null,

            regions: {
                'iconRegion': '#select-region',
                'msgRegion': '#message-region'
            },

            ui: {
                'changeBtn': '#change-btn',
                'delBtn': '#del-btn',
                'closeBtn': '#close-btn',
                'saveBtn': '#save-btn',
                'inputTitle': '#title',
                'inputDescr': '#description',
                'inputCoords': '#coordinates',
                'selectType': '#icon-select',
                'cardTitle': '#card-title'
            },

            events: {
                'click @ui.changeBtn': 'activateChangeMode',
                'click @ui.closeBtn': 'activateChangeMode',
                'click @ui.saveBtn': 'saveChanges',
                'click @ui.delBtn': 'delMarker',
                'click @ui.cardTitle': 'fly'
            },
            fly: function () {
                console.log('Fly');
                this.options.map.map.getView().animate({
                    center: ol.proj.fromLonLat(this.model.get('point').coordinates),
                    duration: 500,
                    zoom: 18
                });
            },

            initialize() {
                this.listenTo(this.model, 'change', this.render);
                this.addMarkerOnMap(this.model);

            },

            activateChangeMode() {
                this.changeMode = !this.changeMode;
                if (!this.changeMode) {
                    this.options.map.map.un('click', this.getCoords);
                    this.options.map.clearNewPoint();
                }
                else {
                    let that = this;
                    this.getCoords = function (evt) {
                        that.ui.inputCoords.val(this.getControls().array_[3].element.innerText);
                        //debugger
                        console.log(this.getControls().array_[3].element.innerText)
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

                        that.options.map.addNewPoint(newPoint);
                    };
                    this.options.map.map.on('click', this.getCoords);

                }
                this.render();
            },

            getTemplate() {
                if (this.changeMode) {
                    return cardChangeTemplate;
                }
                return this.template;
            },

            saveChanges() {

                let changeList = {};
                changeList.title = this.ui.inputTitle.val();
                changeList.description = this.ui.inputDescr.val();
                let point = {}
                point.coordinates = this.ui.inputCoords.val()
                    .split(',').map(string => parseFloat(string));
                point.type = "Point";
                changeList.point = point;
                changeList.icon = +this.getChildView('iconRegion').el.value;

                let attrs = {};

                if (changeList.title.localeCompare(this.model.get('title'))) {
                    attrs.title = changeList.title;
                }

                if (changeList.description.localeCompare(this.model.get('description'))) {
                    attrs.description = changeList.description;
                }

                if (!(changeList.icon === this.model.get('icon').id)) {
                    attrs.icon = changeList.icon;

                    let that = this;
                    let image = new window.ol.style.Icon(({
                        anchor: [0.3, 1],
                        src: that.iconCol.findWhere({id: attrs.icon}).get('path')
                    }));

                    let iconStyle = new window.ol.style.Style({
                        image: image
                    });
                    this.iconFeature.setStyle(iconStyle);

                }

                if (!(changeList.point.coordinates.length == this.model.get('point').coordinates.length
                    && changeList.point.coordinates.every((v, i) => v === this.model.get('point').coordinates[i]))) {
                    attrs.point = {};
                    attrs.point.type = 'Point';
                    attrs.point.coordinates = changeList.point.coordinates;

                    let geometry = new window.ol.geom.Point(window.ol.proj.fromLonLat(attrs.point.coordinates));
                    this.iconFeature.setGeometry(geometry);


                }


                if (Object.keys(attrs).length !== 0) {
                    let that = this;
                    attrs.id = this.model.get('id');
                    this.model.save(attrs, {
                        'patch': true,
                        success: function (data) {
                            that.success(data);
                        },
                        complete: function (xhr) {
                            if (xhr.status > 299)
                                that.error(xhr);
                        },
                        wait: true
                    });
                }

                this.activateChangeMode();
            },
            error(data) {
                console.log(data);
                message = `ОШИБКА:`;
                if (data.responseJSON.title) message = message + `<br> Неверное название места`;
                if (data.responseJSON.description) message = message + `<br> Неверное описание места`;
                if (data.responseJSON.icon) message = message + `<br> Ошибка с типом места`;
                if (data.responseJSON.point) message = message + `<br>  Ошибка в координатах`;
                this.showChildView('msgRegion', new MessageView(message));
            },
            success(data) {
                // this.showChildView('msgRegion', new MessageView('Данные успешно обновлены'));
            },

            delMarker() {
                this.model.destroy({wait: true});
                this.options.map.vectorSource.removeFeature(this.iconFeature);
            },

            onRender() {
                if (this.changeMode) {
                    let that = this;
                    this.iconCol = new Collections.IconCollection();


                    this.iconCol.fetch({
                        success: function f() {
                            //  debugger
                            let iconView = new IconListView(that.iconCol, that.model.attributes['icon'].id);
                            that.showChildView('iconRegion', iconView);
                            //that.triggerMethod('add:marker', that);
                        }
                    });

                }

            },


            addMarkerOnMap(model) {

                let point = model.get('point').coordinates;

                this.iconFeature = new window.ol.Feature({
                    geometry: new window.ol.geom.Point(window.ol.proj.fromLonLat(point))
                });


                let image = new window.ol.style.Icon(({
                    anchor: [0.3, 1],
                    src: model.get('icon').path
                }));

                let iconStyle = new window.ol.style.Style({
                    image: image
                });
                //debugger
                this.iconFeature.setStyle(iconStyle);
                this.options.map.addPoint(this.iconFeature);


            },

        });

        return MarkerCardView;
    });






