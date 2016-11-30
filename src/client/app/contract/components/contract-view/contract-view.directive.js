(function () {
    'use strict';

    angular
        .module('app.contracts')
        .directive('contractViewer', ContractViewerDirective);

    /* @ngInject */
    function ContractViewerCtrl($state, $scope, $q, dataservice, logger, contractResource) {
        var that = this;
        that.scope = $scope;
        that.scope.state = 'view';
        that.title = 'Contract Viewer';

        activate();

        function activate() {
          logger.info('Activated Contract Viewer View');
        }

        that.scope.navigateToAddSubContractors = function() {
          $state.go('contract.edit.subcontractors', {'id': that.scope.contract.num}, { reload: true });
        };
    }

    function ContractViewerDirective() {
      return {
        restrict: 'E',
        controller: ContractViewerCtrl,
        controllerAs: 'controller',
        scope: {
          mode: '=mode',
          contract: '=contract',
          subcontractors: '=subcontractors',
          workclassifications: '=workclassifications',
          contractingOfficer: '=co'
        },
        templateUrl: 'app/contract/components/contract-view/views/contract-view.html'
      };
    }

})();
