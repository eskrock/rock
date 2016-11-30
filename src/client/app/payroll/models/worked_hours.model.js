(function () {
  'use strict';

  angular
    .module('app.payroll')
    .factory('WorkedHoursModel', WorkedHoursModel);

  /* @ngInject */
  function WorkedHoursModel() {
    return function(worked_hours) {
      if(worked_hours) {
        var hours = [];
        for(var i = 0; i < worked_hours.length; i++) {
          hours.push({
            id: worked_hours[i].id,
            pay_detail_id: worked_hours[i].pay_detail_id,
            rate_type: worked_hours[i].rate_type,
            rate_paid: worked_hours[i].rate_paid,
            day1: worked_hours[i].day1,
            day2: worked_hours[i].day2,
            day3: worked_hours[i].day3,
            day4: worked_hours[i].day4,
            day5: worked_hours[i].day5,
            day6: worked_hours[i].day6,
            day7: worked_hours[i].day7
          });
        }
        return hours;
      } else {
        return {
          id: '',
          rate_type: '',
          rate_paid: null,
          day1: null,
          day2: null,
          day3: null,
          day4: null,
          day5: null,
          day6: null,
          day7: null
        };
      }
    };
  }
})();
