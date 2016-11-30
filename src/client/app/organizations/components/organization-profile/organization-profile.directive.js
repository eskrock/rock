(function () {
    'use strict';

    angular
        .module('app.organizations')
        .directive('organizationProfile', OrganizationProfileDirective);

    /* @ngInject */
    function OrganizationProfileCtrl($state,$scope,logger, organizationResource) {
        var that = this;
        that.scope = $scope;
        function fetchDetail(contract) {
            var error = function() {
                logger.info('Error on fetching details');
            };
            var success = function(result) {
              logger.info('details fetched successfully');
              //flatten the hierarchy to simplify template
              var flat_hierarchy = [];
              var level = 0;
              if (result.parent) {
                  flat_hierarchy.push({
                      id: result.parent.id,
                      name: result.parent.name,
                      start_date: result.parent.start_date,//Should this be visible to a sub? It is a pain to fetch
                      level: styleGuide(level)
                  });
                  level += 1;
              }
              // Add yourself
              flat_hierarchy.push({
                  id: result.self.id,
                  name: result.self.name,
                  start_date: result.my_start_date,
                  level: styleGuide(level) + ' row-bold'
              });
              //Add children
              if (result.children.length) {
                  level += 1;
                  result.children.forEach(function(child){
                      //Add self
                      flat_hierarchy.push({
                          id: child.id,
                          name: child.name,
                          start_date: child.start_date,
                          level: styleGuide(level)
                      });
                      if (child.children.length) {
                          level += 1;
                          child.children.forEach(function(grandchild) {
                              flat_hierarchy.push({
                                  id: grandchild.id,
                                  name: grandchild.name,
                                  start_date: grandchild.start_date,
                                  level: styleGuide(level)
                              });
                          });
                          level -= 1;
                      }
                  });
              }
              result.flat_hierarchy = flat_hierarchy;
              contract.details = result;
              contract.active = true;
            };
            if (contract.details === null) {
                organizationResource.contractDetails({ id: contract.org_id, contractid: contract.id }, success, error);
            }
            contract.active = !contract.active;
        }
        that.scope.fetchDetail = fetchDetail;
        activate();

        function styleGuide(level) {
            switch (level) {
                case 0:
                    return 'hierarchy-row-top';
                case 1:
                    return 'hierarchy-row-sub';
                case 2:
                    return 'hierarchy-row-sub-sub';
                case 3:
                    return 'hierarchy-row-sub-sub-sub';
                default:
                    return '';
            }

        }
        function activate() {
          logger.info('Organization Profile view activated');
        }
    }

    function OrganizationProfileDirective() {
      return {
        restrict: 'E',
        controller: OrganizationProfileCtrl,
        controllerAs: 'controller',
        scope: {
            contracts: '=contracts'
        },
        templateUrl: 'app/organizations/components/organization-profile/organization-profile.html'
      };
    }
})();
