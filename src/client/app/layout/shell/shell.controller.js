(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    /* @ngInject */
    function Shell($timeout, $state, config, logger) {
        var vm = this;

        vm.title = config.appTitle;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.showSplash = true;
        if($state.current &&
          $state.current.data &&
          $state.current.data.noShell) {
          vm.noShell = $state.current.data.noShell;
        }
        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
        }
    }
})();
