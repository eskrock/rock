  (function() {
    'use strict';

    angular
        .module('app.admin')
          .service('usersResource', resourceService().getusersResource)
          .service('organizationsResource', resourceService().getOrganizationsResource);

    /* @ngInject */
    function resourceService(config, $resource, logger) {
        var service = {
            // organizations
            getOrganizationsResource: getOrganizationsResource,
            // users
            getusersResource: getusersResource
        };

        // organizations/
        // organizations/:id/
        function getOrganizationsResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/organizations/:id/users';
            var r = $resource(url, {}, {
                'getUsers': { method: 'GET', isArray: true, params: {id: '@id'}}
            });

            return r;
        }


        // contract/
        // contract/:id/
       function getusersResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/users/:id';
            var r = $resource(url, {}, {
                'update': { method: 'PUT', params: {id: '@id'} },
                'create': { method: 'POST', url: url + '/invite'}
            });
            return r;
        }

        return service;
    }
})();
