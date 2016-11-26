(function() {
    function editableFieldController() {
        //ref: https://docs.angularjs.org/guide/component
        
		var vm = this

        vm.editMode = false

        vm.handleModeChange = () => {
            if (vm.editMode) {
                vm.onUpdate({value: vm.fieldValue})
                vm.fieldValueCopy = vm.fieldValue
            }
            vm.editMode = !vm.editMode
        }

        vm.reset = () => {
            vm.fieldValue = vm.fieldValueCopy
        }

        vm.$onInit = () => {
            vm.fieldValueCopy = vm.fieldValue

            if (!vm.fieldType)
                vm.fieldType = 'text'
        }
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