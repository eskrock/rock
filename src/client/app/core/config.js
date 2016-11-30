(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    core.config(function ($analyticsProvider) {
        $analyticsProvider.virtualPageviews(true);
    });

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        apiServiceBaseUri: 'http://localhost:8000/api',
        appErrorPrefix: '[CPA Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Certified Payroll',
        imageBasePath: '/img/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$compileProvider', '$logProvider',
         'diagnostics', 'exceptionHandlerProvider', 'routerHelperProvider', '$authProvider'];
    /* @ngInject */
    function configure ($compileProvider, $logProvider,
         diagnostics, exceptionHandlerProvider, routerHelperProvider, $authProvider) {

        diagnostics.enable = false;

        $compileProvider.debugInfoEnabled(true);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        configureStateHelper();

        ///////////////

        $authProvider.google({
          url: config.apiServiceBaseUri + '/auth/google',
          clientId: '852312905038-trs0d3p942ug5aehqf843ups3rl5b371.apps.googleusercontent.com',
          redirectUri: window.location.origin + '/login/oauth'
        });

        // No additional setup required for Twitter

        $authProvider.oauth2({
          name: 'CLOUD_GOV',
          url: config.apiServiceBaseUri + '/auth/cloud_gov',
          defaultUrlParams: ['response_type', 'client_id', 'redirect_uri', 'state'],
          clientId: '852312905038-trs0d3p942ug5aehqf843ups3rl5b371',
          state: function () { return encodeURIComponent(Math.random().toString(36).substr(2)); },
          redirectUri: window.location.origin + '/login/oauth',
          authorizationEndpoint: 'http://localhost:8080/oauth/authorize'
        });


        ////////////////

        function configureStateHelper() {
            var resolveAlways = { /* @ngInject */
                ready: function(dataservice) {
                    return dataservice.ready();
                }
            };

            routerHelperProvider.configure({
                docTitle: 'Certified Payroll: ',
                resolveAlways: resolveAlways
            });
        }
    }
})();
