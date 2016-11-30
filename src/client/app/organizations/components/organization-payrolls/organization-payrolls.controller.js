(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('organizationPayrolls', OrganizationPayrolls);

    function OrganizationPayrolls($state, $stateParams, $scope, moment, logger, payrolls) {
      var that = this;
      that.title = 'Payrolls';
      $scope.activities = payrolls;
      $scope.org = $stateParams.id;
      $scope.contract = $stateParams.contractNum;
      $scope.from = '';
      $scope.to = '';
      $scope.status = 'all';
      $scope.sortCol = 'payroll.week_end';
      $scope.sortDesc = true;

      $scope.fromDate  = '';
      $scope.toDate = '';
      $scope.$watch('fromDate', function() { $scope.from =  moment($scope.fromDate, 'M/D/YY', true); });
      $scope.$watch('toDate', function() { $scope.to =  moment($scope.toDate, 'M/D/YY', true); });

      $scope.shouldHaveLink = shouldHaveLink;
      function shouldHaveLink(activity) {
        if (activity.payroll.id) {
          $state.go('payroll.edit.reviews-hours-and-earnings',{id: activity.payroll.id});
        }
        return;
      }

      $scope.setSortCol = function(col) {
        if(col === 'week_end') { col = 'payroll.week_end'; }
        else if(col === 'contract') { col = 'payroll.contract.num'; }
        else if(col === 'org') { col = 'payroll.organization.name'; }
        else if(col === 'payroll_num') { col = 'payroll.number'; }
        else if(col === 'status') { col = 'status'; }

        if($scope.sortCol === col) {
          $scope.sortDesc = !$scope.sortDesc;
        } else {
          $scope.sortCol = col;
          $scope.sortDesc = false;
        }
      };

      $scope.listFilter = function(item) {
        /* jshint -W074 */
        var result = true;
        if($scope.status === 'all') {
          result = result && true;
        } else if($scope.status === 'pending' && item.status !== 'sent') {
          result = result && true;
        } else if($scope.status === 'sent' && item.status === 'sent') {
          result = result && true;
        } else if($scope.status === 'flagged' && item.status === 'flagged') {
          result = result && true;
        } else if($scope.status === 'received' && item.status === 'received') {
          result = result && true;
        } else if($scope.status === 'delinquent' && item.satus === 'not received') {
          result = result && true;
        } else {
          result = result && false;
        }

        if($scope.contract === 'all' || $scope.contract === item.payroll.contract.num) {
          result = result && true;
        } else {
          result = result && false;
        }

        if($scope.org === 'all' || parseInt($scope.org, 10) === item.payroll.organization.id) {
          result = result && true;
        } else {
          result = result && false;
        }

        if($scope.from && $scope.from.isValid() && moment(item.payroll.week_end) < $scope.from) {
          result = result && false;
        }

        if($scope.to && $scope.to.isValid() && moment(item.payroll.week_end) > $scope.to) {
          result = result && false;
        }

        return result;
      };

      $scope.goToPayrollIfExtant = function(item) {
        if (item.payroll.id) {
          $state.go('payroll.edit.reviews-hours-and-earnings',{
            id: item.payroll.id,
            cnum: item.payroll.contract.num,
            org: item.payroll.organization_id
          });
        } else {
          $state.go('organization.payrolls',{contractNum: item.payroll.contract.num});
        }
      };

      $scope.isNewItem = function(item) {
        if(item && item.received) {
          var days = (new Date() - new Date(item.received)) / 1000 / 60 / 60 / 24;
          if(days < 8 && (item.status === 'received' || item.status === 'certified')) {
              return true;
          }
        }

        return false;
      };
    }


})();
