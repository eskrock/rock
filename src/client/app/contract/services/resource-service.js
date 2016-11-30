  (function() {
    'use strict';

    angular
        .module('app.contracts')
          .service('contractResource', resourceService().getcontractResource)
          .service('subcontractorsresource', resourceService().getSubContractorsResource)
          .service('classificationsresource', resourceService().getClassificationsResource)
          .service('countiesresource', resourceService().getCountiesResource);

    /* @ngInject */
    function resourceService(config, $resource, logger) {
        var service = {
            // classifications
            getClassificationsResource: getClassificationsResource,
            // counties
            getCountiesResource: getCountiesResource,
            // contracts
            getcontractResource: getcontractResource,
            // subcontractors
            getSubContractorsResource: getSubContractorsResource
        };

        // classifications/:state/
        function getClassificationsResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/classifications/search?state=:state&county=:county&name=:name';
            var r = $resource(url, {}, {
                'query': { method: 'GET', params: { state: '@state', county: '@county', name: '@name' }, isArray: true}
            });

            return r;
        }

        // counties/:state/
        function getCountiesResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/counties/:state/';
            var r = $resource(url, {}, {
                'query': { method: 'GET', params: { state: '@state' }, isArray: true}
            });

            return r;
        }

        // subcontractors/
        // subcontractors/:id/
        function getSubContractorsResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/subcontractors/:id/';
            var r = $resource(url, {}, {
                'query': { method: 'GET', isArray: true},
                'get': { method: 'GET', params: { id: '@id' }},
                'save': { method: 'POST', url: url },
                'update': { method: 'PUT', params: { id: '@id' }},
                'remove': { method: 'DELETE', params: { id: '@id' }}
            });

            return r;
        }

        // contract/
        // contract/:id/
        function getcontractResource(config, $resource) {
            var url = config.apiServiceBaseUri + '/contracts/:id/';
            var r = $resource(url, {}, {
                'query': { method: 'GET', isArray: true},
                'get': { method: 'GET', params: { id: '@id' }},
                'getSubcontractors': {
                  method: 'GET',
                  isArray: true,
                  url: url + 'subcontractors/',
                  params: { id: '@id' }
                },
                'saveSubcontractor': {
                  method: 'POST',
                  isArray: true,
                  url: url + 'subcontractors/',
                  params: { id: '@id' }
                },
                'getWorkClassifications': {
                  method: 'GET',
                  isArray: true ,
                  url: url + 'work_classifications/',
                  params: { id: '@id' }
                },
                'saveWorkClassifications': {
                  method: 'POST',
                  isArray: false ,
                  url: url + 'work_classifications/',
                  params: { id: '@id' }
                },
                'save': { headers: {'Content-Type': 'application/json'}, method: 'POST', url: url },
                'update': { method: 'PUT', params: { id: '@id' }},
                'remove': { method: 'DELETE', params: { id: '@id' }}
            });

            return r;
        }

        return service;
    }
})();
