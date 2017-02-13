/**
 * Created by daniel on 2/1/17.
 */
angular.module('smsUiApp')
  .controller('groupsCtrl', ['$rootScope', '$scope', 'DataService',
    function ($rootScope, $scope, DataService) {

    $scope.contacts = [];
    $scope.groups = [];
    $rootScope.selected_groups = [];
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

    $scope.add = function (group) {
      var data = {
        "id": group.id
      };
      var index = -1;
      for(var i = 0; i < $rootScope.selected_groups.length; i++){
        if($rootScope.selected_groups[i].id == group.id){
          index = i;
          break;
        }
      }
      if (index == -1 && group.selected) {
        $rootScope.selected_groups.push(data);
      } else if (!group.selected && index != -1) {
        $rootScope.selected_groups.splice(index, 1);
      }
    };

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
  .controller('deleteGroupCtrl', ['$scope', '$rootScope', 'DataService', '$window',
    function($scope, $rootScope, DataService, $window){
    $scope.deleteGroup = function(){
      $rootScope.selected_groups.forEach(function(grp){
        console.log("in delete controller");
        console.log("Data: " + grp);
        DataService.deleteGroup(grp.id)
          .then(function (response) {
            $rootScope.$broadcast('groupUpdated', "");
          }, function(error) {
            Materialize.toast("Please go back and select a group to delete", 5000);
            return;
          });
      });
      // Not really needed but just to be sure
      $rootScope.$broadcast('groupUpdated', "");
      Materialize.toast("Successfully deleted group(s).", 5000, 'rounded');
    };

    $scope.goBack = function() {
      $window.history.back();
    }
  }]);
