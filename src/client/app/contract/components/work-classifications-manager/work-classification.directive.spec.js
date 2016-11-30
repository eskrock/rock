/* jshint -W117, -W030 */
describe.skip('Work classifications', function() {
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

     module('app.contracts');

     inject(function($rootScope, $httpBackend, $controller, $compile, $state) {
      //  httpBackend = $httpBackend;
       compile = $compile;
       rootScope = $rootScope;
       state = $state;
       scope = $rootScope.$new();
     });

    // rootScope.currentUser = {
    //   first_name: "user"
    //  };

     var mode = 'view';
     var contract = {};
     workclassifications = {};

     template = angular.element('<work-classifications-manager mode="mode" contract="contract" ' +
      ' workclassifications="workclassifications"></work-classifications-manager>');
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
      //  console.log();(element.isolateScope().addWorkClassifications());
        expect(element.isolateScope().certify()).to.be.defined;
     });
   });
 });
