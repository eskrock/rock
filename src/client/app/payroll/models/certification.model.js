(function () {
  'use strict';

  angular
    .module('app.payroll')
    .factory('CertificationModel', CertificationModel);

  /* @ngInject */
  function CertificationModel(moment) {
    return function() {
      return {
        signed_by: '',
        signed_by_title: '',
        signed_date: moment().toISOString(),
        fringe_in_benefits: false,
        fringe_in_cash: false
      };
    };
  }
})();
