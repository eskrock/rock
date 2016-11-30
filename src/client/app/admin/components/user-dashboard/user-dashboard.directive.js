(function () {
    'use strict';

    angular
        .module('app.admin')
        .directive('userDashboard', UserDashboardDirective);

    /* @ngInject */
    function UserDashboardCtrl($state,$scope,logger, usersResource) {
        var that = this;
        that.scope = $scope;
        that.scope.userCreate = false;
        function save(data) {
            var id = data.id;
            var error = function() {logger.info('Error on updating the user');};
            var success = function(result) {
              logger.info('User saved successfully');
            };
            usersResource.update(data, success, error);
        }
        function toggleCreate(){
            that.scope.userCreate = !that.scope.userCreate;
        }
        function inviteUser(user){
            var error = function(){logger.info('Error inviting user');};
            var success = function(){
                logger.info('User added successfully');
                toggleCreate();
            };
            user.organization_id = that.scope.currentUser.organization_id;
            usersResource.create(user, success, error);
        }
        that.scope.inviteUser = inviteUser;
        that.scope.saveRow = save;
        that.scope.toggleCreate = toggleCreate;
        activate();


        function activate() {
          logger.info('User Dashboard View Activated');
        }
    }

    function UserDashboardDirective() {
      return {
        restrict: 'E',
        controller: UserDashboardCtrl,
        controllerAs: 'controller',
        scope: {
          users: '=users',
          currentUser: '=currentUser'
        },
        templateUrl: 'app/admin/components/user-dashboard/user-dashboard.html'
      };
    }
})();
