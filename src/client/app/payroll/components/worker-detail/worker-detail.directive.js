(function () {
    'use strict';

    angular
        .module('app.payroll')
        .directive('workerDetail', function() {
          return {
            restrict: 'E',
            controller: WorkerDetailCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/payroll/components/worker-detail/worker-detail.html',
            scope: {
              classes: '=workClasses',
              worker: '=',
              mode: '<'
            }
          };
        });

    /* @ngInject */
    /* jshint -W071 */
    /* jshint -W072 */
    function WorkerDetailCtrl($state, $rootScope, $stateParams, $scope, $q, utils,
      config, logger, FileUploader, OtherDeductionsModel, payrollItemsResource, WorkedHoursModel) {
        var that = this;
        that.scope = $scope;
        that.scope.customClassPanel = false;
        that.scope.overTimePanel = false;
        that.scope.otherDeductionsPanel = false;
        that.scope.workClass = '';
        that.scope.straightHours = 0;
        that.scope.overtimeHours = 0;
        that.scope.pid = $stateParams.id;
        that.scope.addAnother = false;
        that.scope.cnum = $stateParams.cnum;
        that.scope.org = $stateParams.org;

        if (that.scope.worker.work_class) {
          var work_class_exp = new RegExp(that.scope.worker.work_class, 'i');
          for(var i = 0; i < that.scope.classes.length; i++) {
            var wclass = that.scope.classes[i];
            if(work_class_exp.test(wclass.work_code)) {
              that.scope.worker.work_class_selected = wclass;
            }
          }

          if(that.scope.worker.work_class_selected === undefined) {
            that.scope.worker.work_class_custom = that.scope.worker.work_class;
            that.scope.customClassPanel = true;
          }
        }

        if(that.scope==='new') {
          that.title = 'Enter worker detail';
        } else {
          that.title = 'Edit worker detail';
        }

        that.scope.removeDeduction = function(index) {
          that.scope.worker.other_deductions.splice(index, 1);
        };

        that.scope.removeHours = function(index) {
          that.scope.worker.worked_hours.splice(index, 1);
        };

        that.scope.getTotalDeductions = function() {
          var totalDed = that.scope.worker.fica +
            that.scope.worker.taxwh;
          for(var i = 0; i < that.scope.worker.other_deductions.length; i++) {
            totalDed += that.scope.worker.other_deductions[i].deduction;
          }
          that.scope.worker.total_other = totalDed;
          return totalDed;
        };

        that.scope.getNetWagesPaid = function() {
          return getWorkerRegTotal() * num(that.scope.worker.rate_reg) +
          getWorkerOTTotal() * num(that.scope.worker.rate_ot) -
          num(that.scope.worker.total_other);
        };

        that.scope.classesMatcher = function(wclasses) {
          return function findMatches(q, cb) {
            var matches, substrRegex;
            matches = [];
            substrRegex = new RegExp(q, 'i');
            for(var i = 0; i < wclasses.length; i++) {
              wclass = wclasses[i];
              if (substrRegex.test(wclass.work_code)) {
                matches.push(wclass);
              }
            }

            cb(matches);
          };
        };

        that.scope.work_class_dataset = {
          displayKey: 'work_code',
          source: that.scope.classesMatcher(that.scope.classes)
        };

        that.scope.save = function() {
          if (that.scope.uploader.queue.length > 0) {
            that.scope.uploader.uploadAll();
          } else {
            savePayrollItem();
          }
        };

        that.scope.addAnotherDeduction = function() {
          that.scope.worker.other_deductions.push(new OtherDeductionsModel());
        };

        that.scope.addAnotherOvertime = function() {
          that.scope.worker.worked_hours.push(new WorkedHoursModel());
        };

        that.scope.uploader = new FileUploader({
          url: config.apiServiceBaseUri + '/transient/attachments/',
          alias: 'attachments'
        });

        that.scope.uploader.onCompleteAll = function() {
          savePayrollItem();
        };

        that.scope.uploader.onCompleteItem = function(item, response, status, headers) {
          for(var i = 0; i < item.attachments.length; i++) {
            if(item.attachments[i].original_name === response[0].originalname) {
              item.attachments[i].file = response[0].filename;
              return;
            }
          }

          item.attachments.push({file: response[0].filename, original_name: response[0].originalname });
        };

        function savePayrollItem() {
          if(that.scope.addAnother) {
            saveItem()
            .then(function() {
              reload();
            });

          } else {
            saveItem()
            .then(function() {
              $state.go('payroll.edit.reviews-hours-and-earnings', {
                id: $stateParams.id, cnum: $stateParams.cnum, org: $stateParams.org
              });
            });
          }
        }

        function saveItem() {
          var mode = that.scope.mode;
          var worker = that.scope.worker;
          var workerObj = { worker: worker, pid: $stateParams.id, id: $stateParams.item };

          if(that.scope.worker.work_class_custom) {
            worker.work_class = that.scope.worker.work_class_custom;
          } else {
            worker.work_class = that.scope.worker.work_class_selected.work_code;
          }

          var deferred = $q.defer();
          var error = function(err) {
            logger.error('Error adding worker information');
            deferred.reject('error');
          };
          var success = function(result) {
            logger.info('Worker info saved successfully');
            deferred.resolve(result);
          };

          if (mode === 'new') {
            payrollItemsResource.create(workerObj, success, error);
          } else {
            payrollItemsResource.update(workerObj, success, error);
          }
          return deferred.promise;
        }

        function reload() {
          $state.go('payroll.edit.worker-detail', {
            id: $stateParams.id, cnum: $stateParams.cnum, org: $stateParams.org
          }, {reload: true});
        }

        function getWorkerRegTotal() {
          var worker = that.scope.worker;
          var straightHours = that.scope.straightHours =
            num(worker.reg1) + num(worker.reg2) + num(worker.reg3) +
            num(worker.reg4) + num(worker.reg5) + num(worker.reg6) + num(worker.reg7);

          return straightHours;
        }

        function getWorkerOTTotal() {
          var worker = that.scope.worker;
          var overtimeHours = that.scope.overtimeHours =
            num(worker.ot1) + num(worker.ot2) + num(worker.ot3) +
            num(worker.ot4) + num(worker.ot5) + num(worker.ot6) + num(worker.ot7);

          return overtimeHours;
        }

        function num(val) { return val && !isNaN(val) ? parseFloat(val, 10) : 0; }
    }
})();
