require.config({
    baseUrl: '/lan_crud/src/',
    paths: {
        'angular': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min'],
        'angular-animate': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.min'],
        'angular-aria': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-aria.min'],
        'angular-messages': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-messages.min'],
        'angular-material': ['//cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.1/angular-material.min'],
        //'angular-locale-br': ['////cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.5.8/angular-locale_pt-br.min'],
        'ui-router': ['//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min'],
        'lovefield': ['//cdnjs.cloudflare.com/ajax/libs/lovefield/2.1.10/lovefield.min'],
        'ng-flow': ['//cdnjs.cloudflare.com/ajax/libs/ng-flow/2.7.4/ng-flow-standalone.min'],
        // 'fusty-flow': ['//cdnjs.cloudflare.com/ajax/libs/ng-flow/2.7.4/ng-flow.min'],
        'fusty-flow-factory': ['//cdn.jsdelivr.net/fusty-flow.js/1.0.0b3/fusty-flow-factory'],
        'angularAMD': ['../public/js/angularAMD.min']
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-animate': ['angular'],
        'angular-aria': ['angular'],
        'angular-messages': ['angular'],
        'fusty-flow-factory': ['angular'],
        'angular-material': { deps: ['angular', 'angular-animate', 'angular-aria', 'angular-messages'] },
        //'angular-locale-br': ['angular'],
        'ui-router': ['angular'],
        'angularAMD': ['angular'],
        'ng-flow': { 
            exports: 'ng-flow',
            deps: ['angular', 'fusty-flow-factory']
        }
    },
    deps: ['angular', 'app']
})

require(['angular-material', 'lovefield', 'app'], function() {})
