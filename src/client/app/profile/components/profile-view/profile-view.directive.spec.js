/* jshint -W117, -W030 */
describe('app profile', function() {

  var scope, element;

  //mockining contractResource for some reason
  beforeEach(module(function($provide) {
    $provide.service('contractResource', function($q) {});
  }));

  beforeEach(module('app.profile'));

  beforeEach(inject(function($rootScope, $compile) {

    scope = $rootScope.$new();
    var user = {
      id: 1,
      first_name: 'firstname',
      last_name: 'lastname',
      email: 'test@test.gov',
      phone: '1231231234',
      role: 'co',
      createdAt: '2016-09-23T14:19:00.520Z',
      updatedAt: '2016-09-23T14:19:00.520Z',
      organization_id: 1
    };

    var template = angular.element('<profile-viewer mode="mode" user="user"></profile-viewer>');
    element = $compile(template)(scope);
    scope.$digest();

  }));

  it('Element should be defined', function() {
    expect(element).to.be.defined;
  });

});
