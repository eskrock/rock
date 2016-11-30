/* jshint -W117, -W030 */
describe('layout', function() {
  describe('header', function() {

      var controller,
          scope;

      beforeEach(module('app.layout'));

      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
          controller = $controller('Header',{$scope: scope});
      }));

      describe('Header controller', function() {
          it('should be created successfully', function() {
              expect(scope.logout()).to.be.defined;
              expect(scope.isAuthenticated()).to.be.defined;
              expect(scope.isLoginScreen()).to.be.defined;
              expect(scope).to.be.defined;
          });
      });
  });
});
