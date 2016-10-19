(function(){
    function HomeController($rootScope) {
        let vm = this
        
        vm.existUser = $rootScope.existUser
        
        console.info('home controller')
    }

    require(['app'], function(app) { app.controller('HomeController', HomeController)})

    define(['app'], function() { return HomeController })
    
})()