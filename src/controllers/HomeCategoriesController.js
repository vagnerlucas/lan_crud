(function () {

    function HomeCategoriesController($scope, DBService, dialogService) {
        let vm = this

        let dialogCtrl = vm

        dialogCtrl.categoryModel = {}

        dialogCtrl.cancel = () => {
            dialogService.cancel()
        }

        dialogCtrl.categoryDlgOpt = {
            title: 'Add Category',
            ok: 'Save',
            cancel: 'Cancel',
            dlgOpts: {
                controllerAs: 'categoryCtrl',
                controller: () => dialogCtrl,
                templateUrl: '/src/views/include/categoryFormView.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }
        }

        dialogCtrl.process = file => {

            angular.forEach(file, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    dialogCtrl.categoryModel.picture = uri;
                };

                fileReader.readAsDataURL(flowFile.file);
            })
        }

        dialogCtrl.addCategory = category => {

            DBService.add('Category', category).then((r) => {
                const msg = 'Category saved!'
                const title = 'Done'
                dialogCtrl.categoryModel = {}
                dialogService.showMessage(title, msg).then(() => { })
            }, (e) => { console.log(e) })
        }

        vm.createCategory = () => {
            dialogService.showCustomDialog(vm.categoryDlgOpt)
                .then((data) => { vm.getCategoryList() },
                () => { vm.getCategoryList() })
        }

        vm.editCategory = (id) => {

        }

        vm.getCategoryList = () => {
            return DBService.list('Category').then((list) => {
                vm.categoryList = list
                $scope.$apply()
                return list
            })
        }

        vm.getCategoryList()
    }

    HomeCategoriesController.$inject = ['$scope', 'DBService', 'dialogService']

    require(['app'], function (app) {
        app.controller('HomeCategoriesController', HomeCategoriesController)
    })

    define(['app', 'services/dbService', 'services/dialogService', 'components/categoryComponent'], function () {
        return HomeCategoriesController
    })

})()