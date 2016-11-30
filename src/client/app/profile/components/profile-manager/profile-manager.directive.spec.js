/* jshint -W117, -W030 */
describe('app.contracts', function() {
    var element;
    //var customers = mockData.getMockCustomers();

    beforeEach(function() {
        bard.appModule('app.profile');
        bard.inject(this, '$compile', '$rootScope', '$log', '$state');
    });

    beforeEach(function() {
        var template = angular.element('<profile-manager></profile-manager');
        element = $compile(template)($rootScope);
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Profile Manager Componenet should be created', function() {
        it('should be created successfully', function () {
            expect(element).to.be.defined;
        });

        describe('after activate', function() {
            it('should have logged "Activated"', function() {
              expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});
