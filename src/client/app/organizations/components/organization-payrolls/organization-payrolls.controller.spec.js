/* jshint -W117, -W030 */
describe('Dashboard', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('app.dashboard');
        bard.inject(this, '$controller', '$q', '$rootScope');
    });

    beforeEach(function() {
      resource = { sendPayrolls: function() {}};
      controller = $controller('Dashboard', {
          $scope: { $watch: function() {} },
          activities: {},
          payrollActivitiesResource: resource
        });
      $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Dashboard controller', function() {
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Dashboard', function() {
                expect(controller.title).to.equal('Dashboard');
            });
        });
    });
});
