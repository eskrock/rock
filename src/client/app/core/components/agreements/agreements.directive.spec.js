// describe('agreements', function() {
//     var element;
//
//     beforeEach(module('ui.router'));
//
//     beforeEach(function() {
//         bard.inject(this, '$compile', '$rootScope', '$log', '$state');
//     });
//
//     beforeEach(function() {
//         var template = angular.element('');
//         element = $compile(template)($rootScope);
//         $rootScope.$apply();
//     });
//
//     bard.verifyNoOutstandingHttpRequests();
//
//     describe('contractor agreements', function() {
//         it('should be created successfully', function () {
//             expect(element).to.be.defined;
//         });
//     });
// });

/* jshint -W117, -W030 */
describe.skip('agreements', function() {
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
// beforeEach(module('app.core'));

  // beforeEach(module(function($provide) {
  //      $provide.service('userresource', function($q) {});
  // }));

   beforeEach(function() {

     inject(function($rootScope, $httpBackend, $controller, $compile) {
       httpBackend = $httpBackend;
       compile = $compile;
       rootScope = $rootScope;
       scope = $rootScope.$new();
     });

    rootScope.currentUser = {
      first_name: 'user'
     };
    //
    // module(function($provide){
    //     $provide.service('userresource', function($q){
    //
    //     });
    // });

     var mode = 'view';
     var contract = {};
     workclassifications = {};

     template = angular.element('<agreements></agreements>');
     element = compile(template)(scope);
     scope.$digest();

   });

   afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

   describe('agreements should be created', function() {
     it('should be created successfully', function() {
      //  httpBackend.expectGET('http://localhost:8000/api/me')
      //           .respond({server_list: serverList});
      //  expect(element.isolateScope().title).to.be.defined;
      // console.log(element);
      // console.log(element.isolateScope().title);
      // console.log('--------------');
     });
   });

 });
