/* jshint -W117, -W030 */
describe('Sign and Certify', function() {
   var $scope,
     scope,
     element,
     template,
     compile,
     rootScope,
     stateProvider,
     httpBackend,
     state,
     controller;

   beforeEach(function() {

     module('app.payroll');

     inject(function($rootScope, $httpBackend, $controller, $compile, $state) {
       httpBackend = $httpBackend;
       compile = $compile;
       rootScope = $rootScope;
       state = $state;
       scope = $rootScope.$new();
     });

    rootScope.currentUser = {
      first_name: 'user'
     };

     var payroll = {id:1};
     var org = {};

     template = angular.element('<no-work-payroll></<no-work-payroll>');
     element = compile(template)(scope);
     scope.$digest();

   });

   afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

   describe('no work payroll should be created', function() {
     it('should be created successfully', function() {
       expect(element).to.be.defined;
     });
   });

   describe('certify function', function() {
     it('should be created successfully', function() {
       element.isolateScope().payroll = {id:1};
       expect(element.isolateScope().certify()).to.be.defined;

     });
   });
 });
