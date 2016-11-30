(function () {
    'use strict';

    angular
        .module('app.payroll')
        .directive('workedHours', function() {
          return {
            controller: WorkedHoursCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/payroll/components/worker-detail/worked-hours.html',
            scope: {
              worker: '=',
              index: '<',
              removeHours: '<'
            }
          };
        });

    /* @ngInject */
    function WorkedHoursCtrl($state, $rootScope, $stateParams, $scope, config) {
        var that = this;
        that.scope = $scope;
    }
})();
