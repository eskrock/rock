(function () {
    'use strict';

    angular
        .module('app.payroll')
        .directive('reviewDeductions', ReviewDeductionsDirective);

    /* @ngInject */
    function ReviewDeductionsCtrl($state, $scope, config, logger, payrollsResource, FileUploader) {
        var that = this;
        that.scope = $scope;
        var attachments = [];
        attachments = that.scope.payroll.attachments.map(function(attachment) {
          return {file: attachment.file_name, original_name: attachment.original_name };
        });
        that.scope.payroll.attachments = attachments;

        that.scope.uploader = new FileUploader({
          url: config.apiServiceBaseUri + '/transient/attachments/',
          alias: 'attachments'
        });

        that.scope.uploader.filters.push({
            name: 'fileFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|pdf|'.indexOf(type) !== -1;
            }
        });

        that.scope.uploader.onCompleteAll = function() {
          var payroll = that.scope.payroll;
          var error = function() {logger.info('Error on saving the payroll');};
          var success = function(result) {
            logger.info('payroll saved successfully with id: ' + payroll.id);
            $state.go('payroll.edit.sign-certify', {id: payroll.id}, {reload: true});
          };
          payrollsResource.update({id:payroll.id}, { attachments: payroll.attachments }, success, error);
        };

        that.scope.uploader.onCompleteItem = function(payroll, response, status, headers) {
          payroll.attachments.push({file: response[0].filename, original_name: response[0].originalname });
        };

        that.scope.addAttachments = function(e, inputId) {
          /* jshint -W117 */
          e.preventDefault();
          $(inputId).trigger('click'); // TODO Remove Jquery dependency
        };

        that.scope.saveAndContinue = function() {
          if (that.scope.uploader.queue.length > 0){
            that.scope.uploader.uploadAll();
          }
          else {
            $state.go('payroll.edit.sign-certify', {id: that.scope.payroll.id}, {reload: true});
          }
        };

        that.scope.getNetWagesPaid = function(pay_details) {
          return getWorkerRegTotal(pay_details) * num(pay_details.rate_reg) +
          getWorkerOTTotal(pay_details) * num(pay_details.rate_ot) -
          num(pay_details.total_other);
        };

        function getWorkerRegTotal(pay_details) {
          var straightHours =
            num(pay_details.reg1) + num(pay_details.reg2) + num(pay_details.reg3) +
            num(pay_details.reg4) + num(pay_details.reg5) + num(pay_details.reg6) + num(pay_details.reg7);

          return straightHours;
        }

        function getWorkerOTTotal(pay_details) {
          var overtimeHours =
            num(pay_details.ot1) + num(pay_details.ot2) + num(pay_details.ot3) +
            num(pay_details.ot4) + num(pay_details.ot5) + num(pay_details.ot6) + num(pay_details.ot7);

          return overtimeHours;
        }

        function num(val) { return val && !isNaN(val) ? parseFloat(val, 10) : 0; }
    }

    function ReviewDeductionsDirective() {
      return {
        restrict: 'E',
        controller: ReviewDeductionsCtrl,
        controllerAs: 'controller',
        scope: {
          payrollUser: '=payrollUser',
          reviewData: '=reviewData',
          payroll: '=payroll'
        },
        templateUrl: 'app/payroll/components/review-deductions/views/review-deductions.html'
      };
    }

})();
