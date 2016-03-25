app.controller('settingsCtrl', function($rootScope, $location, $scope, $modal, $filter, Data, Auth) {

    // if (authenticated) {

    //     $location.path("/");

    // }
    $scope.logout = function() {
        Auth.get('logout').then(function(results) {
            Auth.toast(results);
            $location.path('login');
        });
    }

    $scope.project = { project_ID: '', project_author: '' };
    $scope.projects = {};
    // $scope.uid = $rootScope.uid;

    Data.get('projects').then(function(data) {
        $scope.projects = data.data;
    });

    // Data.get("users/" + uid).then(function(data) {
    //     // $scope.projects = data.data;
    //     Auth.toast(data);
    //     alert(JSON.stringify(data));
    //     // alert(JSON.stringify($rootScope.user_info));
    // });

    $scope.changeProductStatus = function(project) {
        project.project_status = (project.project_status == "Active" ? "Inactive" : "Active");
        Data.put("projects/" + project.project_ID, { status: project.project_status });

    };
    $scope.deleteProduct = function(project) {
        if (confirm("Are you sure to remove the project")) {
            Data.delete("projects/" + project.project_ID).then(function(result) {
                Auth.toast(result);
                $scope.projects = _.without($scope.projects, _.findWhere($scope.projects, { project_ID: project.project_ID }));
            });
        }
    };
    $scope.open = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/projectEdit.html',
            controller: 'projectEditCtrl',
            size: size,
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                $scope.projects.push(selectedObject);
                $scope.projects = $filter('orderBy')($scope.projects, 'project_ID', 'reverse');
            } else if (selectedObject.save == "update") {
                p.project_title = selectedObject.project_title;
                p.project_description = selectedObject.project_description;
                p.project_student = selectedObject.project_student;
                p.project_faculty = selectedObject.project_faculty;
                p.project_progress = selectedObject.project_progress;
                p.project_status = selectedObject.project_status;
            }
        });
    };

    $scope.columns = [
        { text: "Title", predicate: "project_title", sortable: true },
        { text: "Student", predicate: "project_student", sortable: true },
        { text: "Faculty", predicate: "project_faculty", sortable: true },
        { text: "Progress", predicate: "project_progress", reverse: true, sortable: true, dataType: "number" },
        { text: "Status", predicate: "project_status", sortable: true },
        { text: "Action", predicate: "", sortable: false }
    ];

});

