(function () {
    'use strict';

    angular
        .module('app.contracts')
        .factory('SubcontractModel', SubcontractModel);

    /* @ngInject */
    function SubcontractModel(logger, moment) {
        return function() {
            return {
              'prime_id': '',
              'subcontractors': [{
                'name': '',
                'poc': '',
                'phone': '',
                'fax': '',
                'start_date': '',
                'end_date': ''
              }]
            };
        };
    }
})();
