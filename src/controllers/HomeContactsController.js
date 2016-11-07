(function () {

    'use strict'
    
    function HomeContactsController(DBService, dialogService) {
        let vm = this

        let dialogCtrl = vm

        //vm.contactList = []
       
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

        dialogCtrl.process = x => {

            angular.forEach(x, function(flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                var uri = event.target.result;
                dialogCtrl.contactModel.picture = uri;     
            };
          
            fileReader.readAsDataURL(flowFile.file);            

            })
        }

        dialogCtrl.test = contact => {   
            contact.starred = contact.starred || false
                     
            DBService.add('Contact', contact).then((r) => {
                console.log(r)
                const msg = 'Contact saved!'
                const title = 'Done'
                dialogCtrl.contactModel = {}
                dialogService.showMessage(title, msg).then(() => {})
            }, (e) => { console.log(e) })
        }

        vm.createContact = () => {
            dialogService.showCustomDialog(vm.contactDlgOpt)
                .then((data) => { console.log(data) },
                      () => { vm.getContactList() })
            console.log('createContact')
        }

        vm.editContact = (id) => {

        }

        vm.deleteContact = (id) => {

        }

        vm.getContactList = () => {
            DBService.list('Contact').then((list) => {
                console.log(list)
                vm.contactList = list
            })
            return vm.contactList
        }

        vm.getContactList()

    }

    HomeContactsController.$inject = ['DBService', 'dialogService']

    require(['app'], function (app) {
        app.controller('HomeContactsController', HomeContactsController)
    })

    define(['app', 'services/dbService', 'services/dialogService', 'components/contactComponent'], function () {
        return HomeContactsController
    })

})()