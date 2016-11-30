/* jshint -W117, -W030 */
describe('footer', function () {

	beforeEach(angular.mock.module('app.layout'));

	var $controller;

	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
	}));

	describe('footer controller', function () {
		it('footert should be defined', function () {
			var $scope = {};
			var controller = $controller('Footer', { $scope: $scope });
			expect($scope).to.be.defined;
		});
	});

});
