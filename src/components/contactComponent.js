(function() {
    function contactController(DBService, dialogService, $state) {
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

		vm.favorite = contact => { 
			contact.starred = !contact.starred
			DBService.update('Contact', contact.id, contact)
				.then(() => {})
		}
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

    define(['app', 'services/dbService', 'services/dialogService'], function() { return contactController })
})()