(function() {
    function editableFieldController() {
        //ref: https://docs.angularjs.org/guide/component

		var vm = this

        vm.editMode = false

        vm.handleModeChange = () => {
            console.log(vm.showEditButton)
            if (vm.editMode) {
                vm.onUpdate({value: vm.fieldValue})
                vm.fieldValueCopy = vm.fieldValue
            }
            //vm.keepEdit = !vm.keepEdit
            vm.showEditButton = false
            vm.editMode = !vm.editMode
        }

        vm.reset = () => {
            vm.fieldValue = vm.fieldValueCopy
            vm.editMode = !vm.editMode
            //vm.keepEdit = !vm.keepEdit
        }

        vm.$onInit = () => {
            vm.fieldValueCopy = vm.fieldValue
            vm.showEditButton = false

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