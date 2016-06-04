'use strict';

// Declare app level module which depends on views, and components
angular.module('myTodolist', [
  'ngRoute',
  'firebase',
  'myTodolist.todolist'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/todolist'});
}]);
