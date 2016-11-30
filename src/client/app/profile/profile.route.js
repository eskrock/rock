(function() {
  'use strict';

  angular
    .module('app.profile')
    .run(appRun);

  var _base = {

    profileController: {
      controllerAs: 'c',
      controller: ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
        var that = this;
        that.mode = $state.current.data.mode;
        that.user = $rootScope.currentUser;
      }]
    },

    profileEditController: {
      controllerAs: 'c',
      controller: ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
        var that = this;
        that.mode = $state.current.data.mode;
        that.user = $rootScope.currentUser;
      }]
    }

  };

  /* @ngInject */
  function appRun(routerHelper, $rootScope) {
    routerHelper.configureStates(getStates());
  }


  function getStates() {
    return [{
      state: 'profile',
      config: {
        abstract: true,
        template: '<profile-manager><ui-view/></<profile-manager>',
        url: '/profile',
        data: {
          requireLogin: true,
        }
      }
    }, {
      state: 'profile.view',
      config: angular.extend({
        url: '/view',
        template: '<profile-viewer mode="c.mode" user="c.user"></<profile-viewer>',
        title: 'profile',
        data: {
          requireLogin: true,
          mode: 'view'
        },
      }, _base.profileController)
    }, {
      state: 'profile.edit',
      config: angular.extend({
        url: '/edit',
        template: '<profile-viewer mode="c.mode" user="c.user"></<profile-viewer>',
        title: 'profile Edit',
        params: {redirect: null},
        data: {
          requireLogin: true,
          permissions: ['co'],
          mode: 'edit'
        },
      }, _base.profileEditController)
    }];
  }



})();
