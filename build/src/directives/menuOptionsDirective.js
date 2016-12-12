'use strict';

(function () {

    function menuOptions($rootScope, DBService, dialogService, $state) {

        var directive = {
            restrict: 'E',
            scope: {
                userName: '@userName'
            },
            templateUrl: '/src/directives/templates/menuOptions.html',
            link: function link(scope, element, attrs) {
                scope.exitAndDestroy = function ($event) {
                    var title = 'Are you sure?';
                    var msg = 'This is going to quit and destroy all';
                    var yes = 'Go ahead';
                    dialogService.openConfirmDialog($event, title, msg, yes).then(function (f) {
                        if (f) {
                            DBService.clearData().then(function (r) {
                                return Promise.resolve(true);
                            }, function (e) {
                                return Promise.reject(false);
                            }).then(function () {
                                var msg = 'Database erased';
                                var title = 'Done';
                                $rootScope.existUser = false;
                                scope.userName = null;
                                dialogService.showMessage(title, msg).then(function () {
                                    $state.go('login');
                                });
                            });
                        }
                    });
                };

                var getUser = function getUser() {
                    return DBService.getById('User', 1).then(function (u) {
                        return Promise.resolve(u[0]);
                    }, function (e) {
                        throw e;
                    });
                };

                $rootScope.$watch('existUser', function () {
                    scope.existUser = $rootScope.existUser;
                    scope.userName = attrs.userName;

                    if (scope.existUser) {
                        getUser().then(function (u) {
                            scope.userName = u.name;
                        }, function (e) {
                            throw e;
                        });
                    }
                });
            }
        };
        return directive;
    }

    menuOptions.$inject = ['$rootScope', 'DBService', 'dialogService', '$state'];

    require(['app'], function (app) {
        app.directive('menuOptions', menuOptions);
    });

    define(['app', 'services/dbService', 'services/dialogService'], function () {
        return menuOptions;
    });
})();