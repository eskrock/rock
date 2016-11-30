(function () {
  'use strict';

  angular
    .module('app.payroll')
    .directive('newPayroll', function() {
      return {
        restrict: 'E',
        controller: NewPayrollCtrl,
        controllerAs: 'ctrl',
        templateUrl: 'app/payroll/components/new-payroll/new-payroll.html',
        scope: {
          contracts: '<'
        }
      };
    });

  /* @ngInject */
  function NewPayrollCtrl($state, $scope, $rootScope, logger, utils,
    moment, $interpolate, PayrollModel, payrollsResource) {
    var that = this;
    that.scope = $scope;
    that.scope.payroll = new PayrollModel();
    that.scope.entry_method = 'manual_entry';
    var defaultDate = moment().endOf('week');

    that.scope.endDateMonth = defaultDate.format('MM');
    that.scope.endDateDay = defaultDate.format('DD');
    that.scope.endDateYear = defaultDate.format('YYYY');
    that.scope.$watch('endDateMonth', function() { updateEndDate(); });
    that.scope.$watch('endDateDay', function() { updateEndDate(); });
    that.scope.$watch('endDateYear', function() { updateEndDate(); });

    function updateEndDate() {
      var endDate = moment(
        $interpolate('{{endDateMonth}}/{{endDateDay}}/{{endDateYear}}')(that.scope),
        'M/D/YYYY',
        true
      );
      if (endDate.isValid()) {
        that.scope.endDate = endDate.format('YYYY-MM-DD');
      } else {
        that.scope.endDate = '';
      }
    }

    that.scope.create = function() {
      var payroll;
      if(that.scope.entry_method === 'manual_entry' ||
        that.scope.entry_method === 'no_work_entry') {
        payroll = that.scope.payroll;
        payroll.week_end = that.scope.endDate;
        payroll.status = 'new';
        payroll.organization_id = $rootScope.currentUser.organization_id;
        payroll.contract_num = payroll.contract_id.num;
        payroll.contract_id = payroll.contract_id.id;
        payroll.no_work = that.scope.entry_method === 'no_work_entry';

        var error = function(){ logger.error('Error creating payroll'); };
        var success = function(result) {
          logger.info('Payroll created successfully');
          if(payroll.no_work) {
            $state.go('payroll.edit.no-work', {
              id: result.id,
              cnum: payroll.contract_num,
              org:  payroll.organization_id
            });

          } else {
            $state.go('payroll.edit.worker-detail', {
              id: result.id,
              cnum: payroll.contract_num,
              org:  payroll.organization_id
            });
          }
        };

        payrollsResource.create(payroll, success, error);

      } else if(that.scope.entry_method === 'duplicate_entry') {
        payroll = that.scope.payroll;
        $state.go('payroll.duplicate-payroll', {
          weekEnd: that.scope.endDate,
          cnum: payroll.contract_num,
          org: payroll.organization_id
        });

      } else if(that.scope.entry_method === 'upload_entry') {
        logger.info('Upload method is not ready');
      }
    };
  }
})();
