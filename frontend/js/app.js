define(['marionette', 'mainView', 'cookie', 'loginView'], function (Marionette, MainView, Cookie, LoginView) {

    Backbone.old_sync = Backbone.sync
    Backbone.sync = function (method, model, options) {

        var new_options = _.extend({
            beforeSend: function (xhr) {
                let token_load = Cookie.get('token');
                var token = 'Token '+token_load;

                if (token) {
                    xhr.setRequestHeader('Authorization', token);
                    xhr.setRequestHeader("Content-Type", "application/json");
                }
            }
        }, options)
        return Backbone.old_sync(method, model, new_options);
    };
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
    beforeSend: function(xhr, settings) {
        var csrftoken = Cookie.get('csrftoken');
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
    });
    const MyApp = Marionette.Application.extend({
       region: '#main-region',
        onStart() {
            if(!Cookie.get('token')){
                this.showView(new LoginView(this));
            }
            else{
                this.showView(new MainView());
            }

            Backbone.history.start();
        }
    });

        return MyApp;
})
