(function() {
  'use strict';

  angular
      .module('app.core')
        .service('profileResource', resourceService().getprofileResource)
        .service('organizationResource', resourceService().getOrganizationResource);


  /* @ngInject */
  function resourceService(config, $resource, logger) {
      var service = {
          getOrganizationResource: getOrganizationResource,
          getprofileResource: getprofileResource
      };


      // organizations/
      // organizations/:id/
      function getOrganizationResource(config, $resource) {
          var url = config.apiServiceBaseUri + '/organizations/:id/';
          var r = $resource(url, {}, {
              'query': { method: 'GET', isArray: true},
              'get': { method: 'GET', params: { id: '@id' }},
              'save': { method: 'POST', url: url },
              'update': { method: 'PUT', params: { id: '@id' }},
              'remove': { method: 'DELETE', params: { id: '@id' }},
              'contracts': { method: 'GET', url: url + 'contracts', params: { id: '@id' }},
              'contractDetails': {
                  method: 'GET',
                  url: config.apiServiceBaseUri + '/organizations/:id/contract/:contractid',
                  params: { id: '@id', contractid: '@contractid' }
                }
          });
          return r;
      }

      // profile/
      function getprofileResource(config, $resource) {
          var url = config.apiServiceBaseUri + '/me';
          var r = $resource(url, {}, {
              'get': { method: 'GET', isArray: false}
          });

          return r;
      }

      return service;
  }
})();
