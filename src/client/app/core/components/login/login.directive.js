(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('login', LoginDirective);

    /* @ngInject */
    function LoginCtrl($state, $scope, $auth, logger, $location) {
        var that = this;
        that.scope = $scope;

        $scope.authenticate = function(provider) {
          $auth.authenticate(provider)
            .then(function() {
              logger.info('You have successfully signed in with ' + provider + '!');
              $location.path('/');
            })
            .catch(function(error) {
              logger.error(error);
            });
        };

        activate();

        function activate() {
          logger.info('Login View Activated');
        }
    }

    function LoginDirective() {
      return {
        restrict: 'E',
        transclude: true,
        controller: LoginCtrl,
        controllerAs: 'controller',
        templateUrl: 'app/core/components/login/views/login.html'
      };
    }
})();
