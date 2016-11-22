(function() {
    function editableFieldController() {
		var vm = this;
    }

    require(['app'], function(app) {
        app.component('editableField', {
			templateUrl: '/src/components/templates/editableFieldTemplate.html',
			controller: editableFieldController,
			controllerAs: 'field',
			bindings: {
				fieldValue: '<',
                fieldType: '@?',
                onUpdate: '&'
			}
		});
    })

    define(['app'], function() { return editableFieldController })
})()