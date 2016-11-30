(function() {
    'use strict';

    angular
        .module('app.core', [
            /* Angular modules */
            'ngAnimate',
            'ngSanitize',
            'angular.filter',
            /* Cross-app modules */
            'blocks.diagnostics',
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            'blocks.utils',

            /* 3rd-party modules */
            'ui.router',
            'ngResource',
            'satellizer',
            'angularFileUpload',
            'angulartics.google.analytics',
        ]);

})();
