/* jshint -W079 */
var mockData = (function() {
    return {
        getMockContracts: getMockContracts,
        getMockCustomers: getMockCustomers,
        getMockStates: getMockStates,
        blackWidow: getMockCustomers()[0]
    };

    function getMockContracts() {
        return [
            {
              number: 'ACE-CE-4125',
              title: 'ACME Construction',
              startDate: '04-28-1986',
              streetAddress: '',
              city: 'Washington DC',
              state: '20001',
              zip: '22209',
              primeContractor: {
                name: 'ACME Construction'
              },
              contractingOfficer: {
                name: 'John',
                phone: '222-222-2222',
                email: 'email@emaail.com'
              }
            }
        ];
    }

    function getMockStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/components/dashboard/views/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                state: 'contract',
                config: {
                    url: '/contract',
                    templateUrl: 'app/dashboard/components/dashboard/views/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }

    function getMockCustomers() {
        return [];
    }
})();
