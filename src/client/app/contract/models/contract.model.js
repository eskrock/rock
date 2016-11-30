(function () {
    'use strict';

    angular
        .module('app.contracts')
        .factory('ContractModel', ContractModel);

    /* @ngInject */
    function ContractModel(logger) {
        return function() {
            return {
              num: '',
              prime_id: '',
              prime: '',
              start_date: '',
              title: '',
              status: '',
              street: '',
              city: '',
              state: '',
              zip: '',
              co: '',
              notify_at: ''
          };
        };
    }
})();
