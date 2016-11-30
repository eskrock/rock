(function() {

    angular
        .module('app.organizations')
        .run(appRun);

    var _base = {
        organizationViewController: {
            controllerAs: 'c',
            controller: ['$scope', '$state', 'contracts', function($scope, $state, contracts){
                var that = this;
                that.contracts = contracts;
            }]
        }
    };

    var _resolve = {
        /* @ngInject */
        organizationContracts: ['organizationResource', '$q', '$stateParams',
          function(organizationResource, $q, $stateParams) {
            var deferred = $q.defer();
            var success = function(data) { deferred.resolve(data); };
            var error = function(error) { deferred.reject('error'); };
            organizationResource.contracts({id: $stateParams.id },success, error);
            return deferred.promise;
        }],
        /* @ngInject */
        organizationPayrolls: ['payrollActivitiesResource', '$q', '$stateParams',
          function(payrollActivitiesResource, $q, $stateParams) {
          var deferred = $q.defer();
          var success = function(data) { deferred.resolve(data); };
          var error = function(error) { deferred.reject('error'); };
          payrollActivitiesResource.list({org: $stateParams.id, contract: $stateParams.contractNum},success, error);
          return deferred.promise;
        }]
    };

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
    function getStates() {
        return [
            {
                state: 'organization',
                config: {
                    abstract: true,
                    template: '<ui-view/>',
                    url: '/organization/:id',
                    data: {
                        requireLogin: true
                    }
                }
            },
            {
                state: 'organization.profile',
                config: angular.extend({
                    url: '/profile',
                    template: '<organization-profile contracts="c.contracts"></organization-profile>',
                    title: 'View Organization Profile',
                    controllerAs: 'c',
                    /* @ngInject */
                    controller: ['$scope', '$state', '$stateParams', 'contracts',
                      function($scope, $state, $stateParams, contracts) {
                        var that = this;
                        that.contracts = contracts;
                    }],
                    resolve: {
                        contracts: _resolve.organizationContracts
                    }
                })
            },
            {
                state: 'organization.payrolls',
                config: angular.extend({
                    url: '/contracts/:contractNum/payrolls',
                    templateUrl: 'app/organizations/components/organization-payrolls/views/organization-payrolls.html',
                    title: 'View Organization Payrolls',
                    controllerAs: 'c',
                    controller: 'organizationPayrolls',
                    resolve: {
                        payrolls: _resolve.organizationPayrolls
                    }
                })
            }
        ];
    }
})();
