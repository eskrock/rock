(function () {
    'use strict';

    angular
        .module('app.contracts')
        .factory('WorkclassificationModel', WorkclassificationModel);

    /* @ngInject */
    function WorkclassificationModel(logger) {
        return function() {
          return {
            'id': '',
            'work_code': '',
            'description': '',
            'note': '',
            'rate': '',
            'fringe': '',
            'createdAt': '',
            'updatedAt': '',
            'contract_id': ''
          };
        };
    }
})();
