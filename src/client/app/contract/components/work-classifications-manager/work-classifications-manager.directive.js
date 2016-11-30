(function () {
    'use strict';

    angular
        .module('app.contracts')
        .directive('workClassificationsManager', WorkClassificationsManagerDirective);

    /* @ngInject */
    function WorkClassificationsManagerCtrl($state, $scope, $filter, dataservice,
        logger, contractResource, countiesresource, classificationsresource,
        WorkclassificationModel) {
        var that = this;
        that.title = 'Work Classifications Manager';
        that.list = [];
        that.scope = $scope;
        that.scope.counties = [];
        that.scope.constructionType = '';
        that.scope.results = [];
        that.scope.showSearchResults = false;
        that.scope.query = {
          state: '',
          county: '',
          name: ''
        };
        that.scope.$watch(function(){ return that.scope.query.state; },
          function() { getAllCountiesOfAState(that.scope.query.state); });
        that.scope.searchWorkClassifications = searchWorkClassifications;
        that.scope.stripCountryName = stripCountryName;
        that.scope.addToWorkClassificationsList = addToWorkClassificationsList;
        that.scope.addWorkClassifications = addWorkClassifications;
        that.scope.save = save;

        activate();

        function activate() {
          logger.info('Activated Work Classifications Manager View');
        }

        that.scope.typeFilter = 'all';

        that.scope.listFilter = function(constructionType) {
          /* jshint -W074 */
          var type = 'all';
          if(constructionType === 'Heavy') {
            type = 'Heavy';
          } else if(constructionType === 'Residential') {
            type = 'Residential';
          } else if(constructionType === 'Highway') {
            type = 'Highway';
          } else if(constructionType === 'Building') {
            type = 'Building';
          } else {
            type = 'all';
          }

          that.scope.typeFilter = type;
        };

        that.scope.selectedAll = false;

        that.scope.checkAll = function() {
          var bool = true;
          if (that.scope.selectedAll) {
            bool = false;
          }
          angular.forEach(that.scope.results, function(v, k) {
            v.checked = !bool;
            that.scope.selectedAll = !bool;
          });
        };

        function stripCountryName(name) {
          if (name) {
            return name.replace('County', '').trim();
          }
        }

        function addWorkClassifications() {
          var list = $filter('filter')(that.scope.results, { checked: 'YES' });
          if (list.length > 0) {
            var number = that.scope.contract.num;
            angular.forEach(list, function(cls, index) {
              var model = new WorkclassificationModel();
              model.work_code = cls.occupation;
              model.description = cls.rateName;
              model.notes = cls.occupationQualifier;
              model.rate = cls.dollarsPerHour;
              model.fringe = cls.fringe;

              var error = function() {logger.info('Error on saving the contract');};
              var success = function(result) {
                  if (index === list.length - 1){
                      that.scope.showSearchResults = false;
                      that.scope.results = [];
                      contractResource.getWorkClassifications({id:number}, function(workclassifications) {
                          that.scope.workclassifications = workclassifications;
                      }, function() {
                          logger.info('Error adding contract workclassifications with id: ' + number);
                      });
                  }
              };

              contractResource.saveWorkClassifications({id:number}, model, success, error);
            });
          }
        }

        function addToWorkClassificationsList(cls) {
          var model = new WorkclassificationModel();
          model.work_code = cls.name;
          model.note = cls.note;
          model.rate = cls.name;
          model.fringe = cls.fringe;
          //that.list.push();
        }

        function searchWorkClassifications() {
          var success = function(results) {
            that.scope.showSearchResults = true;
            that.scope.results = results;
          };
          var error = function(error) {
            logger.info('Failed to fetch all counties of' + that.scope.query.state);
          };
          classificationsresource.query({
              state:that.scope.query.state,
              county:that.scope.query.county,
              name:that.scope.query.name
            }, success, error);
        }

        function getAllCountiesOfAState(state) {
          if (state === '') {
            return;
          }
          var success = function(counties) {
            that.scope.counties = counties;
          };
          var error = function(error) {
            logger.info('Failed to fetch all counties of' + state);
          };
          countiesresource.query({state:state},success, error);
        }

        function save() {
            var number = that.scope.contract.num,
                contract = that.scope.contract;

            contract.status = 'complete';
            var error = function() {logger.info('Error on saving the contract');};
            var success = function(result) {
              logger.info('Contract saved successfully with id: ' + number);
            };
            contractResource.update({id:number}, contract, success, error);
        }
    }

    function WorkClassificationsManagerDirective() {
      return {
        restrict: 'E',
        controller: WorkClassificationsManagerCtrl,
        controllerAs: 'controller',
        templateUrl: 'app/contract/components/work-classifications-manager/views/work-classifications-manager.html',
        scope: {
          mode: '=mode',
          contract: '=contract',
          workclassifications: '=workclassifications',
        }
      };
    }
})();
