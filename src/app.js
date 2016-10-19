(function() {
    'use strict'

    const app = function(angularAMD, angular, uiRouter, material, messages, config, init, dbProvider, MenuController) {

        const a = angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages'])
                       .provider('db', dbProvider)
                       .config(config)
                       .controller('MenuController', MenuController)
                       .run(init)

        return angularAMD.bootstrap(a);
    }

    define(['angularAMD', 'angular', 'ui-router', 'angular-animate', 'angular-messages', 'config', 'init', 'providers/dbProvider', 'controllers/MenuController'], app)
})()