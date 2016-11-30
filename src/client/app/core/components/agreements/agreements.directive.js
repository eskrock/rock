(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('agreements', AgreementsDirective);

    function AgreementsViewerCtrl($state, $scope, $q, $rootScope, logger,$auth, userresource) {
        var that = this;
        that.scope = $scope;
        that.title = 'Agreements Viewer';
        that.scope.user = $rootScope.currentUser;
        activate();

        function activate() {
          logger.info('Agreements View Activated');
        }

        var error = function(err){
            logger.info('error saveing agreement information');
        };
        var success = function(result) {
          logger.info('agreement information saved');
          $state.go('profile.edit');
        };

        that.scope.btnAgree = function(){
          that.scope.user.agreement_accepted = 'true';
          userresource.update({}, that.scope.user, success, error);

        };

        that.scope.btnDisagree = function(){
          $auth.logout();
          $state.go('login');
        };
    }

    function AgreementsDirective() {
      return {
        restrict: 'E',
        transclude: true,
        controller: AgreementsViewerCtrl,
        controllerAs: 'controller',
        templateUrl: 'app/core/components/agreements/views/agreements.html'
      };
    }
})();
