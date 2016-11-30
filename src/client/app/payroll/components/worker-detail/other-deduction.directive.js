(function () {
    'use strict';

    angular
        .module('app.payroll')
        .directive('otherDeduction', function() {
          return {
            controller: OtherDeductionCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/payroll/components/worker-detail/other-deduction.html',
            scope: {
              deduction: '=',
              index: '<',
              removeDeduction: '<',
              uploader: '<'
            }
          };
        });

    /* @ngInject */
    function OtherDeductionCtrl($state, $rootScope, $stateParams, $scope, config) {
        var that = this;
        that.scope = $scope;
        that.scope.pid = $stateParams.id;
        that.scope.item = $stateParams.item;
        that.scope.fileAttached = false;

        that.scope.uploader.filters.push({
            name: 'fileFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|pdf|'.indexOf(type) !== -1;
            }
        });

        that.scope.addAttachments = function(e, inputId) {
          /* jshint -W117 */
          e.preventDefault();
          $(inputId).trigger('click'); // TODO Remove Jquery dependency
        };

        that.scope.uploader.onAfterAddingFile = function(item) {
          that.scope.deduction.attachments.push({file: item, original_name: item.file.name });
        };
    }
})();
