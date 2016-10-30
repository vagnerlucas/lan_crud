(function() {
    function contactController() {

		var vm = this;
		vm.test = 'xadawS';
		
		vm.fav = false;
		
		vm.click = () => { vm.fav = !vm.fav }
    }

    require(['app'], function(app) {
        app.component('contact', {
			templateUrl: '/app/components/templates/contactTemplate.html',
			controller: contactController,
			controllerAs: 'contact',
			bindings: {
				id: '=',
				name: '='
			}
		});
    })



    define(['app'], function() { return contactController })

})()