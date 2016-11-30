/* jshint -W117, -W030 */
describe('User info', function() {
   var $scope,
     scope,
     element,
     template,
     compile,
     rootScope,
     stateProvider,
     httpBackend,
     state,
     user,
     controller;

   beforeEach(function() {

     module('app.profile');

     inject(function($rootScope, $httpBackend, $controller, $compile, $state) {
       httpBackend = $httpBackend;
       compile = $compile;
       rootScope = $rootScope;
       state = $state;
       scope = $rootScope.$new();
     });

    rootScope.currentUser = {
      id: 1
     };
     var user ={
       id:1
     };

     template = angular.element('<user-info user="user"></<user-info>');
     element = compile(template)(scope);
     scope.$digest();

   });

   afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

   describe('element should be created', function() {

     it('profile should be created successfully', function() {
       expect(element).to.be.defined;
     });

     it('should contain profile information', function() {
       element.isolateScope().user = {id:1};
       element.isolateScope().payroll = {id:1};
       scope.$apply();
       element.isolateScope().save(rootScope.currentUser);
     });

   });

 });
