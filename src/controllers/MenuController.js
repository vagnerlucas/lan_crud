(function () {

    'use strict'

    function MenuController($state, $rootScope, $mdDialog, DBService) {

        let vm = this;
        let loginModel = {
            name: ''
        }

        const saveUser = (user) => {
            return DBService.add('User', user)
        }

        vm.login = () => {
            vm.loginModel.id = 1
            saveUser(vm.loginModel).then(() => {
                $rootScope.existUser = true
                vm.loggedUserName = vm.loginModel.name
                $state.go('home.contacts')
            }, (e) => {
                alert(`can\'t go any further ${e}`)
            })
        }
    }

    MenuController.$inject = ['$state', '$rootScope', '$mdDialog', 'DBService']

    require(['app'], function (app) {
        app.controller('MenuController', MenuController)
    })

    define(['app', 'services/dbService', 'directives/menuOptionsDirective'], function () {
        return MenuController
    })

})()