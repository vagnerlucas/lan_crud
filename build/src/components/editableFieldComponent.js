'use strict';

(function () {
    function editableFieldController() {
        //ref: https://docs.angularjs.org/guide/component

        var vm = this;

        vm.editMode = false;

        vm.handleModeChange = function () {
            if (vm.editMode) {
                vm.onUpdate({ value: vm.fieldValue });
                vm.fieldValueCopy = vm.fieldValue;
            }
            vm.showEditButton = false;
            vm.editMode = !vm.editMode;
        };

        vm.reset = function () {
            vm.fieldValue = vm.fieldValueCopy;
            vm.editMode = !vm.editMode;
        };

        vm.$onInit = function () {
            vm.fieldValueCopy = vm.fieldValue;
            vm.showEditButton = false;

            if (!vm.fieldType) vm.fieldType = 'text';
        };
    }

    require(['app'], function (app) {
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
    });

    define(['app'], function () {
        return editableFieldController;
    });
})();