/* jshint -W117, -W030 */
describe('Login', function() {
  var $scope,
    scope,
    element,
    template,
    compile,
    rootScope,
    stateProvider,
    httpBackend,
    state,
    $log,
    auth,
    controller;


    beforeEach(function() {
        module('app.core');
        inject(function($rootScope, $httpBackend, $controller, $compile,$auth, $state) {
          httpBackend = $httpBackend;
          compile = $compile;
          rootScope = $rootScope;
          state = $state;
          auth= $auth,
          scope = $rootScope.$new();
        });

        template = angular.element('<login></<login>');
        element = compile(template)(scope);
        scope.$digest();

    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('login', function() {
        it('should be created successfully', function () {
            expect(element).to.be.defined;
        });

        it('authenticate', function(){
          var provider={
            oauthType:null
          };
          // sinon.stub(scope.authenticate(),'$auth',function(provider){return 0;});
          // sinon.stub(scope.authenticate().$auth(),'authenticate');

          // var provider = { oauthType:'none' };
          // scope.authenticate(provider);
            // expect(scope.authenticate).not.to.equal(null);
        });
    });
});
