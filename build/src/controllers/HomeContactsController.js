'use strict';

(function () {

    'use strict';

    function HomeContactsController($scope, DBService, dialogService) {
        var vm = this;

        var dialogCtrl = vm;

        dialogCtrl.contactModel = {};

        dialogCtrl.cancel = function () {
            dialogService.cancel();
        };

        dialogCtrl.contactDlgOpt = {
            title: 'Add Contact',
            ok: 'Save',
            cancel: 'Cancel',
            dlgOpts: {
                controllerAs: 'contactCtrl',
                controller: function controller() {
                    return dialogCtrl;
                },
                templateUrl: '/src/views/include/contactFormView.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }
        };

        dialogCtrl.process = function (file) {

            angular.forEach(file, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    dialogCtrl.contactModel.picture = uri;
                };

                fileReader.readAsDataURL(flowFile.file);
            });
        };

        dialogCtrl.addContact = function (contact) {
            contact.starred = contact.starred || false;

            DBService.add('Contact', contact).then(function (r) {
                var msg = 'Contact saved!';
                var title = 'Done';
                dialogCtrl.contactModel = {};
                dialogService.showMessage(title, msg).then(function () {});
            }, function (e) {
                var msg = 'Error while adding contact.\nCheck if the email is not a duplicated one';
                var title = 'Error';
                dialogService.showMessage(title, msg).then(function () {});
            });
        };

        vm.createContact = function () {
            dialogService.showCustomDialog(vm.contactDlgOpt).then(function (data) {
                vm.getContactList();
            }, function () {
                vm.getContactList();
            });
        };

        vm.editContact = function (id) {};

        vm.getContactList = function () {
            return DBService.list('Contact').then(function (list) {
                vm.contactList = list;
                $scope.$apply();
                return list;
            });
        };

        vm.$onInit = function () {
            return vm.getContactList();
        };
    }

    HomeContactsController.$inject = ['$scope', 'DBService', 'dialogService'];

    require(['app'], function (app) {
        app.controller('HomeContactsController', HomeContactsController);
    });

    define(['app', 'services/dbService', 'services/dialogService', 'components/contactComponent'], function () {
        return HomeContactsController;
    });
})();