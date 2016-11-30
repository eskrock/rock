(function () {
    'use strict';

    angular
        .module('app.contracts')
        .directive('projectInfo', ProjectInfoDirective);

    /* @ngInject */
    function ProjectInfoCtrl($state, $scope, dataservice, logger, moment, $interpolate, contractResource) {
        var that = this;
        that.title = 'Project Info';
        that.scope = $scope;
        that.scope.contract.co = that.scope.contractingOfficer.id;
        // Parse start date
        var startDate = moment(that.scope.contract.start_date);
        that.scope.startDateDay = '';
        that.scope.startDateMonth = '';
        that.scope.startDateYear = '';
        that.scope.$watch(function(){ return that.scope.startDateDay; }, function() { updateStartDate(); });
        that.scope.$watch(function(){ return that.scope.startDateMonth; }, function() { updateStartDate(); });
        that.scope.$watch(function(){ return that.scope.startDateYear; }, function() { updateStartDate(); });
        if (startDate.isValid()) {
          that.scope.startDateDay = startDate.format('DD');
          that.scope.startDateMonth = startDate.format('MM');
          that.scope.startDateYear = startDate.format('YYYY');
        }

        that.scope.save = save;

        function updateStartDate() {
          var startDate = moment($interpolate('{{startDateMonth}}/{{startDateDay}}/{{startDateYear}}')(that.scope));
          if (startDate.isValid()) {
            that.scope.contract.start_date = startDate.toISOString();
          } else {
            that.scope.contract.start_date = '';
          }
        }

        activate();

        function activate() {
          logger.info('Activated Project Info View');
        }

        function save() {
            var number = that.scope.contract.num,
                contract = that.scope.contract;
            var error = function() {logger.info('Error on saving the contract');};
            var success = function(result) {
              logger.info('Contract saved successfully with id: ' + number);
              $state.go('contract.edit.workclassifications', { 'id': number }, { reload: true });
            };

            if(that.scope.mode === 'edit') {
              contractResource.update({id:number}, contract, success, error);
            } else {
              contractResource.save(contract, success, error);
            }
        }

    }

    function ProjectInfoDirective() {
      return {
        restrict: 'E',
        controller: ProjectInfoCtrl,
        controllerAs: 'controller',
        scope: {
          mode: '=mode',
          contract: '=contract',
          organizations: '=organizations',
          contractingOfficer: '=co'
        },
        templateUrl: 'app/contract/components/project-info/views/project-info.html'
      };
    }

})();
