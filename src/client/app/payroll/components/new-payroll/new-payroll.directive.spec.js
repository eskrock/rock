/* jshint -W117, -W030 */
describe('New Payroll Directive', function() {
   var $scope,
     scope,
     element,
     template,
     compile,
     rootScope,
     httpBackend,
     controller;

   beforeEach(function() {

     module('app.payroll');

     inject(function($rootScope, $httpBackend, $controller, $compile) {
       httpBackend = $httpBackend;
       compile = $compile;
       rootScope = $rootScope;
       scope = $rootScope.$new();
     });

     rootScope.currentUser = {
      organization_id: 1
     };
     var contracts = {id:1};
     var org = {};

     template = angular.element('<new-payroll contract="contracts" org="org"></<new-payroll>');
     element = compile(template)(scope);
     scope.$digest();

   });

   afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

   describe('new payroll should be created', function() {
     it('should be created successfully', function() {
       expect(element).to.be.defined;
     });

     it('should create payroll', function() {
       httpBackend.when('POST', 'http://localhost:8000/api/payrolls')
          .respond({});
       expect(element.isolateScope().create()).to.be.defined;
       httpBackend.flush();
       expect(element.isolateScope().entry_method).to.equal('manual_entry');
     });

     it('payroll return should not be null', function() {
       httpBackend.when('POST', 'http://localhost:8000/api/payrolls')
          .respond({});
          scope.$apply();
       expect(element.isolateScope().payroll).to.not.be.null;
     });

   });


 });
