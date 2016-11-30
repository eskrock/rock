/* jshint -W117, -W030 */
describe.skip('app.contracts', function() {
    var element;
    //var customers = mockData.getMockCustomers();

    beforeEach(function() {
        bard.appModule('app.contracts');
        bard.inject(this, '$compile', '$rootScope', '$log', '$state');
    });

    beforeEach(function() {
        var template = angular.element('<contract-dashboard><ui-view/></contract-dashboard');
        element = $compile(template)($rootScope);
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Contract Dashboard', function() {
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
