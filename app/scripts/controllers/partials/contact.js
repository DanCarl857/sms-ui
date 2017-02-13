/**
 * Created by daniel on 2/1/17.
 */
angular.module('smsUiApp')
  .controller('contactCtrl', ['$scope','$rootScope', 'DataService',
    function ($scope, $rootScope, DataService) {
    $scope.loading = false;
    $scope.errorCreds = false;

    $("#phone").intlTelInput({
      preferredCountries: ['cm', 'us']
    });

    $scope.submitMessageForm = function() {

      $scope.loading = true;

      // validation for external plugin affected field
      if($("#phone").intlTelInput("isValidNumber") == false){
        $scope.errorCreds = true;
        $scope.errorMsg = "Phone number is invalid";
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.loading = false;
        return;
      }

      var intlNumber = $("#phone").intlTelInput("getNumber");
      $scope.phoneNumber = intlNumber.substring(4);
      var countryData = $("#phone").intlTelInput("getSelectedCountryData");
      $scope.countryCode = "+" + countryData.dialCode;

      DataService.createContact($scope.firstName, $scope.lastName, $scope.phoneNumber, $scope.countryCode)
        .then(function(response){

          $scope.firstName = "";
          $scope.lastName = "";
          $scope.loading = false;
          Materialize.toast('Successfully created client', 4000, 'rounded');

          $rootScope.$broadcast('clientUpdated', "");

        }, function(error){

          $scope.firstName = "";
          $scope.lastName = "";
          $scope.loading = false;
          Materialize.toast('Error: Client may already exist or server is down', 4000, 'rounded');
        });
    }

  }]);
