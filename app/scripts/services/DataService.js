/**
 * Created by daniel on 2/8/17.
 */
angular.module('smsUiApp')
  .factory('DataService', ['$http', '$rootScope', '$cookieStore',
    function($http, $rootScope, $cookieStore){

      $rootScope.BASE_URL = "http://localhost:8080/api/v2/";

      // TODO: Update all $http to $resource

      var DataService = {};

      DataService.createContact = function(firstName, lastName, phoneNumber, countryCode){
        var url = $rootScope.BASE_URL + "receivers";
        var data = {
          "firstName": firstName,
          "lastName": lastName,
          "phoneNumber": phoneNumber,
          "countryCode": countryCode
        };

        var config = {
          cache: false,
          dataType: 'json',
          contentType: "application/json; charset=utf-8"
        };

        //$http.defaults.headers.common['Authorization'] = 'Basic ' +  authdata;


        return $http({
          method: 'POST',
          url: url,
          data: data,
          config: config
        });
      };

      return DataService;
    }]);
