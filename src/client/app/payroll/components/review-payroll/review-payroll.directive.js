(function () {
    'use strict';

    angular
        .module('app.payroll')
        .directive('reviewPayroll', ReviewPayrollDirective);

    /* @ngInject */
    function ReviewPayrollCtrl($state, $rootScope, $scope, $window, logger, moment) {
        var that = this;
        that.scope = $scope;
        that.scope.dupEndOfWeek = moment().endOf('week').format('YYYY-MM-DD');
        that.scope.dupPayroll = {
          id: that.scope.payroll.id,
          week_end: that.scope.payroll.week_end,
          number: that.scope.payroll.number
        };
        that.scope.currentUser = $rootScope.currentUser;

        that.scope.goBack = function() {
          $window.history.back();
        };

        that.scope.getWeekDates = function() {
          var week_end = moment(that.scope.reviewData.week_end.split('T')[0]);
          var week_start = week_end.clone().day('Sunday');
          var days = [];
          do { days.push(week_start.date()); week_start.add(1, 'day'); } while(week_start <= week_end);
          return days;
        };

        activate();

        function activate() {
          logger.info('Activated Review Payroll');
        }
    }

    function ReviewPayrollDirective() {
      return {
        restrict: 'E',
        controller: ReviewPayrollCtrl,
        controllerAs: 'controller',
        scope: {
          payrollUser: '=payrollUser',
          reviewData: '=reviewData',
          payroll: '=payroll'
        },
        templateUrl: 'app/payroll/components/review-payroll/views/review-payroll.html'
      };
    }

})();
