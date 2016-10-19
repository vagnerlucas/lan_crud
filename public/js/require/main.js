require.config({
    baseUrl: '../../src/',
    paths: {
        'angular': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min'],
        'angular-animate': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.min'],
        'angular-aria': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-aria.min'],
        'angular-messages': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-messages.min'],
        'angular-material': ['//cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.1/angular-material.min'],
        'ui-router': ['//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min'],
        'lovefield': ['//cdnjs.cloudflare.com/ajax/libs/lovefield/2.1.10/lovefield.min'],
        'angularAMD': ['/public/js/angularAMD.min']
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-animate': ['angular'],
        'angular-aria': ['angular'],
        'angular-messages': ['angular'],
        'angular-material': { deps: ['angular', 'angular-animate', 'angular-aria', 'angular-messages'] },
        'ui-router': ['angular'],
        'angularAMD': ['angular']
    },
    deps: ['app']
})

require(['angular-material', 'lovefield', 'app'], function() {})