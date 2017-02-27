'use strict';

(function () {

    function HomeCategoriesController($scope, DBService, dialogService) {
        var vm = this;

        var dialogCtrl = vm;

        dialogCtrl.categoryModel = {};

        dialogCtrl.cancel = function () {
            dialogService.cancel();
        };

        dialogCtrl.categoryDlgOpt = {
            title: 'Add Category',
            ok: 'Save',
            cancel: 'Cancel',
            dlgOpts: {
                controllerAs: 'categoryCtrl',
                controller: function controller() {
                    return dialogCtrl;
                },
                templateUrl: '/lan_crud/src/views/include/categoryFormView.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }
        };

        dialogCtrl.process = function (file) {

            angular.forEach(file, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    dialogCtrl.categoryModel.picture = uri;
                };

                fileReader.readAsDataURL(flowFile.file);
            });
        };

        dialogCtrl.addCategory = function (category) {

            DBService.add('Category', category).then(function (r) {
                var msg = 'Category saved!';
                var title = 'Done';
                dialogCtrl.categoryModel = {};
                dialogService.showMessage(title, msg).then(function () {});
            }, function (e) {
                var msg = 'Error while adding category.\nCheck if the name is not a duplicated one';
                var title = 'Error';
                dialogService.showMessage(title, msg).then(function () {});
            });
        };

        vm.createCategory = function () {
            dialogService.showCustomDialog(vm.categoryDlgOpt).then(function (data) {
                vm.getCategoryList();
            }, function () {
                vm.getCategoryList();
            });
        };

        vm.editCategory = function (id) {};

        vm.getCategoryList = function () {
            return DBService.list('Category').then(function (list) {
                vm.categoryList = list;
                $scope.$apply();
                return list;
            });
        };

        vm.$onInit = function () {
            return vm.getCategoryList();
        };
    }

    HomeCategoriesController.$inject = ['$scope', 'DBService', 'dialogService'];

    require(['app'], function (app) {
        app.controller('HomeCategoriesController', HomeCategoriesController);
    });

    define(['app', 'services/dbService', 'services/dialogService', 'components/categoryComponent'], function () {
        return HomeCategoriesController;
    });
})();