(function() {
  'use strict';

  angular
      .module('app.core')
        .factory('permissions', PermissionsFactory);


  /* @ngInject */
  function PermissionsFactory($rootScope, logger) {
    var perm;
    return {
      setPermission: function(permission) {
        perm = permission;
        $rootScope.$broadcast('permissionsChanged');
      },
      hasPermission: function (permission) {
        return perm === permission;
      }
    };
  }
})();
