// /* jshint -W117, -W030 */
// describe('project info', function() {
//    var $scope,
//      scope,
//      element,
//      template,
//      compile,
//      rootScope,
//      stateProvider,
//      httpBackend,
//      state,
//      user,
//      controller;
//
//    beforeEach(function() {
//
//      module('app.contracts');
//
//      inject(function($rootScope, $httpBackend, $controller, $compile, $state) {
//        httpBackend = $httpBackend;
//        compile = $compile;
//        rootScope = $rootScope;
//        state = $state;
//        scope = $rootScope.$new();
//      });
//
//     rootScope.currentUser = {
//       id: 1
//      };
//      var contract ={
//        id:1
//      };
//
//      var organizations ={
//        id:1
//      };
//
//      var contractingOfficer= {id:1};
//
//      template = angular.element('<project-info user="user"
//contract="contract" organizations="organizations" contractingOfficer="contractingOfficer"></<project-info>');
//     //  element = compile(template)(scope);
//     //  scope.$digest();
//
//    });
//
//    afterEach(function() {
//      httpBackend.verifyNoOutstandingExpectation();
//      httpBackend.verifyNoOutstandingRequest();
//    });
//
//    describe('element should be created', function() {
//
//      it('profile should be created successfully', function() {
//       //  expect(element).to.be.defined;
//      });
//
//      it('should contain project information', function() {
//       //  element.isolateScope().payroll = {id:1};
//       //  scope.$apply();
//       //  element.isolateScope().save(rootScope.currentUser);
//      });
//
//    });
//
//  });
