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
            vm.data.categories = []
            DBService.list('ContactCategory').then((list) => {
                list.forEach((e, i) => {
                    if (e.contact_id == vm.data.id)
                        DBService.getById('Category', e.category_id).then((cat) => {
                            if (cat.length > 0)
                                vm.data.categories.push(cat[0])
                        })
                })
            }).then(() => {
                setTimeout(() => {
                    $scope.$apply()
                }, 100)
            })
        }

		vm.favorite = contact => { 
			contact.starred = !contact.starred
			DBService.update('Contact', contact.id, contact)
				.then(() => {})
		}

        vm.openCategoryMenu = contact => {
            DBService.list('Category').then((list) => {
                list.forEach((e, i) => {
                    if (contact.categories.includes(e))
                        list.slice(i, 1)
                })
                vm.categoriesMenu = list
            })
        }

        vm.addCategory = (contact, category) => {

            DBService.list('ContactCategory').then((list) => {
                //console.log(list)
                if (list.length == 0)
                    return Promise.resolve(category)
                    
                let catRes;

                list.forEach((e, i) => {
                    console.log(e, contact.id, category.id)
                    if (e.category_id != category.id && e.contact_id == contact.id) {
                        if (contact.categories.includes(category)) {
                            catRes = category
                            return
                        }
                    }
                                
                })
                return Promise.resolve(catRes)
            }).then((category) => {
                // console.log(category)

                let contactCategory = {
                    'contact_id': contact.id,
                    'category_id': category.id 
                }

                DBService.add('ContactCategory', contactCategory).then((r) => {
                    contact.categories.push(category)
                })
                //, (data) => { console.info(`No category found ${data}`) }
            }).then(() => {
                $scope.$apply()
            })
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