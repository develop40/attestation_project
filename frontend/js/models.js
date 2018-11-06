define(['backbone'], function () {

    return {
        MarkerModel: Backbone.Model.extend({
            urlRoot: '/markers/',
            url: function () {
                var base =
                    _.result(this, 'urlRoot') ||
                    _.result(this.collection, 'url') ||
                    urlError();
                if (this.isNew()) return base;
                var id = this.get(this.idAttribute);
                return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id) + '/';
            }
        }),


        IconModel: Backbone.Model.extend({
            urlRoot: '/icons/'
        })
    }

});

