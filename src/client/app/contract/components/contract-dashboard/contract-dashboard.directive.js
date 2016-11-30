(function () {
    'use strict';

    angular
        .module('app.contracts')
        .directive('contractDashboard', ContractDashboardDirective);

    /* @ngInject */
    function ContractDashboardCtrl($state,$scope, logger) {
        var that = this;
        that.scope = $scope;

        activate();

        function activate() {
          logger.info('Dashboard View Activated');
        }
    }

    function ContractDashboardDirective() {
      return {
        restrict: 'E',
        transclude: true,
        controller: ContractDashboardCtrl,
        controllerAs: 'controller',
        scope: {
          contracts: '=contracts'
        },
        templateUrl: 'app/contract/components/contract-dashboard/views/contract-dashboard.html'
      };
    }
})();
