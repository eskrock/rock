/* Help configure the state-base ui.router */
/* jshint maxlen: 200 */
(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        $locationProvider.html5Mode(true);

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$window', '$rootScope', '$state', 'logger', '$auth', 'profileResource', 'permissions'];
        /* @ngInject */
        function RouterHelper($location, $window, $rootScope, $state, logger, $auth, profileResource, permissions) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleAuthenticationNAuthorizations() {
              $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                  function checkAuthorization() {
                      var permissions = toState.data.permissions;
                      return true;
                      //return permissions && LoginService.hasRoles(permissions);
                  }

                  if(toState.name === 'Logoff') {
                      $rootScope.currentUser = undefined;
                  }

                  if (toState.data.requireLogin) {
                      if ($auth.isAuthenticated()) {
                        if (typeof $rootScope.currentUser === 'undefined' || $rootScope.currentUser == null) {
                          event.preventDefault();

                          var success = function(user) {
                            $rootScope.currentUser = user;
                            permissions.setPermission(user.role);
                            if(checkAuthorization()){

                              if(user.profile_status==='complete') {
                                return $state.go(toState.name, toParams);

                              } else {
                                return $state.go('profile.edit', { redirect: 'dashboard'});
                              }
                            }
                            else {
                              $state.go('403', {}, {reload: true});
                            }
                          };
                          var error = function(error) { $state.go('500', {}, {reload: true}); };
                          profileResource.get({},success, error);
                        } else {
                          if (!checkAuthorization()) {
                              event.preventDefault();
                              $state.go('403', {}, {reload: true});
                          }
                        }
                      } else {
                        event.preventDefault();
                        $state.go('login');
                      }
                  }
              });
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );
            }

            function init() {
                handleAuthenticationNAuthorizations();
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                        checkAgreementStatus($rootScope.currentUser, toState);
                        $window.scrollTo(0,0);
                    }
                );
            }

            function checkAgreementStatus(user, toState)
            {
              if (typeof user !== 'undefined' && user != null) {
                  if(typeof user.role !== 'undefined' || user.role != null){
                    if(user.role==='contractor' && !user.agreement_accepted) {
                      if(toState.name !=='login'){
                        return $state.go('agreements',{id: user.id});
                      }
                    }
                }
              }
            }
        }
    }
})();
