(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('hasPermission', HasPermissionDirective);

    /* @ngInject */
    function HasPermissionDirective(permissions) {
      return {
        link: function(scope, element, attrs) {
          if(!angular.isString(attrs.hasPermission)) {
            throw 'hasPermission value must be a string';
          }
          var value = attrs.hasPermission.trim();
          var notPermissionFlag = value[0] === '!';
          if(notPermissionFlag) {
            value = value.slice(1).trim();
          }

          function toggleVisibilityBasedOnPermission() {
            var hasPermission = permissions.hasPermission(value);
            if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag) {
              element.show();
            }
            else {
              element.hide();
            }
          }

          toggleVisibilityBasedOnPermission();
          scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
        }
      };
    }
})();
