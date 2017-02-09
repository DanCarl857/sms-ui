/**
 * Created by daniel on 2/2/17.
 */
angular.module('smsUiApp')
  .controller('navCtrl', ['$state', '$scope', '$cookieStore',
    function ($state, $scope, $cookieStore) {
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
      $(".dropdown-button").dropdown();
    });

    $scope.logout = function(){
      $cookieStore.remove('globals');
      $state.transitionTo('login');
    }

  }]);
