(function () {
  'use strict';

  angular
    .module('app.payroll')
    .directive('noWorkPayroll', function() {
      return {
        restrict: 'E',
        controller: NoWorkPayrollCtrl,
        controllerAs: 'ctrl',
        templateUrl: 'app/payroll/components/no-work/no-payroll.html',
        scope: {
          payroll: '<',
          org: '<'
        }
      };
    });

  /* @ngInject */
  function NoWorkPayrollCtrl($state, $stateParams, $scope, dataservice, logger, moment, $interpolate) {
    var that = this;
    that.scope = $scope;
    that.scope.contractNum = $state.params.contractNum;

    that.scope.certify = function() {
      $state.go('payroll.edit.sign-certify', {id: that.scope.payroll.id});
    };
  }
})();
