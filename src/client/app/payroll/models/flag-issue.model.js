(function () {
  'use strict';

  angular
    .module('app.payroll')
    .factory('FlagIssueModel', FlagIssueModel);

  function FlagIssueModel() {
    return function() {
      return {
        comments: '',
        type: null
      };
    };
  }

})();
