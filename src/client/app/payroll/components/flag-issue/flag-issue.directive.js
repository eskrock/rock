(function () {
    'use strict';

    angular
        .module('app.payroll')
        .directive('flagIssue', FlagIssueDirective);

    /* @ngInject */
    function FlagIssueCtrl($state, $scope, logger, payrollFlagIssueResource, FlagIssueModel) {
        var that = this;
        that.scope = $scope;
        var pay_details = that.scope.payrollDetails.pay_details[0];
        that.scope.flag = new FlagIssueModel();
        if (that.scope.flagType !== 'deductions') {
          that.scope.flag.type = 'HOURS_AND_EARNINGS';
          if (pay_details.pay_flags.length > 0) {
            that.scope.flag.comments = pay_details.pay_flags[0].comments;
          }
        } else {
          that.scope.flag.type = 'DEDUCTION';
          if (pay_details.deduction_flags.length > 0) {
            that.scope.flag.comments = pay_details.deduction_flags[0].comments;
          }
        }

        activate();

        function activate() {
          logger.info('Activated flag issue');
        }

        that.scope.goBack = function() {
          if (that.scope.flagType === 'deductions') {
            $state.go('payroll.edit.review-deductions', {id: that.scope.payrollDetails.id}, {reload: true});
          } else {
            $state.go('payroll.edit.reviews-hours-and-earnings', {id: that.scope.payrollDetails.id}, {reload: true});
          }
        };

        that.scope.save = function() {
          var error = function(){ logger.error('Error flagging an issue'); };
          var success = function(result) {
            logger.info('flagging signed successfully');
            that.scope.goBack();
          };
          var payrollDetails = that.scope.payrollDetails;
          payrollFlagIssueResource.create({
              pid: payrollDetails.id,
              id: payrollDetails.pay_details[0].id
            }, that.scope.flag, success, error);
        };

        that.scope.getNetWagesPaid = function(pay_details) {
          return getWorkerRegTotal(pay_details) * num(pay_details.rate_reg) +
          getWorkerOTTotal(pay_details) * num(pay_details.rate_ot) -
          num(pay_details.total_other);
        };

        function getWorkerRegTotal(pay_details) {
          var straightHours =
            num(pay_details.reg1) + num(pay_details.reg2) + num(pay_details.reg3) +
            num(pay_details.reg4) + num(pay_details.reg5) + num(pay_details.reg6) + num(pay_details.reg7);

          return straightHours;
        }

        function getWorkerOTTotal(pay_details) {
          var overtimeHours =
            num(pay_details.ot1) + num(pay_details.ot2) + num(pay_details.ot3) +
            num(pay_details.ot4) + num(pay_details.ot5) + num(pay_details.ot6) + num(pay_details.ot7);

          return overtimeHours;
        }

        function num(val) { return val && !isNaN(val) ? parseFloat(val, 10) : 0; }

    }

    function FlagIssueDirective() {
      return {
        restrict: 'E',
        controller: FlagIssueCtrl,
        controllerAs: 'controller',
        scope: {
          flagType: '=flagType',
          mode: '=mode',
          payrollDetails: '=payrollDetails'
        },
        templateUrl: 'app/payroll/components/flag-issue/views/flag-issue.html'
      };
    }

})();
