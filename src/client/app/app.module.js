(function() {

    'use strict';

    angular.module('app', [
        /* Shared modules */
        'app.core',
        'app.widgets',

        /* Feature areas */
        'app.payroll',
        'app.contracts',
        'app.organizations',
        'app.dashboard',
        'app.layout',
        'app.profile',
        'app.admin'
    ]);

})();
