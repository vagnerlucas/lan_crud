'use strict';

(function () {
    'use strict';

    function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, dbProvider) {

        var angularAMD = require('angularAMD');

        dbProvider.init();

        var main = angularAMD.route({
            url: '/',
            templateUrl: '/src/views/defaultView.html'
        });

        var home = angularAMD.route({
            templateUrl: '/src/views/homeView.html',
            controllerUrl: 'controllers/HomeController',
            controllerAs: 'home',
            url: '/home'
        });

        var homeContacts = angularAMD.route({
            url: '/contacts',
            controllerAs: 'contacts',
            controllerUrl: 'controllers/HomeContactsController',
            templateUrl: '/src/views/include/homeContactsView.html'
        });

        var homeCategories = angularAMD.route({
            url: '/categories',
            controllerAs: 'categories',
            controllerUrl: 'controllers/HomeCategoriesController',
            templateUrl: '/src/views/include/homeCategoriesView.html'
        });

        var login = angularAMD.route({
            templateUrl: '/src/views/loginView.html',
            url: '/login'
        });

        $stateProvider.state('/', main).state('home', home).state('home.contacts', homeContacts).state('home.categories', homeCategories).state('login', login);

        $urlRouterProvider.otherwise('/');
        $urlMatcherFactoryProvider.caseInsensitive(true);
    }

    define(['angularAMD', 'fusty-flow-factory'], function () {
        return config;
    });
})();