
/* jshint -W117, -W030 */
describe('dashbaord service', function() {
    var contracts = mockData.getMockContracts();
    var $httpFlush;

    beforeEach(function() {
        bard.appModule('app.payroll');
        bard.inject(this, '$httpBackend', '$rootScope', 'payrollActivitiesResource');
    });

    beforeEach(function() {
        $httpBackend.when('GET', '/api/contracts').respond(200, contracts);
        $httpFlush = $httpBackend.flush;
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function() {
        expect(payrollActivitiesResource).not.to.equal(null);
    });
});
