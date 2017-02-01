/**
 * Created by daniel on 2/1/17.
 */
angular.module('smsUiApp')
  .run(function($rootScope, $location){
    $rootScope.location = $location;
  });
