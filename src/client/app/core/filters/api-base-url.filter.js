(function () {
  'use strict';

  angular
      .module('app.core')
      .filter('apiBaseUrl', APIBaseUrl);

  /* @ngInject */
  function APIBaseUrl(config, logger) {
    return function(url) {
      return config.apiServiceBaseUri + '/' + url;
    };
  }

})();
