(function () {
  'use strict';

  angular
    .module('app.payroll')
    .factory('PayrollModel', PayrollModel);

  /* @ngInject */
  function PayrollModel(moment) {
    return function() {
      return {
        week_end: moment().format('MM/DD/YYYY'),
        final: false,
        no_work: false,
        status: '', // 'new', 'forwarded', 'submitted', 'flagged', 'approved'
        remarks: '',
        organization_id: '',
        contract_id: '',
        attachments: [],
        number: null
      };
    };
  }

})();
