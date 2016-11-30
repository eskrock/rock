(function () {
  'use strict';

  angular
    .module('app.payroll')
    .factory('WorkerModel', WorkerModel);

  /*  @ngInject */
  function WorkerModel(OtherDeductionsModel, WorkedHoursModel) {
    /* jshint -W074 */
      return function(worker) {
        if (worker) {
          return {
            id: worker.id,
            first_name: worker.first_name,
            last_name: worker.last_name,
            worker_id: worker.worker_id,
            work_class: worker.work_class,
            business_owner: worker.business_owner,
            reg1: worker.reg1,
            reg2: worker.reg2,
            reg3: worker.reg3,
            reg4: worker.reg4,
            reg5: worker.reg5,
            reg6: worker.reg6,
            reg7: worker.reg7,
            ot1: worker.ot1,
            ot2: worker.ot2,
            ot3: worker.ot3,
            ot4: worker.ot4,
            ot5: worker.ot5,
            ot6: worker.ot6,
            ot7: worker.ot7,
            rate_reg: worker.rate_reg,
            rate_ot: worker.rate_ot,
            fringe_cash: worker.fringe_cash,
            fringe_benefits: worker.fringe_benefits,
            fica: worker.fica,
            taxwh: worker.taxwh,
            total_other: worker.total_other,
            gross_fed: worker.gross_fed,
            gross_tot: worker.gross_tot,
            net_wages: worker.net_wages,
            payroll_id: worker.payroll_id,
            other_deductions: worker.other_deductions ?
              new OtherDeductionsModel(worker.other_deductions) :
              [new OtherDeductionsModel()],
            worked_hours: worker.worked_hours ?
              new WorkedHoursModel(worker.worked_hours) :
              [new WorkedHoursModel()]
          };
        } else {
        return {
          id: null,
          first_name: '',
          last_name: '',
          worker_id: '',
          work_class: '',
          business_owner: false,
          reg1: '',
          reg2: '',
          reg3: '',
          reg4: '',
          reg5: '',
          reg6: '',
          reg7: '',
          ot1: '',
          ot2: '',
          ot3: '',
          ot4: '',
          ot5: '',
          ot6: '',
          ot7: '',
          rate_reg: '',
          rate_ot: '',
          fringe_cash: '',
          fringe_benefits: '',
          fica: '',
          taxwh: '',
          total_other: '',
          gross_fed: '',
          gross_tot: '',
          net_wages: null,
          payroll_id: null,
          other_deductions: [new OtherDeductionsModel()],
          worked_hours: []
        };
      }
    };
  }
})();
