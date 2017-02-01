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
        controller: 'messageCtrl'
      })
      .state('home.contacts', {
        url: '/contacts',
        templateUrl: 'views/partials/contacts.html',
        controller: 'messagesCtrl'
      })
      .state('home.groups', {
        url: '/groups',
        templateUrl: 'views/partials/groups.html',
        controller: 'groupsCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      });

    $urlRouterProvider.otherwise('/login');
  });
