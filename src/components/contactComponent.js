(function() {
    function contactController(DBService, dialogService, $state, $scope) {
		var vm = this;

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
                            dialogService.showMessage(title, msg).then(() => {
                            }).then(() => { $state.reload() })
                        })

                }
            })
        }

        loadCategories = () => {
            DBService.list('Category').then((list) => {
                vm.data.categories = list
                $scope.$apply()
            })
        }

		vm.favorite = contact => { 
			contact.starred = !contact.starred
			DBService.update('Contact', contact.id, contact)
				.then(() => {})
		}

        loadCategories()
    }

    require(['app'], function(app) {
        app.component('contact', {
			templateUrl: '/src/components/templates/contactTemplate.html',
			controller: contactController,
			controllerAs: 'contact',
			bindings: {
				data: '='
			}
		});
    })

    define(['app', 'services/dbService', 'services/dialogService', 'components/categoryComponent'], function() { return contactController })
})()