/**
 * Created by daniel on 2/1/17.
 */
angular.module('smsUiApp')
  .controller('groupsCtrl', ['$rootScope', '$scope', 'DataService',
    function ($rootScope, $scope, DataService) {

    $scope.contacts = [];
    $scope.groups = [];
    $scope.selected_groups = [];
    $scope.loading = false;
    $scope.toggle = false;
    var count = 0;

    (function(){
      DataService.getGroups()
        .then(function(response){
          $scope.groups = response.data;
        }, function(error){

        });
    })();

    $scope.addGroup = function (group) {
      var data = {
        "id": group.id
      };
      var index = -1;
      for(var i = 0; i < $scope.selected_groups.length; i++){
        if($scope.selected_groups[i].id == group.id){
          index = i;
          break;
        }
      }
      if (index == -1 && group.selected) {
        $scope.selected_groups.push(data);
      } else if (!group.selected && index != -1) {
        $scope.selected_groups.splice(index, 1);
      }

    };

      console.log($scope.selected_groups);
    $scope.eval = function(value){
      if(value){
        count++;
      }
      else{
        count--;
      }
      if(count > 0){
        $scope.toggle = true;
      }
      else{
        $scope.toggle = false;
      }
    };
  }])
  .controller('deleteGroupCtrl', ['$scope', 'DataService', function($scope, DataService){
    $scope.deleteGroup = function(){
      $scope.selected_groups.forEach(function(grp){
        DataService.deleteContact(grp.id)
          .then(function (response) {

          }, function(error) {

          });
      });
    }
  }]);
