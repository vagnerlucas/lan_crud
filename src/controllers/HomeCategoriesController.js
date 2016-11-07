(function () {

    function HomeCategoriesController() {
        //console.log('HomeCategoriesController')
    }

    require(['app'], function (app) {
        app.controller('HomeCategoriesController', HomeCategoriesController)
    })

    define(['app'], function () {
        return HomeCategoriesController
    })

})()