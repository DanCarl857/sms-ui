'use strict';
/**
 * Created by daniel on 1/14/17.
 */
angular.module('smsUiApp')
  .controller('userLoginCtrl', ['$scope', '$state', '$rootScope', '$location', '$cookieStore',
    function ($scope, $state, $rootScope, $location, $cookieStore) {

      $scope.loading = false;
      $scope.errorCreds = false;

      (function initController() {
        $scope.username = "";
        $scope.password = "";
      })();

      // function to log user in
      $scope.submitLoginForm = function() {
        $rootScope.username = $scope.username;
        $rootScope.password = $scope.password;

        $scope.loading = true;


        // TODO: obviously remove this
        $state.transitionTo('home')
      };

      $scope.loginView = function(){
        $state.transitionTo('clients');
      };

    }]);
