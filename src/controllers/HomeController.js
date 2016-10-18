(function(){
    function HomeController() {
        console.info('home controller')
    }

    require(['app'], function(app) { app.controller('HomeController', HomeController)})

    define(['app'], function() { return HomeController })
    
})()