(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('privacy', PrivacyViewerDirective);

    function PrivacyViewerCtrl($state, $scope, $q, $rootScope, logger ) {
        var that = this;
        that.scope = $scope;
        that.title = 'Privacy Viewer';
        that.scope.user = $rootScope.currentUser;
        activate();

        function activate() {
          logger.info('Privacy View Activated');
        }
    }

    function PrivacyViewerDirective() {
      return {
        restrict: 'E',
        transclude: true,
        controller: PrivacyViewerDirective,
        controllerAs: 'controller',
        templateUrl: 'app/core/components/privacy/views/privacy.html'
      };
    }
})();
