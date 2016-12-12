'use strict';

(function () {
    'use strict';

    var app = function app(angularAMD, angular, uiRouter, material, messages, /* localeBR, */ngFlow, config, init, dbProvider, MenuController) {

        var a = angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'flow']).provider('db', dbProvider).config(config).controller('MenuController', MenuController).run(init);

        return angularAMD.bootstrap(a);
    };

    define(['angularAMD', 'angular', 'ui-router', 'angular-animate', 'angular-messages',
    //'angular-locale-br',
    'ng-flow', 'config', 'init', 'providers/dbProvider', 'controllers/MenuController'], app);
})();