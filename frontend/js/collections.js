define(['models'], function (Models) {


    return {
        MarkerCollection: Backbone.Collection.extend({
            url: '/markers/',
            model: Models.MarkerModel
        }),


        IconCollection: Backbone.Collection.extend({
            url: '/icons/',
            model: Models.IconModel
        }),


    }
})