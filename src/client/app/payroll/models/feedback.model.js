(function () {
  'use strict';

  angular
    .module('app.payroll')
    .factory('FeedbackModel', FeedbackModel);

  /* @ngInject */
  function FeedbackModel() {
    return function() {
      return {
        payroll_id: null,
        web_time: '',
        mannual_time: '',
        comment: ''
      };
    };
  }
})();
