/* jshint -W117, -W030 */
describe('String filter', function() {
   var $scope,
     scope,
     element,
     template,
     compile,
     rootScope,
     stateProvider,
     httpBackend,
     createFilter,
     filter,
     controller;

   beforeEach(function() {

     module('app.core');

     inject(function($rootScope, $httpBackend, $controller, $compile, $filter) {
       httpBackend = $httpBackend;
       compile = $compile;
       rootScope = $rootScope;
       filter = $filter;
       scope = $rootScope.$new();
     });

    rootScope.currentUser = {
      first_name: 'user'
     };

   });

   beforeEach(inject(function($filter) {
      createFilter = function() {
        return $filter('strLimit');
      };
    }));

   describe('filter should work', function() {
     it('should be created successfully', function() {
       expect(filter('strLimit')).to.be.defined;
     });

     it('should should trim to 255 chars', function(){
       var filter = createFilter();
       expect(filter('sample text',255)).to.equal('sample text');
     });
   });

 });
