/* jshint -W117, -W030 */
describe('User Dashboard', function() {
   var $scope,
     scope,
     element,
     template,
     rootScope,
     compile;

     var user = {
       organization_id:1
     };
     var currentUser = {
       organization_id:1
     };
      var data = {
        id:1
      };

   beforeEach(function() {
     module('app.admin');
     inject(function($compile, $rootScope) {
       compile = $compile;
       scope = $rootScope.$new();
     });

  // beforeEach(module(function($provide) {
  //   $provide.service('usersResource', function($q) {});
  // }));

     template = angular.element('<user-dashboard user="user" currentUser="currentUser"></<user-dashboard>');
     element = compile(template)(scope);
     scope.$digest();

   });

   describe('User Dashboard shoul be displayed', function() {
     it('should be created successfully', function() {
       expect(element).to.be.defined;
     });
   });

   describe('should toggle', function() {
     it('should toggle creation', function() {
      element.isolateScope().saveRow(user);
      element.isolateScope().currentUser = currentUser;
      element.isolateScope().toggleCreate();
      expect(element.isolateScope().userCreate).to.equal(true);
      element.isolateScope().inviteUser(user);

     });
   });
 });
