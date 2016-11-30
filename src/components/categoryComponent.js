(function() {
    function categoryController(DBService, dialogService, $state, $scope) {
		var vm = this

        vm.update = (category, prop, value) => {
            category[prop] = value
            DBService.update('Category', category.id, category)
				.then(() => { $scope.$apply() })
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