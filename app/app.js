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
      controller: 'productsCtrl'
    })
<<<<<<< HEAD
    .when('/project', {
      title: 'Users',
      templateUrl: 'partials/products.html',
      controller: 'productsCtrl'
    })
    .when('/work', {
      title: 'Users',
      templateUrl: 'partials/works.html',
=======
    .when('/work', {
      title: 'Users',
      templateUrl: 'partials/works.html',
      controller: 'worksCtrl'
    })
    .when('/project', {
      title: 'Project',
      templateUrl: 'partials/products.html',
>>>>>>> master
      controller: 'productsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);