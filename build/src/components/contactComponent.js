'use strict';

(function () {
    function contactController(DBService, dialogService, $state, $scope) {
        var vm = this;

        vm.remove = function ($event, id) {
            var title = 'Are you sure?';
            var msg = 'You are about to remove the contact';
            var yes = 'Go ahead';
            dialogService.openConfirmDialog($event, title, msg, yes).then(function (f) {
                if (f) {
                    DBService.del('Contact', id).then(function (r) {
                        return Promise.resolve(true);
                    }, function (e) {
                        return Promise.reject(false);
                    }).then(function () {
                        var msg = 'Contact removed';
                        var title = 'Done';
                        dialogService.showMessage(title, msg).then(function () {}).then(function () {
                            $state.reload();
                        });
                    });
                }
            });
        };

        var loadCategories = function loadCategories() {
            vm.data.categories = [];

            DBService.getSchema('ContactCategory').then(function (schema) {
                var query = schema.contact_id.eq(vm.data.id);

                //TODO add new function for join tables
                DBService.executeQuery(schema, query).then(function (list) {
                    list.forEach(function (e) {
                        DBService.getById('Category', e.category_id).then(function (cat) {
                            vm.data.categories.push(cat[0]);
                        });
                    });
                }, function (e) {
                    return console.error(e);
                }).then(function () {
                    setTimeout(function () {
                        $scope.$apply();
                    }, 100);
                });
            });
        };

        var canUpdateEmail = function canUpdateEmail(contact) {
            return DBService.getSchema('Contact').then(function (schema) {
                var query = lf.op.and(schema.id.neq(contact.id), schema.email.eq(contact.email));
                return DBService.executeQuery(schema, query).then(function (check) {
                    return check.length === 0;
                });
            });
        };

        vm.update = function (contact, prop, value) {

            if (prop === 'email') {
                (function () {
                    var tmpEmail = contact.email;
                    contact[prop] = value;
                    Promise.resolve(canUpdateEmail(contact)).then(function (r) {
                        if (!r) {
                            contact[prop] = tmpEmail;
                            var msg = 'Can\'t update the email field';
                            var title = 'Error';
                            return dialogService.showMessage(title, msg).then(function () {}).then(function () {
                                return Promise.reject(false);
                            });
                        }
                    }).then(function (s) {
                        DBService.update('Contact', contact.id, contact).then(function () {
                            $scope.$apply();
                        });
                    }, function (e) {});
                })();
            } else {
                contact[prop] = value;
                DBService.update('Contact', contact.id, contact).then(function () {
                    $scope.$apply();
                });
            }
        };

        vm.favorite = function (contact) {
            vm.update(contact, 'starred', !contact.starred);
        };

        vm.openCategoryMenu = function (contact) {
            DBService.list('Category').then(function (list) {
                contact.categories.forEach(function (e, j) {
                    list.forEach(function (el, i) {
                        if (el.id == e.id) {
                            list.splice(i, 1);
                        }
                    });
                });

                return Promise.resolve(list);
            }).then(function (list) {
                vm.categoriesMenu = list;
            });
        };

        vm.removeCategory = function (contact, category) {
            DBService.getSchema('ContactCategory').then(function (schema) {
                var query = lf.op.and(schema.contact_id.eq(contact.id), schema.category_id.eq(category.id));
                DBService.executeQuery(schema, query).then(function (toRemove) {
                    DBService.del('ContactCategory', toRemove[0].id).then(function () {
                        contact.categories.splice(contact.categories.indexOf(category), 1);
                        vm.categoriesMenu.push(category);
                        $scope.$apply();
                    });
                });
            });
        };

        vm.addCategory = function (contact, category) {

            DBService.list('ContactCategory').then(function (list) {
                if (list.length == 0) return Promise.resolve(category);

                if (contact.categories.length == 0) return Promise.resolve(category);

                var catRes = void 0;

                contact.categories.forEach(function (el, i) {
                    if (el.id != category.id) {
                        catRes = category;
                        return;
                    }
                });

                return Promise.resolve(catRes);
            }).then(function (category) {
                if (category != null) {
                    var contactCategory = {
                        'contact_id': contact.id,
                        'category_id': category.id
                    };

                    DBService.add('ContactCategory', contactCategory).then(function (r) {
                        contact.categories.push(category);
                        vm.categoriesMenu.splice(vm.categoriesMenu.indexOf(category), 1);
                    });
                }
            }).then(function () {
                $scope.$apply();
            });
        };

        vm.$onInit = function () {
            loadCategories();
        };
    }

    require(['app'], function (app) {
        app.component('contact', {
            templateUrl: '/src/components/templates/contactTemplate.html',
            controller: contactController,
            controllerAs: 'contact',
            bindings: {
                data: '='
            }
        });
    });

    define(['app', 'services/dbService', 'services/dialogService', 'components/categoryComponent', 'components/editableFieldComponent'], function () {
        return contactController;
    });
})();