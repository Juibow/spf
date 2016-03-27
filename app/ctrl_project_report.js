app.controller('project_reportCtrl', function($rootScope, $stateParams, $location, $scope, $modal, $filter, Data, Auth) {

    // if (authenticated) {

    //     $location.path("/");

    // }
    // alert($stateParams.projectID);
    $scope.logout = function() {
        Auth.get('logout').then(function(results) {
            Auth.toast(results);
            $location.path('login');
        });
    }


});
