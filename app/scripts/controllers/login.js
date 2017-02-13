'use strict';
/**
 * Created by daniel on 1/14/17.
 */
angular.module('smsUiApp')
  .controller('userLoginCtrl', ['$scope', '$state', '$rootScope', '$location', '$cookieStore', 'AuthService',
    function ($scope, $state, $rootScope, $location, $cookieStore, AuthService) {

      $scope.loading = false;
      $scope.errorCreds = false;

      (function initController() {
        AuthService.clearCredentials();
        $scope.username = "";
        $scope.password = "";
      })();

      // function to log user in
      $scope.submitLoginForm = function() {
        $rootScope.username = $scope.username;
        $rootScope.password = $scope.password;

        $scope.loading = true;

        AuthService.login($rootScope.username, $rootScope.password)
          .then(function(response){

            // TODO: compare passwords

            $rootScope.userId = response.data.id;
            $state.transitionTo('home.message');

          }, function(error) {
            AuthService.clearCredentials();
            $scope.loading = false;
            $scope.errorCreds = true;
            $scope.errorMsg = "Wrong credentials.";
          });
      };
    }]);
