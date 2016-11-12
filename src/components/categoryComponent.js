(function() {
    function categoryController(DBService, dialogService, $state) {
		var vm = this;

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
				id: '=',
				name: '=',
				description: '=',
				picture: '=',
			}
		});
    })

    define(['app', 'services/dbService', 'services/dialogService'], function() { return categoryController })
})()