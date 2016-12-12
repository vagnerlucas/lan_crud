'use strict';

(function () {

    'use strict';

    function dialogService($mdDialog) {
        var vm = this;

        vm.openConfirmDialog = function ($event, title, msg, yes, no) {
            yes = yes || 'Yes';
            no = no || 'No';
            var confirm = $mdDialog.confirm().title(title).textContent(msg).ok(yes).cancel(no).targetEvent($event);
            return $mdDialog.show(confirm);
        };

        vm.showMessage = function (title, msg, ok) {
            title = title || 'Alert';
            ok = ok || 'Ok';
            var alert = $mdDialog.alert().title(title).textContent(msg).ok(ok);
            return $mdDialog.show(alert);
        };

        vm.showCustomDialog = function (options) {
            var title = options.title;
            var ok = options.ok || 'Ok';
            var cancel = options.cancel || 'Cancel';
            var dlgOpts = options.dlgOpts;

            if (!dlgOpts) return Promise.reject('No dialog options found');

            return $mdDialog.show(dlgOpts);
        };

        vm.close = function () {
            $mdDialog.close();
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };
    }

    require(['app'], function (app) {
        app.service('dialogService', dialogService);
    });

    define(['app', 'services/dbService'], function () {
        return dialogService;
    });
})();