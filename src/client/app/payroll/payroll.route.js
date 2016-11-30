(function() {
    'use strict';

    angular
        .module('app.payroll')
        .run(payrollModule);

      /* @ngInject */
      function payrollModule(routerHelper, utils) {
        routerHelper.configureStates(getPayrollStates(utils));
      }

      var _resolver = {
        payrollReviewData: ['payrollReviewResource', '$q', '$stateParams',
          function(payrollReviewResource, $q, $stateParams) {
          var deferred = $q.defer();
          var success = function(data) { deferred.resolve(data); };
          var error = function(error) { deferred.reject('error'); };
          payrollReviewResource.get({id:$stateParams.id},success, error);
          return deferred.promise;
        }],

        contractWorkClasses: ['contractResource', '$q', '$stateParams',
          function(contractResource, $q, $stateParams) {
          var deferred = $q.defer();
          var success = function(data) { deferred.resolve(data); };
          var error = function(error) { deferred.reject('error'); };
          contractResource.getWorkClassifications({id:$stateParams.cnum},success, error);
          return deferred.promise;
        }],

        contracts: ['contractResource', '$q', '$stateParams',
          function(contractResource, $q, $stateParams) {
          var deferred = $q.defer();
          var success = function(data) { deferred.resolve(data); };
          var error = function(error) { deferred.reject('error'); };
          contractResource.query(success, error);
          return deferred.promise;
        }],

        payroll: ['payrollsResource', '$q', '$stateParams',
          function(payrollsResource, $q, $stateParams) {
          var deferred = $q.defer();
          var success = function(data) { deferred.resolve(data); };
          var error = function(error) { deferred.reject('error'); };
          payrollsResource.get({id: $stateParams.id},success, error);
          return deferred.promise;
        }],

        payrollDetails: ['payrollItemsResource', '$q', '$stateParams',
          function(payrollItemsResource, $q, $stateParams) {
          var deferred = $q.defer();
          var success = function(data) { deferred.resolve(data); };
          var error = function(error) { deferred.reject('error'); };
          payrollItemsResource.get({pid: $stateParams.id, id: $stateParams.item},success, error);
          return deferred.promise;
        }],

        payrollItemOtherDeductions: ['payrollsResource', '$q', '$stateParams',
          function(payrollsResource, $q, $stateParams) {
          var deferred = $q.defer();
          var success = function(data) { deferred.resolve(data); };
          var error = function(error) { deferred.reject('error'); };
          payrollsResource.getOtherDeductions({id: $stateParams.id},success, error);
          return deferred.promise;
        }],

        // Get all organizations
        organization: ['organizationResource', '$q', '$stateParams',
          function(organizationResource, $q, $stateParams) {
            var deferred = $q.defer();
            var success = function(data) { deferred.resolve(data); };
            var error = function(error) { deferred.reject('error'); };
            organizationResource.query(success, error);
            return deferred.promise;
        }],

        payrollFeedback: ['feedbackResource', '$q', '$stateParams',
          function(feedbackResource, $q, $stateParams) {
            var deferred = $q.defer();
            var success = function(data) { deferred.resolve(data); };
            var error = function(error) { deferred.reject('error'); };
            feedbackResource.get({ pid : parseInt($stateParams.id, 10)}, success, error);
            return deferred.promise;
        }]
      };

      var _base = {
          // Flag Issue Controller
          FlagIssueController: {
            template: '<flag-issue flag-type="ctrl.flagType" mode="ctrl.mode" ' +
              'payroll-details="ctrl.payrollDetails"></<flag-issue>',
            resolve: {
              payrollDetails: _resolver.payrollDetails
            },
            controllerAs: 'ctrl',
            controller: ['$scope', '$state', 'payrollDetails', function($scope, $state, payrollDetails){
              var that = this;
              that.mode = $state.current.data.mode;
              that.flagType = $state.current.data.flagType;
              that.payrollDetails = payrollDetails;
            }]
          },
          // Review Payroll Controller
          ReviewPayrollController: {
            resolve: {
              reviewData: _resolver.payrollReviewData
            },
            controllerAs: 'ctrl',
            controller: ['$scope', '$state', 'payroll', 'reviewData', '$rootScope',
              function($scope, $state, payroll, reviewData, $rootScope){
              var that = this;
              that.payroll = payroll;
              that.reviewData = reviewData;
              that.payrollUser = $rootScope.currentUser;
            }]
          }
      };

      /**
      States:
        /contract/:cnum/org/:org/payroll (abstract)
        /contract/:cnum/org/:org/payroll/new
        /contract/:cnum/org/:org/payroll/duplicate-payroll
        /contract/:cnum/org/:org/payroll/:id/no-work
        /contract/:cnum/org/:org/payroll/:id/worker-detail
        /contract/:cnum/org/:org/payroll/:id/sign-certify
        /contract/:cnum/org/:org/payroll/:id/review
        /contract/:cnum/org/:org/payroll/deductions
      **/
      function getPayrollStates(utils) {
        return [
          {
            state: 'payroll',
            abstract: true,
            config: {
              url: '/contracts/:cnum/orgs/:org/payrolls',
              template: '<ui-view></ui-view>',
              data: {
                  requireLogin: true
              }
            }
          },
          {
            state: 'payroll-new',
            config: {
              url: '/payrolls/new',
              template: '<new-payroll contracts="ctrl.contracts"></<new-payroll>',
              title: 'Add New Payroll',
              resolve: {
                contracts: _resolver.contracts
              },
              data: {
                  requireLogin: true
              },
              controllerAs: 'ctrl',
              controller: ['$scope', '$state', 'contracts', function($scope, $state, contracts, org){
                var that = this;
                that.contracts = contracts;
              }],
            }
          },
          {
            state: 'payroll.duplicate-payroll',
            config: {
              url: '/duplicate',
              template: '<duplicate-payroll></<duplicate-payroll>',
              title: 'Duplicate payroll',
              params: {weekEnd: '', payroll: null},
              controllerAs: 'ctrl',
              controller: ['$scope', '$state', function($scope, $state, org){
                var that = this;
              }],
            }
          },
          {
            state: 'payroll.view',
            abstract: true,
            config: {
              url: '/:id',
              template: '<ui-view></ui-view>',
              data: {},
              resolve: {
                payroll: _resolver.payroll
              }
            }
          },
          {
            state: 'payroll.view.deductions-issues',
            config: angular.extend({
              url: '/item/:item/view-deductions-issues',
              data: {
                mode: 'view',
                flagType: 'deductions'
              }
            }, _base.FlagIssueController)
          },
          {
            state: 'payroll.view.hours-and-earnings-issues',
            config: angular.extend({
              url: '/item/:item/view-hours-and-earnings-issues',
              data: {
                mode: 'view',
                flagType: 'hours-and-earnings'
              }
            }, _base.FlagIssueController)
          },
          {
            state: 'payroll.edit',
            abstract: true,
            config: {
              url: '/:id',
              template: '<ui-view></ui-view>',
              data: {},
              resolve: {
                payroll: _resolver.payroll
              }
            }
          },
          {
            state: 'payroll.edit.no-work',
            config: {
              url: '/no-work',
              template: '<no-work-payroll payroll="ctrl.payroll" org="ctrl.org"></<no-work-payroll>',
              controllerAs: 'ctrl',
              controller: ['$scope', '$state', 'payroll', function($scope, $state, payroll){
                var that = this;
                that.payroll = payroll;
              }],
            }
          },
          {
            state: 'payroll.edit.worker-detail',
            config: {
              url: '/worker-detail',
              template: '<worker-detail work-classes="ctrl.workClasses" ' +
              'org="ctrl.org" worker="ctrl.worker" mode="ctrl.mode"></worker-detail>',
              title: 'Add worker detail',
              resolve: {
                workClasses: _resolver.contractWorkClasses
              },
              data: {
                  mode: 'new'
              },
              controllerAs: 'ctrl',
              controller: ['$scope', '$state', 'workClasses', 'WorkerModel',
                function($scope, $state, workClasses, WorkerModel) {
                var that = this;
                that.mode = $state.current.data.mode;
                that.workClasses = workClasses;
                that.worker = new WorkerModel();
              }]
            }
          },
          {
            state: 'payroll.edit.worker-detail2',
            config: {
              url: '/worker-detail/:item/edit',
              template: '<worker-detail work-classes="ctrl.workClasses" ' +
              'org="ctrl.org" worker="ctrl.worker" mode="ctrl.mode"></worker-detail>',
              title: 'Edit worker detail',
              resolve: {
                workClasses: _resolver.contractWorkClasses,
                worker: _resolver.payrollDetails
              },
              data: {
                  mode: 'edit'
              },
              controllerAs: 'ctrl',
              controller: ['$scope', '$state', 'workClasses', 'worker', 'WorkerModel',
                function($scope, $state, workClasses, worker, WorkerModel) {
                var that = this;
                that.mode = $state.current.data.mode;
                that.workClasses = workClasses;
                that.worker = new WorkerModel(worker.pay_details[0]);
              }]
            }
          },
          {
            state: 'payroll.edit.sign-certify',
            config: {
              url: '/sign-certify',
              template: '<sign-certify-payroll payroll="ctrl.payroll" org="ctrl.org" ' +
                'feedback="ctrl.feedback" deductions="ctrl.deductions"></<sign-certify-payroll>',
              controllerAs: 'ctrl',
              resolve: {
                deductions: _resolver.payrollItemOtherDeductions,
                feedback: _resolver.payrollFeedback,
                payroll: _resolver.payroll
              },
              controller: ['$scope', '$state', 'payroll', 'deductions', 'feedback',
                function($scope, $state, payroll, deductions, feedback){
                var that = this;
                that.deductions = deductions;
                that.feedback = feedback;
                that.payroll = payroll;
              }]
            }
          },
          {
            state: 'payroll.edit.reviews-hours-and-earnings',
            config: angular.extend({
              url: '/reviews-hours-and-earnings',
              template: '<review-payroll payroll-user="ctrl.payrollUser" payroll="ctrl.payroll" ' +
                'review-data="ctrl.reviewData"></<review-payroll>',
            }, _base.ReviewPayrollController)
          },
          {
            state: 'payroll.edit.review-deductions',
            config: angular.extend({
              url: '/review-deductions',
              template: '<review-deductions payroll-user="ctrl.payrollUser" ' +
                'payroll="ctrl.payroll" review-data="ctrl.reviewData"></<review-deductions>'
            }, _base.ReviewPayrollController)
          },
          {
            state: 'payroll.edit.deductions-issues',
            config: angular.extend({
              url: '/item/:item/edit-deductions-issues',
              data: {
                mode: 'edit',
                flagType: 'deductions'
              }
            }, _base.FlagIssueController)
          },
          {
            state: 'payroll.edit.hours-and-earnings-issues',
            config: angular.extend({
              url: '/item/:item/edit-hours-and-earnings-issues',
              data: {
                mode: 'edit',
                flagType: 'hours-and-earnings'
              }
            }, _base.FlagIssueController)
          }
        ];
      }

})();
