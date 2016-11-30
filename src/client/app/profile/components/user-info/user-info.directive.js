(function () {
    'use strict';

    angular
        .module('app.profile')
        .directive('userInfo', UserInfoDirective);

    /* @ngInject */
    function UserInfoCtrl($state, $stateParams, $scope, dataservice, logger, moment, $interpolate, userresource) {
        var that = this;
        that.title = 'User Info';
        that.scope = $scope;

         activate();

        function activate() {
          logger.info('Activated User Info View');
        }

        that.scope.save = function() {
          var number = that.scope.user.id;
          var user = that.scope.user;
          var error = function() {
            logger.info('Error saving profile');
          };

          var success = function(result) {
            logger.info('profile saved successfully ');
            if($stateParams.redirect) {
              $state.go($stateParams.redirect.replace(/[^\w]/g,''), {}, {reload: true});
            } else {
              $state.go('dashboard');
            }
          };

          user.access = '';
          user.last_login = new Date();
          user.profile_status = 'complete';

          if (that.scope.mode === 'edit') {
            userresource.update({}, user, success, error);
          }

        };

    }

    function UserInfoDirective() {
      return {
        restrict: 'E',
        controller: UserInfoCtrl,
        controllerAs: 'controller',
        scope: {
          mode: '=mode',
          user: '=user'
        },
        templateUrl: 'app/profile/components/user-info/views/user-info.html'
      };
    }

})();
