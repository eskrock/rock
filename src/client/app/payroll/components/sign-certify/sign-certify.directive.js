(function () {
  'use strict';

  angular
    .module('app.payroll')
    .directive('signCertifyPayroll', function() {
      return {
        restrict: 'E',
        controller: SignCertifyCtrl,
        controllerAs: 'ctrl',
        templateUrl: 'app/payroll/components/sign-certify/sign-certify.html',
        scope: {
          deductions: '<',
          feedback: '=feedback',
          payroll: '<'
        }
      };
    });

  /* @ngInject */
  /* jshint -W072 */
  function SignCertifyCtrl($rootScope, $state, $stateParams, $scope, logger,
    moment, CertificationModel, FeedbackModel, payrollCertResource, feedbackResource) {
    var that = this;
    that.scope = $scope;
    that.scope.week_start = moment(that.scope.payroll.week_end).day('Sunday').format('YYYY-MM-DD');
    that.scope.certification = new CertificationModel();
    that.scope.certification.signed_by = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
    that.scope.certification.signed_by_title = $rootScope.currentUser.title;

    that.scope.certify = function() {
      var certification = that.scope.certification;
      certification.payroll_id = parseInt($stateParams.id, 10);
      that.scope.feedback.payroll_id = parseInt($stateParams.id,10);
      var error = function(){ logger.error('Error signing payroll'); };
      var success = function(result) {
        logger.info('Payroll signed successfully');
        $state.go('dashboard');
      };

      var feedbackError = function(){logger.error('Error Creating Feedback');};
      var feedbackSuccess = function(){
        logger.info('Feedback Created Successfully');
        payrollCertResource.certify(certification, success, error);
      };

      if($scope.certifyForm.$valid) {
        feedbackResource.create(that.scope.feedback, feedbackSuccess, feedbackError);
      }
    };

    that.scope.download = function() {
      logger.info('Not Implemented');
    };
  }
})();
