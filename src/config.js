(function () {
    'use strict';

    function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, dbProvider) {

        const angularAMD = require('angularAMD');

        dbProvider.init()

        const main = angularAMD.route({
            url: '/',
            templateUrl: '/src/views/defaultView.html'
        })

        const home = angularAMD.route({
            templateUrl: '/src/views/homeView.html',
            controllerUrl: 'controllers/HomeController',
            controllerAs: 'home',
            url: '/home'
        })

        const login = angularAMD.route({
            templateUrl: '/src/views/loginView.html',
            url: '/login'
        })

        const config = angularAMD.route({
            template: '<md-content><h3>Ok</h3></md-content>',
            url: '/config'
        })

        $stateProvider
            .state('/', main)
            .state('home', home)
            .state('login', login)
            .state('config', config)

        $urlRouterProvider.otherwise('/');
        $urlMatcherFactoryProvider.caseInsensitive(true);
    }

    define(['angularAMD'], function () {
        return config
    });

})();