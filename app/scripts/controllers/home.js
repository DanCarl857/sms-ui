'use strict';
/**
 * Created by daniel on 2/1/17.
 */
angular.module('smsUiApp')
  .controller('homeCtrl', ['$scope', '$rootScope', 'DataService', function ($scope, $rootScope, DataService) {

    $scope.contacts = [];
    $scope.clientsBool = false;
    $scope.groupsBool = false;

    $scope.getContacts = function(){
      DataService.getContacts()
        .then(function(response){
          $scope.contacts = response.data;
          if($scope.contacts.length > 0){
            $scope.clientsBool = true;
          } else {
            $scope.clientsBool = false;
          }
        }, function(error){})
    };

    $scope.getContacts();

    $scope.getGroups = function(){
      DataService.getGroups()
        .then(function(response){
          $scope.groups = response.data;
          if($scope.groups.length > 0){
            $scope.groupsBool = true;
          } else {
            $scope.groupsBool = false;
          }
        }, function(error) {})
    };

    $scope.getGroups();

    $scope.$on("createGroup", function(event, args){
      $scope.getGroups();
    });

    $scope.$on('createClient', function(event, args){
      $scope.getContacts();
    });

  }]);
