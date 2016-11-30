(function() {
    'use strict';

    angular
        .module('app.payroll')
        .service('payrollActivitiesResource', resourceService().getPayrollActivitiesResource);

    /* @ngInject */
    function resourceService(config, $resource, logger) {
        var service = {
            getPayrollActivitiesResource: getPayrollActivitiesResource
        };

        // payrolls/activity
        function getPayrollActivitiesResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls/:id/activity';
            var r = $resource(url, {}, {
                'list': { method: 'GET', params: {limit: 1024, include: 'flags'}, isArray: true },
                'get': { method: 'GET', params: { id: '@id' }},
                'sendPayrolls': { method: 'POST' }
            });

            return r;
        }

        return service;
    }
})();
