(function () {

    function menuOptions($rootScope, DBService) {

        const directive = {
            restrict: 'E',
            scope: {
                userName: '@userName' 
            },
            templateUrl: '/src/directives/templates/menuOptions.html',
            link: function (scope, element, attrs) {
                $rootScope.$watch('existUser', () => {
                    scope.existUser = $rootScope.existUser
                    scope.userName = attrs.userName
                    if (scope.existUser) {
                        DBService.getById('User', 1).then((u) => {
                                return Promise.resolve(u[0])
                            },
                            (e) => {
                                return Promise.resolve(false)
                            }).then((u) => {
                            scope.userName = u.name
                        })
                    }
                })
            }
        }
        return directive
    }

    menuOptions.$inject = ['$rootScope', 'DBService']

    require(['app'], function (app) {
        app.directive('menuOptions', menuOptions)
    })

    define(['app', 'services/DBService'], function () {
        return menuOptions
    })

})()