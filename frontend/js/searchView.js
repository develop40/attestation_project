define(['marionette'], function (Marionette) {

    var SearchView = Marionette.View.extend({
        template: _.template(`
            <div class="search-card-body">
                <form class="search-form">
                    <input type="search" id="search-marker" placeholder="Поиск мест...">
                    <input class="btn" type="button" id='search-btn' value="Найти">
                </form>
            </div>`),

        ui:{
            'searchInput': '#search-marker'
        },
        className: 'search-card',

        initialize: function (collection) {
            this.collection = collection;
        },

        events: {
            'click #search-btn': 'searchOn',
        },

        searchOn: function () {
            this.collection.url = '/markers/?search=' + this.ui.searchInput.val();
            this.collection.fetch();
        }
    });
    return SearchView;
})