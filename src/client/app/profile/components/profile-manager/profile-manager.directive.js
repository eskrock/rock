(function () {
    'use strict';

    angular
        .module('app.profile')
        .directive('profileManager', ProfileManagerDirective);

    /* @ngInject */
    function ProfileManagerCtrl($state, dataservice, logger) {
        var vm = this;
        vm.title = 'Profile Manager';
        activate();

        function activate() {
          logger.info('Activated Profile Manager View');
        }
    }

    function ProfileManagerDirective() {
      return {
        restrict: 'E',
        transclude: true,
        controller: ProfileManagerCtrl,
        controllerAs: 'controller',
        scope: { },
        templateUrl: 'app/profile/components/profile-manager/views/profile-manager.html'
      };
    }
})();
