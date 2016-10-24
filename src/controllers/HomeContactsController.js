(function () {

    function HomeContactsController() {
        console.log('HomeContactsController')
    }

    require(['app'], function (app) {
        app.controller('HomeContactsController', HomeContactsController)
    })

    define(['app'], function () {
        return HomeContactsController
    })

})()