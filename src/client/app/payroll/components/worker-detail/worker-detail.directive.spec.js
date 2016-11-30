// /* jshint -W117, -W030 */
// describe('worker detail', function() {
//   var $scope,
//     scope,
//     element,
//     template,
//     compile,
//     rootScope,
//     httpBackend,
//     infoLogger,
//     workermodel,
//     controller;
//
//   beforeEach(function() {
//
//     module('app.payroll');
//
//     inject(function($rootScope, $httpBackend, $controller, $compile,logger,WorkerModel) {
//       httpBackend = $httpBackend;
//       loggerInfo=logger;
//       compile = $compile;
//       rootScope = $rootScope;
//       scope = $rootScope.$new();
//       Worker_Model = WorkerModel;
//     });
//
//     rootScope.currentUser = {
//       first_name: 'user'
//     };
//
//     var classes = {};
//
//     var pay_details = {};
//
//     var worker ={
//         fica:11.5,
//         taxwh: 50,
//
//         pay_details:{
//           fica:20,
//           taxwh: 50
//         }
//     };
//
//     var workermodel = new Worker_Model(worker);
//
//     var mode ='view';
//
//     template = angular.element('<worker-detail worer="workermodel" mode="mode" classes="classes"></<worker-detail>');
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
//   describe('worker-detail should be created', function() {
//     it('should be created successfully', function() {
//
//
//     });
//   });
//
// });
