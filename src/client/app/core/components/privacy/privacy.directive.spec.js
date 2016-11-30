/* jshint -W117, -W030 */
describe('privacy', function() {
    var element;

    beforeEach(module('ui.router'));

    beforeEach(function() {
        bard.inject(this, '$compile', '$rootScope', '$log', '$state');
    });

    beforeEach(function() {
        var template = angular.element('<privacy></privacy>');
        element = $compile(template)($rootScope);
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('privacy agreements', function() {
        it('should be created successfully', function () {
            expect(element).to.be.defined;
        });
    });
});
