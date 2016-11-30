(function () {
  'use strict';

  angular
    .module('app.payroll')
    .directive('duplicatePayroll', function() {
      return {
        restrict: 'E',
        controller: DuplicatePayrollCtrl,
        controllerAs: 'ctrl',
        templateUrl: 'app/payroll/components/duplicate-payroll/duplicate-payroll.html'
      };
    });

  /* @ngInject */
  function DuplicatePayrollCtrl($state, $stateParams, $scope, logger, payrollsResource) {
    var that = this;
    that.scope = $scope;
    that.scope.week_end = $state.params.weekEnd;
    that.scope.contractNum = $state.params.contractNum;
    that.scope.entry = 'last_week';
    that.scope.payrolls = [];
    that.scope.payroll_id = 0;

    if ($stateParams.payroll) {
      that.scope.payrolls.push($stateParams.payroll);
      that.scope.entry = 'other_week';
      that.scope.payroll_id = $stateParams.payroll.id;
      that.scope.selectedPayroll = $stateParams.payroll.id;

    } else {
      payrollsResource.recent({contract: that.scope.contract_num}, function(payrolls){
        if(payrolls && payrolls.length) {
          Array.prototype.push.apply(that.scope.payrolls, payrolls);
        }
      });
    }

    that.scope.duplicate = function() {
      var error = function() {
        logger.error('Error duplicating payroll');
      };
      var success = function(result) {
        logger.info('Payroll duplicated successfully');
        $state.go('payroll.edit.reviews-hours-and-earnings', {id: result.id});
      };

      if (that.scope.entry === 'last_week') {
        that.scope.payroll_id = that.scope.payrolls[0].id;
        payrollsResource.duplicate({ did:  that.scope.payroll_id}, { week_end: that.scope.week_end }, success, error);
      }
      else {
        payrollsResource.duplicate({ did: that.scope.payroll_id }, { week_end: that.scope.week_end }, success, error);
      }

    };

    that.scope.duplicateOther = function(){
      that.scope.entry = 'other_week';
    };

   }

})();
