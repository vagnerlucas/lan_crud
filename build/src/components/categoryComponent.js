'use strict';

(function () {
    function categoryController(DBService, dialogService, $state, $scope) {
        var vm = this;

        var canUpdate = function canUpdate(category) {
            return DBService.getSchema('Category').then(function (schema) {
                var query = lf.op.and(schema.id.neq(category.id), schema.name.eq(category.name));
                return DBService.executeQuery(schema, query).then(function (check) {
                    return check.length === 0;
                });
            });
        };

        vm.update = function (category, prop, value) {
            if (prop === 'name') {
                var tmpName = category.name;
                category[prop] = value;
                Promise.resolve(canUpdate(category)).then(function (r) {
                    if (!r) {
                        category[prop] = tmpName;
                        var msg = 'Can\'t update the category name field';
                        var title = 'Error';
                        return dialogService.showMessage(title, msg).then(function () {}).then(function () {
                            return Promise.reject(false);
                        });
                    }
                }).then(function (s) {
                    category[prop] = value;
                    DBService.update('Category', category.id, category).then(function () {
                        $scope.$apply();
                    });
                });
            } else {
                category[prop] = value;
                DBService.update('Category', category.id, category).then(function () {
                    $scope.$apply();
                });
            }
        };

        vm.remove = function ($event, id) {
            var title = 'Are you sure?';
            var msg = 'You are about to remove the category';
            var yes = 'Go ahead';
            dialogService.openConfirmDialog($event, title, msg, yes).then(function (f) {
                if (f) {
                    DBService.del('Category', id).then(function (r) {
                        return Promise.resolve(true);
                    }, function (e) {
                        return Promise.reject(false);
                    }).then(function () {
                        var msg = 'Category removed';
                        var title = 'Done';
                        dialogService.showMessage(title, msg).then(function () {}).then(function () {
                            $state.reload();
                        });
                    });
                }
            });
        };
    }

    require(['app'], function (app) {
        app.component('category', {
            templateUrl: '/lan_crud/src/components/templates/categoryTemplate.html',
            controller: categoryController,
            controllerAs: 'category',
            bindings: {
                data: '=',
                hideButtons: '=',
                hideText: '='
            }
        });
    });

    define(['app', 'services/dbService', 'services/dialogService', 'components/editableFieldComponent'], function () {
        return categoryController;
    });
})();