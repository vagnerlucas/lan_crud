(function () {

    'use strict'
    
    function HomeContactsController(DBService) {
        let vm = this

        vm.createContact = () => {
            console.log('createContact')
        }

        vm.editContact = (id) => {

        }

        vm.deleteContact = (id) => {

        }

        vm.getContactList = () => {

        }

    }

    HomeContactsController.$inject = ['DBService']

    require(['app'], function (app) {
        app.controller('HomeContactsController', HomeContactsController)
    })

    define(['app', 'services/dbService','components/contactComponent'], function () {
        return HomeContactsController
    })

})()