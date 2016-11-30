(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Footer', Footer);

    /* @ngInject */
    function Footer($state, routerHelper) {
        var vm = this;

        activate();

        function activate() {}
    }
})();
