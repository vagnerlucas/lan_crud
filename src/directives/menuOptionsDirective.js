(function () {

    function menuOptions($rootScope) {
        
        const directive = {
            restrict: 'E',
            templateUrl: '/src/directives/templates/menuOptions.html',
            link: function (scope) {
                $rootScope.$watch('existUser', () => {
                    scope.existUser = $rootScope.existUser
                })
            }
        }
        return directive
    }

    require(['app'], function (app) {
        app.directive('menuOptions', menuOptions)
    })

    define(['app'], function () {
        return menuOptions
    })

})()