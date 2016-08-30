var app = angular.module('app', [
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'ngSanitize',
    'ngCookies',
    'ngRoute',
    'ui.router'
]).config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'partials/home.tpl.html'
  });
  
}]).controller('mainCtrl', ['$scope', function($scope){
  
}]);