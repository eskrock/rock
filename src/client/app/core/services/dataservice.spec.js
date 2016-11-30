/* jshint -W117, -W030 */
describe('dataservice', function() {
    var contracts = mockData.getMockContracts();
    var $httpFlush;

    beforeEach(function() {
        bard.appModule('app.core');
        bard.inject(this, '$httpBackend', '$rootScope', 'dataservice');
    });

    beforeEach(function() {
        $httpBackend.when('GET', '/api/contracts').respond(200, contracts);
        $httpFlush = $httpBackend.flush;
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should be registered', function() {
        expect(dataservice).not.to.equal(null);
    });

    describe('getContracts function', function() {
        it('should exist', function() {
            expect(dataservice.getContracts).not.to.equal(null);
        });

        it('should return 1 Contract', function(done) {
            dataservice.getContracts().then(function(data) {
                expect(data.length).to.equal(1);
            }).then(done, done);
            $httpFlush();
        });
    });

    describe('ready function', function() {
        it('should exist', function() {
            expect(dataservice.ready).to.be.defined;
        });

        it('should return a resolved promise with the dataservice itself', function(done) {
            dataservice.ready().then(function(data) {
                expect(data).to.equal(dataservice);
            })
            .then(done, done);
            $rootScope.$apply(); // no $http so just flush
        });
    });
});
