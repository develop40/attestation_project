define(['marionette', 'collections', 'markerListView', 'msgView',
        'mapView', 'loaderView', 'searchView', 'addView', 'cookie',
        'tpl!templates/mainView.tpl'],
    function (Marionette, Collections, MarkerListView, MessageView,
              MapView, LoaderView, SearchView, AddFormView, Cookie,
              mainViewTpl) {

        const MainView = Marionette.View.extend(
            {
                className: 'main-view',
                markerList: null,

                initialize() {
                    this.collection = new Collections.MarkerCollection();
                    this.mapView = new MapView();
                },

                template: mainViewTpl,

                regions: {
                    'markerListRegion': '#marker-list-region',
                    'mapRegion': '#map-region',
                    'msgRegion': '#msg-region',
                    'searchRegion': '#search-region',
                    'addRegion': '#add-form-region',
                },

                ui: {
                    'exitBtn': '#exit'
                },

                events: {
                    'click #show-form-btn': 'renderAddForm',
                    'click @ui.exitBtn': 'exitToLogin'
                },

                renderMarkerList() {
                    if (this.mapView.isAttached()) {
                        this.markerList = new MarkerListView(this.collection, this.mapView);
                        this.showChildView('markerListRegion', this.markerList);
                    } else {
                        alert('NOOOOOO')
                    }
                },

                onRender() {

                    console.log(Cookie.get());
                    this.showChildView('mapRegion', this.mapView);

                    this.showChildView('searchRegion', new SearchView(this.collection));
                    let that = this;
                    this.collection.fetch({
                        wait: true,
                        success: function (xhr) {
                            that.renderMarkerList();
                        },
                        complete: function (xhr) {
                            if (xhr.status > 299)
                                that.error(xhr);
                        },
                    });

                },
                error(data) {
                    console.log(data);
                    if (data.status === 401) message = `ОШИБКА:<br> Вы не авторизованы. Попробуйте перезагрузить страницу и авторизоваться`;
                    else message = `ОШИБКА:<br> Что-то пошло не так при загрузке данных. Попробуйте снова.`;
                    this.showChildView('msgRegion', new MessageView(message));
                },
                renderAddForm: function () {
                    var addView = new AddFormView(this.collection, this.mapView);
                    this.showChildView('addRegion', addView);
                },

                exitToLogin() {

                    var cookie_date = new Date();  // Текущая дата и время
                    cookie_date.setTime(cookie_date.getTime() - 1);
                    let name= 'token';
                    document.cookie = name += "=; expires=" + cookie_date.toGMTString();
                    location.reload();
                }

            });

        return MainView;
    });



