/**
 * Created by daniel on 2/2/17.
 */
angular.module('smsUiApp')
  .controller('navCtrl', function () {
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
      $(".dropdown-button").dropdown();
    });

  });
