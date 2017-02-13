'use strict';
/* global $ */
/**
 * Created by daniel on 2/1/17.
 */
angular.module('smsUiApp')
  .controller('contactsCtrl', ['$scope', '$rootScope', 'DataService', '$http',
    function ($scope, $rootScope, DataService, $http) {

      var count = 0;
      $scope.toggle = false;
      $scope.settingsToggle = false;
      $scope.setValue = 0;
      $scope.loading = false;
      $scope.contacts = [];
      $scope.groups = [];
      $rootScope.selected_contacts = [];

      (function () {
        DataService.getContacts()
          .then(function(response){
            $scope.contacts = response.data;
          }, function(error){
            Materialize.toast('Server down. Try logging out and logging in again.', 8000, 'rounded');
          })
      })();

      $scope.eval = function (value) {

        if (value) {
          count++;
        }
        else {
          count--;
        }
        // for settings
        if(count == 1)
          $scope.settingsToggle = true;
        else
          $scope.settingsToggle = false;
        if (count > 0) {
          $scope.toggle = true;
        }
        else {
          $scope.toggle = false;
        }
      };

      $scope.add = function (cont) {
        var data = {
          "id": cont.id,
          "firstName": cont.firstName,
          "phone": cont.phoneNumber,
          "countryCode": cont.countryCode,
          "lastName": cont.lastName
        };

        var index = -1;
        for(var i = 0; i < $rootScope.selected_contacts.length; i++){
          if($scope.selected_contacts[i].id == cont.id){
            index = i;
            break;
          }
        }

        if (index == -1 && cont.selected) {
          $rootScope.selected_contacts.push(data);
        } else if (!cont.selected && index != -1) {
          $rootScope.selected_contacts.splice(index, 1);
        }
      };

      $scope.makeMultiple = function () {
        $scope.data = {
          "name": $scope.groupName,
          "description" : $scope.description,
          "receivers": $rootScope.selected_contacts
        };
        $http({
          method: 'POST',
          url: encodeURI('http://localhost:8080/bulk-smart/api/v1/groups'),
          headers: {
            'Content-Type': 'application/json'
          },
          data: $scope.data
        }).then(function(response){
          $scope.loading = true;
          console.log("Successfully created group");
          window.location.reload();
        }, function(error){
          $scope.loading = true; console.log("Error: " + error.data);
        });
      };

      $scope.editContact = function() {
        $scope.selected_contacts.forEach(function(contact){
          $rootScope.url = 'http://localhost:8080/bulk-smart/api/v1/users/1/receivers/' + contact.id;
          $scope.firstName = contact.firstName;
          $scope.countryCode = contact.countryCode;
          $scope.lastName = contact.lastName;
          $scope.phoneNumber = contact.phone;
        });
      };
      $scope.setVal = function(){
        $scope.value = 1;
      };

      $scope.doEdit = function(url){
        $scope.firstName = $scope.firstName;
        $scope.lastName = $scope.lastName;
        $scope.countryCode = $scope.countryCode;
        $scope.phoneNumber = $scope.phoneNumber;
        $rootScope.data = {
          "countryCode": $scope.countryCode,
          "firstName": $scope.firstName,
          "lastName": $scope.lastName,
          "phoneNumber": $scope.phoneNumber,
          "uid": 1
        };
        $http({
          method: 'PUT',
          url: encodeURI(url),
          headers: {
            'Content-Type': 'application/json'
          },
          data: $rootScope.data
        }).then(function(response){
          console.log("Successfully deleted contact");
          $scope.loading = true;
          location.reload();
        }, function(error){ console.log("Error: " + error.data )});
      };
  }])
  .controller('deleteContactCtrl', ['$scope', '$rootScope', 'DataService', '$window',
    function($scope, $rootScope, DataService, $window){
      $scope.deleteContact = function(){
        console.log("dsafasdfasd");
        $rootScope.selected_contacts.forEach(function(contact){
          DataService.deleteContact(contact.id)
            .then(function (response) {
              $rootScope.$broadcast('clientUpdated', "");
            }, function(error) {
              Materialize.toast("Please go back and select a contact to delete", 5000);
              return;
            });
        });
        // Not really needed but just to be sure
        $rootScope.$broadcast('clientUpdated', "");
        Materialize.toast("Successfully deleted contact(s).", 5000, 'rounded');
      };

      $scope.goBack = function() {
        $window.history.back();
      }
    }])
  .controller('editContactCtrl', ['$scope', '$rootScope', 'DataService', '$window',
    function($scope, $rootScope, DataService, $window){
      var contact = $rootScope.selected_contacts[0];
      $scope.loading = false;

      $scope.firstName = contact.firstName;
      $scope.lastName = contact.lastName;
      $scope.phone = contact.phone;
      $scope.countryCode = contact.countryCode;
      $scope.id = contact.id;

      $scope.submitEditForm = function() {
        $scope.loading = true;
        DataService.updateContact($scope.id, $scope.firstName, $scope.lastName, $scope.phone, $scope.countryCode)
          .then(function(response){
            $scope.loading = false;
            $rootScope.$broadcast('clientUpdated', "");
            Materialize.toast("Successfully updated client", 3000, 'rounded');
          }, function(error){
            $scope.loading = false;
            Materialize.toast("Failed to update client.", 5000);
          });
      };

      $scope.goBack = function() {
        $window.history.back();
      }
    }]);

