var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Products',
      templateUrl: 'partials/login.html',
      controller: 'productsCtrl'
    })
    .when('/users', {
      title: 'Users',
      templateUrl: 'partials/users.html',
      controller: 'usersCtrl'
    })
    .when('/work', {
      title: 'Users',
      templateUrl: 'partials/works.html',
      controller: 'worksCtrl'
    })
    .when('/project', {
      title: 'Project',
      templateUrl: 'partials/products.html',
      controller: 'productsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);