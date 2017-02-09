/**
 * Created by daniel on 2/8/17.
 */
angular.module('smsUiApp')
  .factory('DataService', ['$http', '$rootScope', '$cookieStore',
    function($http, $rootScope, $cookieStore){

      $rootScope.BASE_URL = "http://localhost:8080/api/v2/";

      // TODO: Update all $http to $resource

      var DataService = {};
      var config = {
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8"
      };

      DataService.createContact = function(firstName, lastName, phoneNumber, countryCode){
        var url = $rootScope.BASE_URL + "receivers";
        var data = {
          "firstName": firstName,
          "lastName": lastName,
          "phoneNumber": phoneNumber,
          "countryCode": countryCode
        };

        return $http({
          method: 'POST',
          url: url,
          data: data,
          config: config
        });
      };

      DataService.getContacts = function() {
        var url = $rootScope.BASE_URL + "receivers";
        return $http.get(url, config);
      };

      DataService.deleteContact = function(id){
        var url = $rootScope.BASE_URL + "receivers/" + id;
        return $http.delete(url.config);
      };

      DataService.createGroup = function(grpName, description) {
        var data = {
          "name": grpName,
          "description": description
        };

        var url = $rootScope.BASE_URL + "groups";

        return $http({
          method: 'POST',
          url: url,
          data: data,
          config: config
        });
      };

      DataService.getGroups = function() {
        var url = $rootScope.BASE_URL + "groups";

        return $http.get(url, config);
      };

      return DataService;
    }]);
