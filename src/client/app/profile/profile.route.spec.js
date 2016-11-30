/* jshint -W117, -W030 */
describe('profile', function() {
    describe('state', function() {
        var views = {
            profile: 'app/profile/components/profile-manager/views/profile-manager.html',
            profileView:'app/profile/components/user-info/views/user-info.view.html',
            profileEdit:'app/profile/components/user-info/views/user-info.edit.html'
        };

        beforeEach(function() {
            module('app.profile', bard.fakeToastr);
            bard.inject(this, '$location', '$rootScope', '$state', '$templateCache');
            $templateCache.put(views.profile, '<profile-manager></profile-manager>');
        });

        it('should map /profile/view route to User-info View template', function() {
          var state='profile.view';
            expect($state.get('profile.view').url).to.equal('/view');
        });
    });
});


/* jshint -W117, -W030 */
describe('profile', function() {
  describe('profile controller', function() {

      var controller,
          scope,
          state;

      beforeEach(module('ui.router'));
      beforeEach(module('app.profile'));

      beforeEach(inject(function($controller, $rootScope, $state) {
      }));

      describe('profile__ controller', function() {
          it('should be created successfully', function() {
          });
      });
  });
});
