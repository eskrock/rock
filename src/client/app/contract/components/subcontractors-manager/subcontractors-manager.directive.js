(function () {
    'use strict';

    angular
        .module('app.contracts')
        .directive('subcontractorsManager', SubContractorsDirective);

    /* @ngInject */
    function SubContractorManagerCtrl($state, $scope, dataservice, $interpolate,
      moment, logger, contractResource, SubcontractModel) {
        var that = this;
        that.title = 'Sub Contractors Manager';
        that.scope = $scope;
        that.scope.continueForm = continueForm;
        that.scope.saveSubContractor = saveSubContractor;
        that.scope.setForm = setForm;
        getNewSubcontractor();

        function getNewSubcontractor() {
          that.scope.subcontractor = new SubcontractModel();
          that.scope.subcontractor.prime_id = '1'; // TODO change to dynamic value
          // Parse start date
          that.scope.startDateDay = '';
          that.scope.startDateMonth = '';
          that.scope.startDateYear = '';
          that.scope.$watch(function(){ return that.scope.startDateDay; }, function() { updateStartDate(); });
          that.scope.$watch(function(){ return that.scope.startDateMonth; }, function() { updateStartDate(); });
          that.scope.$watch(function(){ return that.scope.startDateYear; }, function() { updateStartDate(); });

          function updateStartDate() {
            var startDate = moment($interpolate('{{startDateMonth}}/{{startDateDay}}/{{startDateYear}}')(that.scope));
            if (startDate.isValid()) {
              that.scope.subcontractor.subcontractors[0].start_date = startDate.toISOString();
            } else {
              that.scope.subcontractor.subcontractors[0].start_date = '';
            }
          }

          // Parse end date
          that.scope.endDateDay = '';
          that.scope.endDateMonth = '';
          that.scope.endDateYear = '';
          that.scope.$watch(function(){ return that.scope.endDateDay; }, function() { updateEndDate(); });
          that.scope.$watch(function(){ return that.scope.endDateMonth; }, function() { updateEndDate(); });
          that.scope.$watch(function(){ return that.scope.endDateYear; }, function() { updateEndDate(); });

          function updateEndDate() {
            var endDate = moment($interpolate('{{endDateMonth}}/{{endDateDay}}/{{endDateYear}}')(that.scope));
            if (endDate.isValid()) {
              that.scope.subcontractor.subcontractors[0].end_date = endDate.toISOString();
            } else {
              that.scope.subcontractor.subcontractors[0].end_date = '';
            }
          }
        }

        function setForm(form) {
          that.scope.form = form;
        }

        activate();

        function activate() {
          logger.info('Activated Sub Contractors Manager View');
        }

        function saveSubContractor() {
            var number = that.scope.contract.num;
            var error = function() {logger.info('Error on saving the contract');};
            var success = function(result) {
                logger.info('Contract created successfully with id: ' + number);
                that.scope.form.$setPristine();
                getNewSubcontractor();

                contractResource.getSubcontractors({id:number}, function(subcontractors) {
                    $state.go('contract.view', { 'id': number }, { reload: true });
                }, function() {
                    logger.info('Error updating subcontractors list');
                });
            };

            contractResource.saveSubcontractor({id:number}, that.scope.subcontractor, success, error);
        }

        function continueForm() {
          var number = that.scope.contract.num;
          $state.go('contract.edit.workclassifications', { 'id': number }, { reload: true });
        }
    }

    function SubContractorsDirective() {
      return {
        restrict: 'E',
        controller: SubContractorManagerCtrl,
        controllerAs: 'controller',
        scope: {
          mode: '=mode',
          contract: '=contract',
          subcontractors: '=subcontractors',
        },
        templateUrl: 'app/contract/components/subcontractors-manager/views/subcontractors-manager.html'
      };
    }

})();
