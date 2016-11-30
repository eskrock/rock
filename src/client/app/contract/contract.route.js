(function() {
    'use strict';

    angular
        .module('app.contracts')
        .run(appRun);

    var _base = {
        // Work Classifications Controller
        workclassificationsController: {
            controllerAs: 'c',
            controller: ['$scope', '$state', 'contract', 'workclassifications',
              function($scope, $state, contract, workclassifications){
                var that = this;
                that.mode = $state.current.data.mode;
                that.contract = contract;
                that.workclassifications = workclassifications;
            }]
        },

        // Project info
        subcontractorsController: {
            controllerAs: 'c',
            controller: ['$scope', '$state', 'contract', 'subcontractors',
              function($scope, $state, contract, subcontractors){
                var that = this;
                that.mode = $state.current.data.mode;
                that.contract = contract;
                that.subcontractors = subcontractors;
            }]
        },

        // Project info
        projectInfoController: {
            controllerAs: 'c',
            controller: ['$scope', '$state', 'contract', 'organizations', 'contractingOfficer',
              function($scope, $state, contract, organizations, contractingOfficer){
                var that = this;
                that.mode = $state.current.data.mode;
                that.contract = contract;
                that.organizations = organizations;
                that.contractingOfficer = contractingOfficer;
            }]
        },

        // Contract editor
        contractViewController: {
            controllerAs: 'c',
            controller: ['$scope', '$state', 'contract', 'subcontractors', 'workclassifications', 'contractingOfficer',
              function($scope, $state, contract, subcontractors, workclassifications, contractingOfficer){
                var that = this;
                that.mode = $state.current.data.mode;
                that.contract = contract;
                that.contractingOfficer = contractingOfficer;
                that.workclassifications = workclassifications;
                that.subcontractors = subcontractors;
            }]
        }
    };

    var _resolve = {
        // Get contracting officer info
        contractingOfficer: ['$stateParams', 'config', '$rootScope',
          function($stateParams, config, $rootScope) {
            return $rootScope.currentUser;
        }],

        // Get all organizations
        organizations: ['organizationResource', '$q', '$stateParams',
          function(organizationResource, $q, $stateParams) {
            var deferred = $q.defer();
            var success = function(data) { deferred.resolve(data); };
            var error = function(error) { deferred.reject('error'); };
            organizationResource.query(success, error);
            return deferred.promise;
        }],

        // Get all work classifications for a contract
        workclassifications: ['contractResource', '$q', '$stateParams',
          function(contractResource, $q, $stateParams) {
            var deferred = $q.defer();
            var success = function(data) { deferred.resolve(data); };
            var error = function(error) { deferred.reject('error'); };
            contractResource.getWorkClassifications({id:$stateParams.id},success, error);
            return deferred.promise;
        }],

        // Get all sub-contractors for a contract
        subcontractors: ['contractResource', '$q', '$stateParams',
          function(contractResource, $q, $stateParams) {
            var deferred = $q.defer();
            var success = function(data) { deferred.resolve(data); };
            var error = function(error) { deferred.reject('error'); };
            contractResource.getSubcontractors({id:$stateParams.id},success, error);
            return deferred.promise;
        }],


        // Get new contract
        /* jshint -W106 */
        contract: ['contractResource', '$q', '$stateParams', 'ContractModel',
          function(contractResource, $q, $stateParams, ContractModel) {
            var deferred = $q.defer();
            var success = function(contract) {
              var model = angular.extend(new ContractModel(), {
                num: contract.num,
                prime_id: contract.prime_id,
                prime: contract.prime,
                start_date: contract.start_date,
                title: contract.title,
                status: contract.status,
                street: contract.street,
                city: contract.city,
                state: contract.state,
                zip: contract.zip,
                co: contract.co,
                notify_at: contract.notify_at
              });
              deferred.resolve(model);
            };
            var error = function(error) { deferred.reject('error'); };
            contractResource.get({id:$stateParams.id},success, error);
            return deferred.promise;
        }],

        // Get new contract
        newContract: ['$q', '$log', '$timeout', 'ContractModel',
          function($q, log, $timeout, ContractModel) {
            var deferred = $q.defer();
            var model = new ContractModel();
            model.status = 'new';
            $timeout(function() {deferred.resolve(model);}, 10);
            return deferred.promise;
        }],
    };

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    /*
      /contract  - [contract - abstract]
      /contract/ - [contract.dashboard]

      /contract/new - [contract.new]

      /contract/:id/view  - [contract.edit - abstract]
      /contract/:id/view/projectinfo  - [contract.view.projectinfo]
      /contract/:id/view/subcontractors  - [contract.view.subcontractors]
      /contract/:id/view/workclassifications  - [contract.view.workclassifications]

      /contract/:id/edit  - [contract.edit - abstract]
      /contract/:id/edit/projectinfo  - [contract.edit.projectinfo]
      /contract/:id/edit/subcontractors  - [contract.edit.subcontractors]
      /contract/:id/edit/workclassifications  - [contract.edit.workclassifications]

      <contract-editor mode='c.mode' contract='c.contract' state=''></<contract-editor>
    */

    function getStates() {
        return [
            {
                state: 'contract',
                config: {
                    abstract: true,
                    template: '<div ui-view class="usa-grid ng-scope"></div>',
                    url: '/contracts',
                    data: {
                        requireLogin: true,
                    }
                }
            },
            {
                state: 'contract.dashboard',
                config: angular.extend({
                    url: '/',
                    template: '<contract-dashboard contracts="c.contracts" co="c.co"></contract-dashboard>',
                    title: 'Contract Dashboard',
                    data: {
                        requireLogin: true,
                        permissions: ['co']
                    },
                    controllerAs: 'c',
                    controller: ['$scope', '$state', 'contracts',
                      function($scope, $state, contracts){
                        var that = this;
                        that.contracts = contracts;
                    }],
                    resolve: {
                      /* @ngInject */
                      contracts: ['contractResource', '$q', '$stateParams',
                        function(contractResource, $q, $stateParams) {
                          var deferred = $q.defer();
                          var success = function(data) { deferred.resolve(data); };
                          var error = function(error) { deferred.reject('error'); };
                          contractResource.query(success, error);
                          return deferred.promise;
                      }]
                    }
                })
            },
            {
                state: 'contract.new',
                config: angular.extend({
                    url: '/new',
                    template: '<project-info mode="c.mode" contract="c.contract" ' +
                      'organizations="c.organizations" co="c.contractingOfficer"> </project-info>',
                    title: 'Contract Editor',
                    data: {
                        mode: 'new'
                    },
                    resolve: {
                        contract: _resolve.newContract,
                        organizations: _resolve.organizations,
                        contractingOfficer: _resolve.contractingOfficer
                    }
                }, _base.projectInfoController)
            },
            /*
              Route: /contract/:id/edit
              State: contract.edit
              Description: An abstract route to fetch an existing contract details
            */
            {
                state: 'contract.view',
                config: angular.extend({
                    url: '/:id',
                    template: '<contract-viewer mode="c.mode" contract="c.contract" ' +
                      'co="c.contractingOfficer" subcontractors="c.subcontractors" ' +
                      'workclassifications="c.workclassifications"></contract-viewer>',
                    title: 'Contract Viewer',
                    data: {
                        mode: 'view'
                    },
                    resolve: {
                        contract: _resolve.contract,
                        contractingOfficer: _resolve.contractingOfficer,
                        workclassifications: _resolve.workclassifications,
                        subcontractors: _resolve.subcontractors,
                    }
                }, _base.contractViewController)
            },
            {
                state: 'contract.edit',
                config: {
                    url: '/:id/edit',
                    abstract: 'true',
                    template: '<ui-view></ui-view>',
                    data: {
                        mode: 'edit'
                    },
                    resolve: {
                        contract: _resolve.contract
                    }
                }
            },
            /*
              Route: /contract/:id/edit/projectinfo
              State: contract.edit.projectinfo
              Description: Allows to update project information of an existing contract
            */
            {
                state: 'contract.edit.projectinfo',
                config: angular.extend({
                    url: '/projectinfo',
                    template: '<project-info mode="c.mode" contract="c.contract" ' +
                      'organizations="c.organizations" co="c.contractingOfficer"></project-info>',
                    resolve: {
                        organizations: _resolve.organizations,
                        contractingOfficer: _resolve.contractingOfficer
                    }
                }, _base.projectInfoController)
            },
            /*
              Route: /contract/:id/edit/subcontractors
              State: contract.edit.subcontractors
              Description: Allows to add subcontractors to an existing contract
            */
            {
                state: 'contract.edit.subcontractors',
                config: angular.extend({
                    url: '/subcontractors',
                    template: '<subcontractors-manager mode="c.mode" contract="c.contract" ' +
                      'subcontractors="c.subcontractors"></subcontractors-manager>',
                    resolve: {
                        subcontractors: _resolve.subcontractors
                    }
                }, _base.subcontractorsController)
            },
            /*
              Route: /contract/:id/edit/workclassifications
              State: contract.edit.workclassifications
              Description: Allows to add work classifications to an existing contract
            */
            {
                state: 'contract.edit.workclassifications',
                config: angular.extend({
                    url: '/workclassifications',
                    template: '<work-classifications-manager mode="c.mode" contract="c.contract" ' +
                      'workclassifications="c.workclassifications"></work-classifications-manager>',
                    resolve: {
                      contract: _resolve.contract,
                      workclassifications: _resolve.workclassifications
                    }
                }, _base.workclassificationsController)
            }
        ];
    }
})();
