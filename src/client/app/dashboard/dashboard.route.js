(function() {
  'use strict';

  angular
      .module('app.dashboard')
      .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
  }

  var _resolver = {
    activities: ['payrollActivitiesResource', '$q', '$stateParams',
      function(payrollActivitiesResource, $q, $stateParams) {
      var deferred = $q.defer();
      var success = function(data) { deferred.resolve(data); };
      var error = function(error) { deferred.reject('error'); };
      payrollActivitiesResource.list(success, error);
      return deferred.promise;
    }]
  };

  function getStates() {
    return [{
        state: 'dashboard',
        config: {
          url: '/',
          templateUrl: 'app/dashboard/components/dashboard/views/dashboard.html',
          controller: 'Dashboard',
          controllerAs: 'ctrl',
          title: 'dashboard',
          data: {
            requireLogin: true
          },
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          },
          resolve: {
            activities: _resolver.activities
          }
        }
      }
    ];
  }
})();
