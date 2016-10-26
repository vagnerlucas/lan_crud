(function () {

    function dialogService($mdDialog) {
        let vm = this

        vm.openConfirmDialog = ($event, title, msg, yes, no) => {
            yes = yes || 'Yes'
            no = no || 'No'
            const confirm = $mdDialog.confirm().title(title).textContent(msg).ok(yes).cancel(no).targetEvent($event)
            return $mdDialog.show(confirm)
        }

        vm.showMessage = (title, msg, ok) => {
            title = title || 'Alert'
            ok = ok || 'Ok'
            const alert = $mdDialog.alert().title(title).textContent(msg).ok(ok)
            return $mdDialog.show(alert)
        }
    }

    require(['app'], function (app) {
        app.service('dialogService', dialogService)
    })

    define(['app', 'services/dbService'], function () {
        return dialogService
    })

})()