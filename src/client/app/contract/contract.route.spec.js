/* jshint -W117, -W030 */
describe.skip('contracts', function() {
    describe('state', function() {
        var views = {
            contracts: 'app/contracts/components/contracts-manager/views/contracts-manager.html',
            customerdetail: 'app/customers/components/customer-detail/views/customer-detail.html'
        };

        beforeEach(function() {
            module('app.contracts', bard.fakeToastr);
            bard.inject(this, '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(views.customers, '');
            $templateCache.put(views.customerdetail, '');
        });

        it('should map /contracts route to customers View template', function() {
            expect($state.get('customer.list').templateUrl).to.equal(views.contractsmanager);
        });

        it('should map /customer.details route to customers View template', function() {
            expect($state.get('customer.detail').templateUrl).to.equal(views.customerdetail);
        });

        it('of customer.list should work with $state.go', function() {
            $state.go('customer.list');
            $rootScope.$apply();
            expect($state.is('customer.list'));
        });
    });
});
