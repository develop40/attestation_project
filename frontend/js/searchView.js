define(['marionette', 'tpl!templates/searchView.tpl'],
    function (Marionette, searchViewTpl) {

    var SearchView = Marionette.View.extend({
        template: searchViewTpl,

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