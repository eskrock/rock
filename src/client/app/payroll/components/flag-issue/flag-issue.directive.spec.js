// /* jshint -W117, -W030 */
// describe('Flag issue', function() {
//   var $scope,
//     scope,
//     element,
//     template,
//     compile,
//     rootScope,
//     httpBackend,
//     infoLogger,
//     controller;
//
//   beforeEach(function() {
//
//     module('app.payroll');
//
//     inject(function($rootScope, $httpBackend, $controller, $compile,logger) {
//       httpBackend = $httpBackend;
//       loggerInfo=logger;
//       compile = $compile;
//       rootScope = $rootScope;
//       scope = $rootScope.$new();
//     });
//
//     // rootScope.currentUser = {
//     //   first_name: 'user'
//     // };
//
//     var flagType = 'HOURS_AND_EARNINGS';
//     var mode = {};
//     var payrollDetails = {
//       pay_details:[{id:1}]
//     };
//
//
//     template = angular.element('<flag-issue flagType="flagType"
//mode="mode" payrollDetails="payrollDetails"></<flag-issue>');
//     element = compile(template)(scope);
//     scope.$digest();
//
//   });
//
//   afterEach(function() {
//     httpBackend.verifyNoOutstandingExpectation();
//     httpBackend.verifyNoOutstandingRequest();
//   });
//
//   describe('flag issue', function() {
//     it('should be created successfully', function() {
//       // TODO:
//       // var log = sinon.spy(loggerInfo, 'info');
//       // console.log(element);
//       // var save = sinon.stub(element.isolateScope(),'save');
//       // var stu = sinon.stub(element.isolateScope().certify,'certification');
//       // var log = sinon.spy(element.isolateScope(), 'certify');
//       // element.isolateScope().certify();
//       // sinon.assert.calledOnce(log);
//
//       // expect(element.isolateScope().certify).not.to.equal(null);
//       // expect(element.isolateScope().certify).not.to.equal(null);
//       // // expect(element.isolateScope().feedbackError()).not.to.equal(null);
//       // // expect(loggerInfo.info).toHaveBeenCalled();
//       //   element.isolateScope().feedbackError;
//       //   element.isolateScope().download();
//       //   expect(element).to.be.defined;
//
//     });
//   });
//
// });
