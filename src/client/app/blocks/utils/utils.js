(function() {
    'use strict';

    angular
        .module('blocks.utils')
        .factory('utils', utils);

    utils.$inject = ['$state'];

    function utils($state) {
        return {
          storeStateKey: function(opts) {
            opts.space = opts.space || $state.current.name;
            sessionStorage.setItem(opts.space + '.' + opts.key, opts.value);
          },

          getStateKey: function(opts) {
            opts.space = opts.space || $state.current.name;
            return sessionStorage.getItem(opts.space + '.' + opts.key);
          }
        };
    }
}());
