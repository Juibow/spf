var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'toaster']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Products',
      templateUrl: 'partials/login.html',
      controller: 'authCtrl'
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
    .when('/settings', {
      title: 'Setting',
      templateUrl: 'partials/settings.html',
      controller: 'productsCtrl'
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
    