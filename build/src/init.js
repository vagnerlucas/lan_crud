'use strict';

(function () {

    init.$inject = ['$rootScope', '$location', '$state', 'DBService'];

    function init($rootScope, $location, $state, DBService) {

        var checkUser = function checkUser() {

            return DBService.getById('User', 1).then(function (u) {
                return Promise.resolve($rootScope.existUser = u.length == 1);
            }, function (e) {
                return Promise.resolve(false);
            });
        };

        $rootScope.$on('$stateChangeStart', function (event, next, current) {

            if (!$rootScope.existUser) {
                if (next.url === '/login') return;else event.preventDefault();
            } else {
                if (next.url === '/login' || next.url === '/') event.preventDefault();else return;
            }

            Promise.resolve(checkUser()).then(function () {

                if ($rootScope.existUser) {
                    if (next.url === '/login' || next.url === '/') $state.go('home.contacts');else $state.go(next, current);
                } else $state.go('login');
            });
        });
    }

    define(['angularAMD', 'services/dbService'], function () {
        return init;
    });
})();