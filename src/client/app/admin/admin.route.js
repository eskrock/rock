(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    var _base = {

        usersViewController: {
            controllerAs: 'c',
            controller: ['$scope', '$state', 'users', function($scope, $state, users){
                var that = this;
                that.users = users;
            }]
        }
    };

    var _resolve = {

        /* @ngInject */
        organizationsUsers: ['organizationsResource', '$q', '$stateParams', '$rootScope',
          function(organizationsResource, $q, $stateParams, $rootScope) {
            var deferred = $q.defer();
            var success = function(data) { console.log('data: ', data);deferred.resolve(data); };
            var error = function(error) { console.log('error: ', error);deferred.reject('error'); };
            organizationsResource.getUsers({id: $rootScope.currentUser.organization_id},success, error);
            return deferred.promise;
        }]
    };

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }



    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    abstract: true,
                    template: '<ui-view/>',
                    url: '/admin',
                    data: {
                        requireLogin: true,
                    }
                }
            },
            {
                state: 'admin.users',
                config: angular.extend({
                    url: '/users',
                    template: '<user-dashboard users="c.users" current-user="c.currentUser"></user-dashboard>',
                    title: 'User management',
                    controllerAs: 'c',
                    /* @ngInject */
                    controller: ['$scope', '$state', 'users', '$rootScope', function($scope, $state, users, $rootScope){
                        var that = this;
                        that.users = users;
                        that.currentUser = $rootScope.currentUser;
                    }],
                    resolve: {
                        users: _resolve.organizationsUsers
                    }
                })
            },

        ];
    }
})();
