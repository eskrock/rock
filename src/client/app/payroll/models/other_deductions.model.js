(function () {
  'use strict';

  angular
    .module('app.payroll')
    .factory('OtherDeductionsModel', OtherDeductionsModel);

  /* @ngInject */
  function OtherDeductionsModel() {
    return function(deductions) {
      if(deductions) {
        var other_deductions = [];
        for(var i = 0; i < deductions.length; i++) {
          var other_deduction_attachments = [];
          if(deductions[i].attachments) {
            for(var j = 0; j < deductions[i].attachments.length; j++) {
              other_deduction_attachments.push({
                file: deductions[i].attachments[j].file_name,
                original_name: deductions[i].attachments[j].original_name,
                id: deductions[i].attachments[j].id,
                path: deductions[i].attachments[j].path
              });
            }
          }

          other_deductions.push({
            id: deductions[i].id,
            deduction: deductions[i].deduction,
            explanation: deductions[i].explanation,
            pay_detail_id: deductions[i].pay_detail_id,
            attachments: other_deduction_attachments
          });
        }
        return other_deductions;
      } else {
        return {
          id: '',
          deduction: null,
          explanation: '',
          pay_detail_id: '',
          attachments: []
        };
      }
    };
  }
})();
