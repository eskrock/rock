(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    /* @ngInject */
    function Dashboard($state, $scope, $rootScope, logger, activities, moment, payrollActivitiesResource) {
      var that = this;
      that.title = 'Dashboard';
      that.scope = $scope;
      that.scope.mode = '';
      that.scope.activities = activities;
      that.scope.org = 'all';
      that.scope.contract = 'all';
      that.scope.from = '';
      that.scope.to = '';
      that.scope.status = 'pending';
      that.scope.sortCol = 'payroll.week_end';
      that.scope.sortDesc = true;
      that.scope.currentUser = $rootScope.currentUser;
      that.scope.fromDate  = '';
      that.scope.toDate = '';
      that.scope.$watch('fromDate', function() { that.scope.from =  moment(that.scope.fromDate, 'M/D/YY', true); });
      that.scope.$watch('toDate', function() { that.scope.to =  moment(that.scope.toDate, 'M/D/YY', true); });
      that.scope.selectedActivities = [];
      that.scope.gotoReview = gotoReview;

      function gotoReview(activity) {
        if (activity.payroll.id) {
          $state.go('payroll.edit.reviews-hours-and-earnings', {
            cnum: activity.payroll.contract.num,
            org: activity.payroll.organization.id,
            id: activity.payroll.id});
        }
        return;
      }

      that.scope.setSortCol = function(col) {
        if (col === 'week_end') {
          col = 'payroll.week_end';
        } else if (col === 'contract') {
          col = 'payroll.contract.num';
        } else if (col === 'org') {
          col = 'payroll.organization.name';
        } else if (col === 'payroll_num') {
           col = 'payroll.number';
        } else if (col === 'status') {
          col = 'status';
        }

        if (that.scope.sortCol === col) {
          that.scope.sortDesc = !that.scope.sortDesc;
        } else {
          that.scope.sortCol = col;
          that.scope.sortDesc = false;
        }
      };

      that.scope.listFilter = function(item) {
        /* jshint -W074 */
        var result = true;
        if (that.scope.status === 'all') {
          result = result && true;
        } else if (that.scope.status === 'pending' && item.status !== 'sent') {
          result = result && true;
        } else if (that.scope.status === 'sent' && item.status === 'sent') {
          result = result && true;
        } else if (that.scope.status === 'flagged' && item.status === 'flagged') {
          result = result && true;
        } else if (that.scope.status === 'received' && item.status === 'received') {
          result = result && true;
        } else if (that.scope.status === 'not-received' && item.status === 'not-received') {
          result = result && true;
        } else if (that.scope.status === 'delinquent' && item.status === 'delinquent') {
          result = result && true;
        } else {
          result = result && false;
        }

        if (that.scope.contract === 'all' || that.scope.contract === item.payroll.contract.num) {
          result = result && true;
        } else {
          result = result && false;
        }

        if (that.scope.org === 'all' || parseInt(that.scope.org, 10) === item.payroll.organization.id) {
          result = result && true;
        } else {
          result = result && false;
        }

        if (that.scope.from && that.scope.from.isValid() && moment(item.payroll.week_end) < that.scope.from) {
          result = result && false;
        }

        if (that.scope.to && that.scope.to.isValid() && moment(item.payroll.week_end) > that.scope.to) {
          result = result && false;
        }
        //console.log(result);
        return result;
      };
      that.scope.reviewPayrolls = function() {
        console.log('implement this');
      };

      that.scope.sendPayrolls = function() {
          var error = function() {
            logger.error('Error sending payroll');
          };
          var success = function(result) {
            logger.info('Payrolls sent successfully');
            that.scope.mode = 'complete';
          };
          var payrolls = that.scope.selectedActivities;
          if (payrolls.length > 0) {
              payrolls = payrolls.map(function(payroll) { return payroll.payroll_id; });
              payrollActivitiesResource.sendPayrolls({ payrolls: payrolls }, success, error);
          } else {
            logger.info('No payrolls selected');
          }
      };

      that.scope.confirmPayrolls = function() {
        that.scope.selectedActivities = [];
        for (var i = 0; i < that.scope.activities.length; i++) {
          var payroll = that.scope.activities[i].payroll;
          if (payroll.selected) {
            that.scope.selectedActivities.push(that.scope.activities[i]);
          }
        }

        if (that.scope.selectedActivities.length > 0) {
            that.scope.mode = 'confirm';
        } else {
          logger.info('No payrolls selected');
        }
      };

      that.scope.isNewItem = function(item) {
        if (item && item.received) {
          var days = (new Date() - new Date(item.received)) / 1000 / 60 / 60 / 24;
          if (days < 8 && (item.status === 'received' || item.status === 'certified')) {
              return true;
          }
        }

        return false;
      };

      that.scope.getComments = function(item) {
        return item.deduction_flags.concat(item.pay_flags);
      };
    }


})();
