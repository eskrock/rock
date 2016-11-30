(function () {
    'use strict';

    angular
        .module('app.contracts')
        .factory('ContractModel2', ContractModel);

    /* @ngInject */
    function ContractModel(logger) {
        return function() {
            return {
              id: '',
              name: '',
              duns: '',
              cage: '',
              poc: '',
              phone: '',
              fax: '',
              email: '',
              street: '',
              city: '',
              state: '',
              zip: '',
              createdAt: '',
              updatedAt: ''
            };
        };
    }
})();
