(function() {

    function MenuController($state, $rootScope, DBService) {
        
        let vm = this;
        let loginModel = { name: '' }
        vm.existUser = false

        let saveUser = (user) => {
            return DBService.add('User', user)
        }

        vm.login = () => {
            vm.loginModel.id = 1
            saveUser(vm.loginModel).then(() => {
                $rootScope.existUser = true
                vm.existUser = true
                $state.go('home')
            }, (e) => { alert(`can\'t go any further ${e}`) })
        }
    }

    MenuController.$inject = ['$state', '$rootScope', 'DBService']

    require(['app'], function(app) { app.controller('MenuController', MenuController)})

    define(['app', 'services/dbService'], function() { return MenuController })

})()