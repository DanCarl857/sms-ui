/**
 * Created by daniel on 2/1/17.
 */
angular.module('smsUiApp')
  .controller('groupCtrl', ['$rootScope', '$scope', 'DataService',
    function ($rootScope, $scope, DataService) {
    $scope.loading = false;
    $scope.errorCreds = false;

    $scope.submitGroupForm = function(){

      $scope.loading = true;

      DataService.createGroup($scope.name, $scope.description)
        .then(function(response){
          $scope.name = "";
          $scope.description = "";
          $scope.loading = false;
          Materialize.toast("Successfully created group", 4000, "rounded");
        }, function(error){
          $scope.name = "";
          $scope.description = "";
          $scope.loading = false;
          Materialize("Failed to create group", 4000);
        });
    }

  }]);
