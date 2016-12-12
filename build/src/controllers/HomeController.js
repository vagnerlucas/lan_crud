'use strict';

(function () {

    'use strict';

    function HomeController($rootScope) {
        var vm = this;

        vm.existUser = $rootScope.existUser;
    }

    require(['app'], function (app) {
        app.controller('HomeController', HomeController);
    });

    define(['app'], function () {
        return HomeController;
    });
})();