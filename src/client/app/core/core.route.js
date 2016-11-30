(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    template: '<login></login>',
                    title: 'login',
                    data: {
                        requireLogin: false
                    }
                }
            },
            {
                state: 'agreements',
                config: {
                    url: '/agreements',
                    template: '<agreements></agreements>',
                    title: 'login',
                    data: {
                        requireLogin: false
                    }
                }
            },
            {
                state: 'privacy',
                config: {
                    url: '/privacy',
                    template: '<privacy></privacy>',
                    title: 'privacy',
                    data: {
                        requireLogin: false
                    }
                }
            },
            {
                state: 'oauth',
                config: {
                    url: '/login/oauth',
                    template: '<div style="padding: 10px 10px">Redirecting...</div>',
                    title: 'login',
                    data: {
                        requireLogin: false,
                        noShell: true
                    }
                }
            },
            {
                state: '403',
                config: {
                    url: '/403',
                    templateUrl: 'app/core/views/403.html',
                    title: '403',
                    data: {
                        requireLogin: false
                    }
                }
            },
            {
                state: '500',
                config: {
                    url: '/500',
                    templateUrl: 'app/core/views/500.html',
                    title: '500',
                    data: {
                        requireLogin: false
                    }
                }
            },
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/views/404.html',
                    title: '404',
                    data: {
                        requireLogin: false
                    }
                }
            }
        ];
    }
})();
