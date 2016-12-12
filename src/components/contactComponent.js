(function () {
    function contactController(DBService, dialogService, $state, $scope) {
        var vm = this

        vm.remove = ($event, id) => {
            const title = 'Are you sure?'
            const msg = 'You are about to remove the contact'
            const yes = 'Go ahead'
            dialogService.openConfirmDialog($event, title, msg, yes).then((f) => {
                if (f) {
                    DBService.del('Contact', id).then((r) => {
                                return Promise.resolve(true)
                            },
                            (e) => {
                                return Promise.reject(false)
                            })
                        .then(() => {
                            const msg = 'Contact removed'
                            const title = 'Done'
                            dialogService.showMessage(title, msg).then(() => {}).then(() => {
                                $state.reload()
                            })
                        })

                }
            })
        }

        const loadCategories = () => {
            vm.data.categories = []

            DBService.getSchema('ContactCategory').then((schema) => {
                const query = schema.contact_id.eq(vm.data.id)

                //TODO add new function for join tables
                DBService.executeQuery(schema, query).then((list) => {
                        list.forEach((e) => {
                            DBService.getById('Category', e.category_id).then((cat) => {
                                vm.data.categories.push(cat[0])
                            })
                        })
                    }, (e) => console.error(e))
                    .then(() => {
                        setTimeout(() => {
                            $scope.$apply()
                        }, 100)
                    })
            })
        }

        const canUpdateEmail = contact => {
            return DBService.getSchema('Contact').then((schema) => {
                const query =
                    lf.op.and(schema.id.neq(contact.id), schema.email.eq(contact.email))
                return DBService.executeQuery(schema, query).then((check) => {
                    return check.length === 0
                })
            })
        }

        vm.update = (contact, prop, value) => {

            if (prop === 'email') {
                let tmpEmail = contact.email
                contact[prop] = value
                Promise.resolve(canUpdateEmail(contact))
                    .then((r => {
                        if (!r) {
                            contact[prop] = tmpEmail
                            const msg = 'Can\'t update the email field'
                            const title = 'Error'
                            return dialogService.showMessage(title, msg).then(() => {}).then(() => {
                                return Promise.reject(false)
                            })
                        }
                    })).then((s) => {
                        DBService.update('Contact', contact.id, contact)
                            .then(() => { $scope.$apply()
                    })
                    }, (e) => { })
            } else {
                contact[prop] = value
                DBService.update('Contact', contact.id, contact)
                    .then(() => {
                        $scope.$apply()
                    })
            }
        }

        vm.favorite = contact => {
            vm.update(contact, 'starred', !contact.starred)
        }

        vm.openCategoryMenu = contact => {
            DBService.list('Category').then((list) => {
                contact.categories.forEach((e, j) => {
                    list.forEach((el, i) => {
                        if (el.id == e.id) {
                            list.splice(i, 1)
                        }
                    })
                })

                return Promise.resolve(list);
            }).then(list => {
                vm.categoriesMenu = list
            })
        }

        vm.removeCategory = (contact, category) => {
            DBService.getSchema('ContactCategory').then((schema) => {
                const query = lf.op.and(schema.contact_id.eq(contact.id), schema.category_id.eq(category.id))
                DBService.executeQuery(schema, query).then((toRemove) => {
                    DBService.del('ContactCategory', toRemove[0].id).then(() => {
                        contact.categories.splice(contact.categories.indexOf(category), 1)
                        vm.categoriesMenu.push(category)
                        $scope.$apply()
                    })
                })
            });
        }

        vm.addCategory = (contact, category) => {

            DBService.list('ContactCategory').then((list) => {
                if (list.length == 0)
                    return Promise.resolve(category)

                if (contact.categories.length == 0)
                    return Promise.resolve(category)

                let catRes;

                contact.categories.forEach((el, i) => {
                    if (el.id != category.id) {
                        catRes = category
                        return
                    }
                })

                return Promise.resolve(catRes)
            }).then((category) => {
                if (category != null) {
                    let contactCategory = {
                        'contact_id': contact.id,
                        'category_id': category.id
                    }

                    DBService.add('ContactCategory', contactCategory).then((r) => {
                        contact.categories.push(category)
                        vm.categoriesMenu.splice(vm.categoriesMenu.indexOf(category), 1)
                    })
                }
            }).then(() => {
                $scope.$apply()
            })
        }

        vm.$onInit = () => {
            loadCategories()
        }
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
    })

    define(['app', 'services/dbService', 'services/dialogService', 'components/categoryComponent', 'components/editableFieldComponent'], function () {
        return contactController
    })
})()