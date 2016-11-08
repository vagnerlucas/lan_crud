(function() {
    function contactController(DBService) {
		var vm = this;
		vm.fav = false;
		
		vm.favorite = contact => { 

		 }
    }

    require(['app'], function(app) {
        app.component('contact', {
			templateUrl: '/src/components/templates/contactTemplate.html',
			controller: contactController,
			controllerAs: 'contact',
			bindings: {
				id: '=',
				name: '=',
				description: '=',
				email: '=',
				birthdate: '=',
				picture: '='
			}
		});
    })

    define(['app', 'services/dbService'], function() { return contactController })
})()