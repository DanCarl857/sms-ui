'use strict';

/**
 * @ngdoc overview
 * @name smsUiApp
 * @description
 * # smsUiApp
 *
 * Main module of the application.
 */
angular
  .module('smsUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'angularUtils.directives.dirPagination'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'userLoginCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })
      .state('home.contact', {
        url: '/contact',
        templateUrl: 'views/partials/contact.html',
        controller: 'contactCtrl'
      })
      .state('home.group', {
        url: '/group',
        templateUrl: 'views/partials/group.html',
        controller: 'groupCtrl'
      })
      .state('home.message', {
        url: '/message',
        templateUrl: 'views/partials/message.html',
        controller: 'messagesCtrl'
      })
      .state('home.contacts', {
        url: '/contacts',
        templateUrl: 'views/partials/contacts.html',
        controller: 'contactsCtrl'
      })
      .state('home.groups', {
        url: '/groups',
        templateUrl: 'views/partials/groups.html',
        controller: 'groupsCtrl'
      })

      /* partials */
      .state('home.delete_group', {
        url: '/delete_group',
        templateUrl: '/deleteGroup.htm',
        controller: 'deleteGroupCtrl'
      });

    $urlRouterProvider.otherwise('/login');
  })
  .run(function($rootScope, $cookieStore, $location, $http){
    $rootScope.location = $location;
    $rootScope.globals = $cookieStore.get('globals') || {};

    if($rootScope.globals.currentUser){
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.authdata;
    }
    $rootScope.$on('$stateChangeStart', function(event, next, current){
      var restrictedPage = $.inArray($location.path, [
        '/home', '/home/groups', '/home/contacts',
          '/home/group', '/home/contact', '/home/message']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      console.log("rest: " + restrictedPage);
      console.log("log: " + !loggedIn);
      //var loggedIn = $cookieStore.get('user');
      if(restrictedPage && !loggedIn){
        $rootScope.displaying = true;
        $rootScope.username = "";
        $rootScope.password = "";
        setTimeout(function(){
          $location.path('/login');
        }, 1);
      }
    });
  });

