(function() {
    'use strict'

    const app = function(angularAMD, angular, uiRouter, material, animate, messages, /* localeBR, */ ngFlow, config, init, dbProvider, dbService, dialogService, MenuController) {

        const a = angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'flow'])
                       .provider('db', dbProvider)
                       .config(config)
                       .service('DBService', dbService)
                       .service('dialogService', dialogService)
                       .controller('MenuController', MenuController)
                       .run(init)

        return angularAMD.bootstrap(a);
    }

    define(['angularAMD', 
            'angular', 
            'ui-router',
            'angular-material', 
            'angular-animate', 
            'angular-messages',
            //'angular-locale-br',
            'ng-flow',
            'config', 
            'init', 
            'providers/dbProvider', 
            'services/dbService',
            'services/dialogService',
            'controllers/MenuController'], app)
})()