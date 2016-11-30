/* jshint -W117, -W030 */
describe('payroll service', function() {
    var contracts = mockData.getMockContracts();
    var $httpFlush;

    beforeEach(function() {
        bard.appModule('app.payroll');
        bard.inject(this, '$httpBackend', '$rootScope',
      'payrollItemsResource','payrollWorkerResource',
      'payrollDeductionsResource', 'payrollCertResource',
      'payrollDuplicateResource','payrollResource',
      'payrollReviewResource', 'payrollFlagIssueResource',
      'feedbackResource');
    });

    // beforeEach(function() {
    //     $httpBackend.when('GET', '/api/contracts').respond(200, contracts);
    //     $httpFlush = $httpBackend.flush;
    // });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function() {
        expect(payrollItemsResource).not.to.equal(null);
        expect(payrollWorkerResource).not.to.equal(null);
        expect(payrollDeductionsResource).not.to.equal(null);
        expect(payrollCertResource).not.to.equal(null);
        expect(payrollDuplicateResource).not.to.equal(null);
        expect(payrollResource).not.to.equal(null);
        expect(payrollReviewResource).not.to.equal(null);
        expect(payrollFlagIssueResource).not.to.equal(null);
        expect(feedbackResource).not.to.equal(null);
    });
});
