(function () {
    'use strict';

    angular
        .module('app.profile')
        .directive('profileViewer', ProfileViewerDirective);

    /* @ngInject */
    function ProfileViewerCtrl($state, $scope, $q, $rootScope, logger ) {
        var that = this;
        that.scope = $scope;
        that.scope.state = 'view';
        that.title = 'Profile Viewer';

        activate();

        function activate() {
          logger.info('Activated Profile Viewer View');
        }
    }

    function ProfileViewerDirective() {
      return {
        restrict: 'E',
        controller: ProfileViewerCtrl,
        controllerAs: 'controller',
        scope: {
          mode: '=mode',
          user: '=user'
        },
        templateUrl: 'app/profile/components/profile-view/views/profile-view.html'
      };
    }

})();
