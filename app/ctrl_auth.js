app.controller('authCtrl', function($scope, $rootScope, $cookies, $routeParams, $location, $http, Auth) {
    //initially set those objects to null to avoid undefined error
    // Auth.get('session').then(function(results) {
    //     if ($rootScope.authenticated) {
    //         $location.path("/");
    //     } else {

    //     }
    // });


    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function(customer) {
        Auth.post('login', {
            customer: customer
        }).then(function(results) {
            Auth.toast(results);
            // $rootScope.user_info = results.data;
            if (results.status == "success") {
                $location.path('projects');
                $cookies.USER_NAME = results.data.name;
                $cookies.USER_ROLE = results.data.role;
                $cookies.USER_EMAIL = results.data.email;
            }
        });
    };
    $scope.signup = { email: '', password: '' };
    $scope.signUp = function(customer) {
        Auth.post('signUp', {
            customer: customer
        }).then(function(results) {
            Auth.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function() {
        Auth.get('logout').then(function(results) {
            Auth.toast(results);
            $location.path('login');
        });
    }
});
