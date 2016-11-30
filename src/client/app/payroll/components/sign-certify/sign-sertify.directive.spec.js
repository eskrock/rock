/* jshint -W117, -W030 */
describe('Sign and Certify', function() {
  var $scope,
    scope,
    element,
    template,
    compile,
    rootScope,
    httpBackend,
    infoLogger,
    controller;

  beforeEach(function() {

    module('app.payroll');

    inject(function($rootScope, $httpBackend, $controller, $compile,logger) {
      httpBackend = $httpBackend;
      loggerInfo=logger;
      compile = $compile;
      rootScope = $rootScope;
      scope = $rootScope.$new();
    });

    rootScope.currentUser = {
      first_name: 'user'
    };

    scope.payroll = { week_end: '2016-11-20' };

    template = angular.element('<sign-certify-payroll payroll="payroll" ' +
    'deductions="deductions" feedback="feedback"></<sign-certify-payroll>');
    element = compile(template)(scope);
    scope.$digest();

  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Sign and Certify should be created', function() {
    it('should be created successfully', function() {
      // TODO:
      // var log = sinon.spy(loggerInfo, 'info');
      // var stu = sinon.stub(element.isolateScope().certify(),'certification');
      // var stu = sinon.stub(element.isolateScope().certify,'certification');
      // var log = sinon.spy(element.isolateScope(), 'certify');
      // element.isolateScope().certify();
      // sinon.assert.calledOnce(log);

      expect(element.isolateScope().certify).not.to.equal(null);
      expect(element.isolateScope().certify).not.to.equal(null);
      // expect(element.isolateScope().feedbackError()).not.to.equal(null);
      // expect(loggerInfo.info).toHaveBeenCalled();
        element.isolateScope().feedbackError;
        element.isolateScope().download();
        expect(element).to.be.defined;

    });
  });

});
