(function () {

    'use strict'

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

        vm.showCustomDialog = (options) => {
            const title = options.title
            const ok = options.ok || 'Ok'
            const cancel = options.cancel || 'Cancel'
            let dlgOpts = options.dlgOpts
            
            if (!dlgOpts)
                return Promise.reject('No dialog options found')

            return $mdDialog.show(dlgOpts)
        }

        vm.close = () => {
            $mdDialog.close()
        }

        vm.cancel = () => {
            $mdDialog.cancel()
        }
    }

    require(['app'], function (app) {
        app.service('dialogService', dialogService)
    })

    define(['app', 'services/dbService'], function () {
        return dialogService
    })

})()