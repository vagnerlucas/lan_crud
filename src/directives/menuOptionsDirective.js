(function () {

    function menuOptions($rootScope, DBService, dialogService, $state) {

        const directive = {
            restrict: 'E',
            scope: {
                userName: '@userName'
            },
            templateUrl: '/src/directives/templates/menuOptions.html',
            link: function (scope, element, attrs) {
                scope.exitAndDestroy = ($event) => {
                    const title = 'Are you sure?'
                    const msg = 'This is going to quit and destroy all'
                    const yes = 'Go ahead'
                    dialogService.openConfirmDialog($event, title, msg, yes).then((f) => {
                        if (f) {
                            DBService.clearData().then((r) => {
                                        return Promise.resolve(true)
                                    },
                                    (e) => {
                                        return Promise.reject(false)
                                    })
                                .then(() => {
                                    const msg = 'Database erased'
                                    const title = 'Done'
                                    $rootScope.existUser = false
                                    scope.userName = null
                                    dialogService.showMessage(title, msg).then(() => {
                                        $state.go('login')
                                    })
                                })

                        }
                    })
                }

                const getUser = () => {
                    return DBService.getById('User', 1).then(
                        (u) => {
                            return Promise.resolve(u[0])
                        },
                        (e) => {
                            throw e
                        })
                }

                $rootScope.$watch('existUser', () => {
                    scope.existUser = $rootScope.existUser
                    scope.userName = attrs.userName

                    if (scope.existUser) {
                        getUser().then((u) => {
                            scope.userName = u.name
                        }, (e) => {
                            throw e
                        })
                    }
                })
            }
        }
        return directive
    }

    menuOptions.$inject = ['$rootScope', 'DBService', 'dialogService', '$state']

    require(['app'], function (app) {
        app.directive('menuOptions', menuOptions)
    })

    define(['app', 'services/dbService', 'services/dialogService'], function () {
        return menuOptions
    })
    
})()