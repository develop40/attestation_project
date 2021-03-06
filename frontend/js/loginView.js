define(['marionette', 'cookie', 'mainView', 'mapView', 'tpl!templates/loginView.tpl',
        'tpl!templates/registerView.tpl'],
    function (Marionette, Cookie, MainView, MapView, loginviewTpl, registerViewTpl) {

        var loginTemplate = loginviewTpl;
        var registerTemplate = registerViewTpl;
        const LoginView = Marionette.View.extend(
            {
                className: 'main-view',
                markerList: null,
                ui: {
                    'username': '#username',
                    'password': '#password',
                    'passwordAgain': '#password_again',
                    'loginBtn': '#login',
                    'toRegisterBtn': '#toregister',
                    'toLoginBtn': '#tologin',
                    'registerBtn': '#register'
                },
                events: {
                    'click @ui.toRegisterBtn': 'changeTemplate',
                    'click @ui.toLoginBtn': 'changeTemplate',
                    'click @ui.loginBtn': 'login',
                    'click @ui.registerBtn': 'register'
                },
                regions:{
                    'mapRegion':'#map-region'
                },
                state: 'login',
                initialize(app) {
                   // alert('login view')
                    this.app = app

                },
                getTemplate() {
                    if (this.state === 'login')
                        return loginTemplate;
                    else
                        return registerTemplate;
                },
                changeTemplate(e) {
                    e.preventDefault();
                    if (this.state === 'login') {
                        this.state = 'register'
                    }
                    else {
                        this.state = 'login'
                    }
                    this.render()
                },

                register(e) {
                    var that = this;
                    e.preventDefault();
                    if ((this.ui.username.val() != '') && (this.ui.password.val() != '')) {
                        if (this.ui.password.val() === this.ui.passwordAgain.val()) {
                            $.post(
                                'register/',
                                {'username': this.ui.username.val(), 'password': this.ui.password.val()},
                                function (data) {
                                    Cookie.set('token', data.token)
                                    that.app.showView(new MainView())
                                    console.log(data);
                                    // Cookie.set('token', data.token)

                                }
                            ).fail(function (data) {
                                console.log(data.responseJSON)
                                if(data.responseJSON.error)
                                    alert(data.responseJSON.error)
                                if(data.responseJSON.username)
                                    alert(data.responseJSON.username)
                                if(data.responseJSON.password)
                                    alert(data.responseJSON.password)
                            })
                        }
                        else{
                            alert('Пароли должны совпадать!')
                        }
                    }
                    else {
                        alert("Введите логин и пароль!")
                    }

                },

                login(e) {
                    var that = this;
                    e.preventDefault();
                    if ((this.ui.username.val() != '') && (this.ui.password.val() != '')) {
                        $.post(
                            'login/',
                            {'username': this.ui.username.val(), 'password': this.ui.password.val()},
                            function (data) {
                                Cookie.set('token', data.token)
                                that.app.showView(new MainView())
                                console.log(data);
                                // Cookie.set('token', data.token)

                            }
                        ).fail(function (data) {
                            console.log(data.responseJSON)
                            alert(data.responseJSON.error)

                        })
                    }
                    else {
                        alert("Введите логин и пароль!")
                    }
                },

                onRender() {
                    this.showChildView('mapRegion', new MapView());
                    console.log(Cookie.get())
                }


            });

        return LoginView;
    });



