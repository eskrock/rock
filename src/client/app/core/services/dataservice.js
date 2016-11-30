(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {

        var readyPromise;

        var service = {
            // contracts
            getContract: getContract,
            getContracts: getContracts,

            ready: ready
        };

        return service;

        function getContract(id) {
            return $http.get('/api/contracts/' + id)
                .then(getContractComplete)
                .catch(getContractFailed);

            function getContractComplete(data, status, headers, config) {
                return data.data;
            }

            function getContractFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getContract')(e);
            }
        }

        function getContracts() {
            return $http.get('/api/contracts')
                .then(getContractsComplete)
                .catch(getContractsFailed);

            function getContractsComplete(data, status, headers, config) {
                return data.data;
            }

            function getContractsFailed(e) {
                $location.url('/');
                return exception.catcher('XHR Failed for getContracts')(e);
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ('prime the app')
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function() {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
