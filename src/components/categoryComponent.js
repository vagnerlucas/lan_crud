(function() {
    function categoryController(DBService, dialogService, $state, $scope) {
		var vm = this

        let canUpdate = category => {
            return DBService.getSchema('Category').then((schema) => {
                const query =
                    lf.op.and(schema.id.neq(category.id), schema.name.eq(category.name))
                return DBService.executeQuery(schema, query).then((check) => {
                    return check.length === 0
                })
            })
        }

        vm.update = (category, prop, value) => {
            if (prop === 'name') {
                let tmpName = category.name
                category[prop] = value
                Promise.resolve(canUpdate(category)).then((r) => {
                    if (!r) {
                            category[prop] = tmpName
                            const msg = 'Can\'t update the category name field'
                            const title = 'Error'
                            return dialogService.showMessage(title, msg).then(() => {}).then(() => {
                                return Promise.reject(false)
                            })
                    }
                }).then((s) => {
                    category[prop] = value
                    DBService.update('Category', category.id, category)
                        .then(() => { $scope.$apply() })    
                })
            }
            else {
                category[prop] = value
                DBService.update('Category', category.id, category)
                    .then(() => { $scope.$apply() })
            }
        }

		vm.remove = ($event, id) => {
            const title = 'Are you sure?'
            const msg = 'You are about to remove the category'
            const yes = 'Go ahead'
            dialogService.openConfirmDialog($event, title, msg, yes).then((f) => {
                if (f) {
                    DBService.del('Category', id).then((r) => {
                        return Promise.resolve(true)
                    },
                        (e) => {
                            return Promise.reject(false)
                        })
                        .then(() => {
                            const msg = 'Category removed'
                            const title = 'Done'
                            dialogService.showMessage(title, msg).then(() => {
                            }).then(() => { $state.reload() })
                        })

                }
            })
        }
    }

    require(['app'], function(app) {
        app.component('category', {
			templateUrl: '/src/components/templates/categoryTemplate.html',
			controller: categoryController,
			controllerAs: 'category',
			bindings: {
				data: '=',
                hideButtons: '=',
                hideText: '='
			}
		});
    })

    define(['app', 'services/dbService', 'services/dialogService', 'components/editableFieldComponent'], function() { return categoryController })
})()