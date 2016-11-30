(function() {
    'use strict';

    angular
        .module('app.payroll')
        .service('payrollsResource', resourceService().getPayrollsResource)
        .service('payrollItemsResource', resourceService().getPayrollItemsResource)
        .service('payrollWorkerResource', resourceService().getPayrollWorkerResource)
        .service('payrollDeductionsResource', resourceService().getPayrollDeductionResource)
        .service('payrollCertResource', resourceService().getPayrollCertificationResource)
        .service('payrollDuplicateResource', resourceService().getPayrollDuplicate)
        .service('payrollResource', resourceService().getPayrolls)
        .service('payrollReviewResource', resourceService().getPayrollReviewResource)
        .service('payrollFlagIssueResource', resourceService().getPayrollFlagIssueResource)
        .service('feedbackResource',resourceService().getFeedbacksResource);

    /* @ngInject */
    function resourceService(config, $resource, logger) {
        var service = {
            getPayrollsResource: getPayrollsResource,
            getPayrollItemsResource: getPayrollItemsResource,
            getPayrollWorkerResource: getPayrollWorkerResource,
            getPayrollDeductionResource: getPayrollDeductionResource,
            getPayrollCertificationResource: getPayrollCertificationResource,
            getPayrollDuplicate: getPayrollDuplicate,
            getPayrolls:getPayrolls,
            getPayrollReviewResource: getPayrollReviewResource,
            getPayrollFlagIssueResource: getPayrollFlagIssueResource,
            getFeedbacksResource: getFeedbacksResource
        };

        // payrolls/
        // payrolls/:id/
        function getPayrollsResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls/:id/';
            var r = $resource(url, {}, {
                'get': { method: 'GET', params: { id: '@id' }},
                'recent': { method: 'GET', params: { limit: 10 }, isArray: true },
                'create': { method: 'POST', url: url },
                'update': { method: 'PUT', params: { id: '@id' }},
                'duplicate': { method: 'POST', params: { did: '@did' }, url: url + '?source=/payrolls/:did' },
                'getOtherDeductions': {
                    method: 'GET',
                    url: url + 'other_deductions',
                    isArray: true,
                    params: { id: '@id' }
                  }
            });

            return r;
        }

        function getPayrollItemsResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls/:pid/items/:id';
            var r = $resource(url, {}, {
                'get': { method: 'GET', params: { pid: '@pid', id: '@id' }},
                'create': { method: 'POST', params: { pid: '@pid' } },
                'update': { method: 'PUT', params: { pid: '@pid', id: '@id'  } }
            });

            return r;
        }

        function getPayrollWorkerResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls/:pid/worker/:id/';
            var r = $resource(url, {}, {
                'get': { method: 'get', params: { pid: '@pid', id: '@id' } },
            });

            return r;
        }

        function getPayrollDeductionResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls/:pid/deductions/:id/';
            var r = $resource(url, {}, {
                'get': { method: 'get', params: { pid: '@pid', id: '@id' } },
            });

            return r;
        }

        function getPayrollCertificationResource(config, $resource) {
          var url = config.apiServiceBaseUri + '/payrolls/:pid/certification';
          var r = $resource(url, {}, {
              'get': { method: 'get', params: { pid: '@pid'} },
              'certify': { method: 'POST', params: { pid: '@payroll_id'} },
          });

          return r;
        }

        function getPayrollDuplicate(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls/:id/duplicate';
            var r = $resource(url, {}, {
                'get': { method: 'GET', params: { id: '@id' }},
                'create': { method: 'POST', url: url }
            });

            return r;
        }

        function getPayrolls(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls';
            var r = $resource(url, {}, {
                'get': { method: 'GET', isArray:true},
            });

            return r;
        }

        function getPayrollReviewResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls/:id/review/';
            var r = $resource(url, {}, {
                'get': { method: 'GET', params: { id: '@id' }},
            });

            return r;
        }

        function getPayrollFlagIssueResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/payrolls/:pid/items/:id/flag_issue';
            var r = $resource(url, {}, {
                'create': { method: 'POST', params: { pid: '@pid', id: '@id' }}
            });

            return r;
        }

        function getFeedbacksResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/feedbacks/:pid/';
            var r = $resource(url, {}, {
                'create': { method: 'POST', url: url },
                'get': { method: 'GET', params: { id: '@id' }}
            });

            return r;
        }

        return service;
    }
})();
