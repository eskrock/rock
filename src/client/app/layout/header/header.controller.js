(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Header', Header);

    /* @ngInject */
    function Header($rootScope, $state, $scope, routerHelper, $auth, $location) {
        var that = this;
        that.scope = $scope;
        $scope.$watch(function() {
          return $rootScope.currentUser;
        }, function (value) {
          that.scope.currentUser = $rootScope.currentUser;
        });

        that.scope.isLoginScreen = function() {
          return $location.url().indexOf('login') !== -1;
        };

        that.scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };

        that.scope.logout = function() {
          $auth.logout();
          that.scope.currentUser = null;
          $rootScope.currentUser = null;
          $state.go('login', {}, {reload: true});
        };
    }
})();
