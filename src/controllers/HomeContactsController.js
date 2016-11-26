(function () {

    'use strict'

    function HomeContactsController($scope, DBService, dialogService) {
        let vm = this

        let dialogCtrl = vm

        dialogCtrl.contactModel = {}

        dialogCtrl.cancel = () => {
            dialogService.cancel()
        }

        dialogCtrl.contactDlgOpt = {
            title: 'Add Contact',
            ok: 'Save',
            cancel: 'Cancel',
            dlgOpts: {
                controllerAs: 'contactCtrl',
                controller: () => dialogCtrl,
                templateUrl: '/src/views/include/contactFormView.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }
        }

        dialogCtrl.process = file => {

            angular.forEach(file, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    dialogCtrl.contactModel.picture = uri;
                };

                fileReader.readAsDataURL(flowFile.file);

            })
        }

        dialogCtrl.addContact = contact => {
            contact.starred = contact.starred || false

            DBService.add('Contact', contact).then((r) => {
                const msg = 'Contact saved!'
                const title = 'Done'
                dialogCtrl.contactModel = {}
                dialogService.showMessage(title, msg).then(() => { })
            }, (e) => { 
                const msg = 'Error while adding contact.\nCheck if the email is not a duplicated one'
                const title = 'Error'
                dialogService.showMessage(title, msg).then(() => { })
            })
        }

        vm.createContact = () => {
            dialogService.showCustomDialog(vm.contactDlgOpt)
                .then((data) => { vm.getContactList() },
                () => { vm.getContactList() })
        }

        vm.editContact = (id) => {

        }

        vm.getContactList = () => {
            return DBService.list('Contact').then((list) => {
                vm.contactList = list
                $scope.$apply()
                return list
            })
        }

        vm.$onInit = () => vm.getContactList()
    }

    HomeContactsController.$inject = ['$scope', 'DBService', 'dialogService']

    require(['app'], function (app) {
        app.controller('HomeContactsController', HomeContactsController)
    })

    define(['app', 'services/dbService', 'services/dialogService', 'components/contactComponent'], function () {
        return HomeContactsController
    })

})()