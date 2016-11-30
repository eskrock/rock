/* jshint -W117, -W030 */
describe('app.contracts', function() {
    var scope,
      element;

    //var customers = mockData.getMockCustomers();

    beforeEach(angular.mock.module(
        'app.contracts',
        bard.fakeToastr,
        bard.fakeRouteHelperProvider,
        bard.fakeRouteProvider,
        bard.fakeStateProvider)
    );

    beforeEach(function() {
        bard.inject(this, '$compile', '$rootScope', '$log', '$state', 'ContractModel');
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Contract Viewer', function() {
        var mode = 'view';
        beforeEach(function() {
            scope = $rootScope.$new();
            scope.mode = 'view';
            scope.contract = new ContractModel();
            scope.contractingOfficer = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@agency.gov',
                phone: '1231231234',
                role: 'co',
                access: 'write',
                createdAt: '2016-09-23T14:19:00.520Z',
                updatedAt: '2016-09-23T14:19:00.520Z',
                organization_id: 1
            };
            var template = angular.element('<contract-viewer mode="mode" co="contractingOfficer" ' +
              ' contract="contract">hello</contract-viewer>');
            element = $compile(template)(scope);
            //scope = element.isolated
            scope.$digest();
        });

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
