  (function() {
    'use strict';

    angular
        .module('app.profile')
          .service('userresource', resourceService().getUserResource);

    function resourceService(config, $resource, logger) {
        var service = {
            getUserResource: getUserResource
        };

        function getUserResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/me';
            var r = $resource(url, {}, {
                'query': { method: 'GET', isArray: true},
                'get': { method: 'GET', params: { id: '@id' }},
                'save': { headers: {'Content-Type': 'application/json'}, method: 'POST', url: url },
                'update': { method: 'PUT'},
                'remove': { method: 'DELETE', params: { id: '@id' }},
                'agree': { method: 'PUT', url: url+ '/agreed'}
            });

            return r;
        }

        return service;
    }
})();
