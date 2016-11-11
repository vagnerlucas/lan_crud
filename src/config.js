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

        const homeContacts = angularAMD.route({
            url: '/contacts',
            controllerAs: 'contacts',
            controllerUrl: 'controllers/HomeContactsController',
            templateUrl: '/src/views/include/homeContactsView.html',
        })

        const homeCategories = angularAMD.route({
            url: '/categories',
            controllerAs: 'categories',
            controllerUrl: 'controllers/HomeCategoriesController',
            templateUrl: '/src/views/include/homeCategoriesView.html',
        })

        const login = angularAMD.route({
            templateUrl: '/src/views/loginView.html',
            url: '/login'
        })

        $stateProvider
            .state('/', main)
            .state('home', home)
            .state('home.contacts', homeContacts)
            .state('home.categories', homeCategories)
            .state('login', login)

        $urlRouterProvider.otherwise('/');
        $urlMatcherFactoryProvider.caseInsensitive(true);
    }

    define(['angularAMD', 'fusty-flow-factory'], function () {
        return config
    });

})();