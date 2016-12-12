'use strict';

(function () {

    'use strict';

    function MenuController($state, $rootScope, $mdDialog, DBService) {

        var vm = this;
        var loginModel = {
            name: ''
        };

        var saveUser = function saveUser(user) {
            return DBService.add('User', user);
        };

        vm.login = function () {
            vm.loginModel.id = 1;
            saveUser(vm.loginModel).then(function () {
                $rootScope.existUser = true;
                vm.loggedUserName = vm.loginModel.name;
                $state.go('home.contacts');
            }, function (e) {
                alert('can\'t go any further ' + e);
            });
        };
    }

    MenuController.$inject = ['$state', '$rootScope', '$mdDialog', 'DBService'];

    require(['app'], function (app) {
        app.controller('MenuController', MenuController);
    });

    define(['app', 'services/dbService', 'directives/menuOptionsDirective'], function () {
        return MenuController;
    });
})();