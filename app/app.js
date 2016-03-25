// 'datePicker', 'ui.bootstrap', 
var app = angular.module('myApp', ['datePicker', 'ui.bootstrap', 'btorfs.multiselect', 'ngRoute', 'ui.bootstrap', 'ngAnimate', 'toaster']);
app.config(['$routeProvider',
  function($routeProvider) {
    'use strict';
    $routeProvider.
    when('/', {
      title: 'Homepage',
      templateUrl: 'partials/login.html',
      controller: 'authCtrl'
    })
    .when('/dashboard', {
      title: 'dashboard',
      templateUrl: 'partials/dashboard.html',
      controller: 'dashboardCtrl'
    })
    .when('/users', {
      title: 'Users',
      templateUrl: 'partials/users.html',
      controller: 'usersCtrl'
    })
    .when('/tasks', {
      title: 'Users',
      templateUrl: 'partials/tasks.html',
      controller: 'tasksCtrl'
    })
    .when('/projects', {
      title: 'Project',
      templateUrl: 'partials/projects.html',
      controller: 'projectsCtrl'
    })
    .when('/project_report', {
      title: 'Project',
      templateUrl: 'partials/project_report.html',
      controller: 'project_reportCtrl'
    })
    .when('/settings', {
      title: 'Setting',
      templateUrl: 'partials/settings.html',
      controller: 'settingsCtrl'
    })
    .when('/signup', {
      title: 'signup',
      templateUrl: 'partials/signup.html',
      controller: 'authCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}])
 .run(function ($rootScope, $location, Auth) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Auth.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/') {

                    } else {
                        $location.path("/");
                    }
                }
            });
        });
    });
    