require.config({

    deps: ["main"],

    paths:{
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        jquery: 'libs/jquery-3.3.1',
        bootstrap: 'libs/bootstrap.min',
        ol: 'libs/ol/ol',
        "backbone.radio": 'libs/backbone.radio',
        marionette: 'libs/backbone.marionette',
        text: 'libs/text',
        tpl: 'libs/underscore-tpl',
        cookie: 'libs/js.cookie'
    },

    shim:{

        jquery:{
          exports: 'jQuery'
        },

        underscore:{
            exports: "_"
        },

        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },

        marionette:{
            deps: ['backbone'],
             exports: 'Marionette'
        },

        bootstrap:{
            deps: ['jquery']
        },

        tpl: ["text"]
    }

});



require(['app'], function (MyApp) {
    var app = new MyApp();
    app.start();
});

