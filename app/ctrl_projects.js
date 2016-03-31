app.controller('projectsCtrl', function($rootScope, $cookies, $location, $scope, $modal, $filter, Data, Auth) {

    // if (authenticated) {

    //     $location.path("/");

    // }


    Data.get('users/student').then(function(data) {
        $rootScope.studentlist = data.data;
    });

    Data.get('users/faculty').then(function(data) {
        $rootScope.facultylist = data.data;
    });

    $scope.logout = function() {
        Auth.get('logout').then(function(results) {
            Auth.toast(results);
            $location.path('login');
        });
    }

    $scope.project = { project_ID: '', project_author: '', project_faculty: '', project_student: '', project_maxhour: '' };
    $scope.projects = [];
    // $scope.uid = $rootScope.uid;


    if ($cookies.USER_ROLE == 'Faculty') {

        Data.get('/GET/spf_projects/project_faculty/' + $cookies.USER_NAME).then(function(data) {
            $scope.projects = data.data;
        });

    };
    if ($cookies.USER_ROLE == 'Administrator') {
        Data.get('projects').then(function(data) {
            $scope.projects = data.data;
        });
    };
    if ($cookies.USER_ROLE == 'Student') {
        Data.get('projects').then(function(data) {
            for (var i = 0; i < data.data.length; i++) {
                var students = data.data[i].project_student.split(',');
                for (var j = 0; j < students.length; j++) {
                    if (students[j] == $cookies.USER_NAME) {
                        $scope.projects.push(data.data[i]);
                    }
                }
            }
        });
    };

    // Data.get('GET/spf_projects/project_ID/997').then(function(data) {
    //     alert(JSON.stringify(data));
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
                Data.get('projects').then(function(data) {
                    $scope.projects = data.data;
                });
                // $scope.projects.push(selectedObject);
                $scope.projects = $filter('orderBy')($scope.projects, 'project_ID', 'reverse');
            } else if (selectedObject.save == "update") {
                Data.get('projects').then(function(data) {
                    $scope.projects = data.data;
                });
                // p.project_title = selectedObject.project_title;
                // p.project_description = selectedObject.project_description;
                // p.project_student = selectedObject.project_student;
                // p.project_faculty = selectedObject.project_faculty;
                // p.project_progress = selectedObject.project_progress;
                // p.project_status = selectedObject.project_status;
            }
        });
    };

    $scope.task = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/taskEdit.html',
            controller: 'projectTaskCtrl',
            size: size,
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                Data.get('projects').then(function(data) {
                    $scope.projects = data.data;
                });
                // $scope.projects.push(selectedObject);
                $scope.projects = $filter('orderBy')($scope.projects, 'project_ID', 'reverse');
            } else if (selectedObject.save == "update") {
                Data.get('projects').then(function(data) {
                    $scope.projects = data.data;
                });
                // p.project_title = selectedObject.project_title;
                // p.project_description = selectedObject.project_description;
                // p.project_student = selectedObject.project_student;
                // p.project_faculty = selectedObject.project_faculty;
                // p.project_progress = selectedObject.project_progress;
                // p.project_status = selectedObject.project_status;
            }
        });
    };

    $scope.openReport = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/projectReport.html',
            controller: 'projectReportCtrl',
            windowClass: 'large-Modal',
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
    };

    $scope.columns = [
        { text: "Title", predicate: "project_title", sortable: true },
        { text: "Student", predicate: "project_student", sortable: true },
        { text: "Faculty", predicate: "project_faculty", sortable: true },
        { text: "Progress", predicate: "project_progress", reverse: true, sortable: true, dataType: "number" },
        { text: "Report", predicate: "project_faculty", sortable: true },
        { text: "Status", predicate: "project_status", sortable: true },
        { text: "Action", predicate: "", sortable: false }
    ];

});


app.controller('projectEditCtrl', function($rootScope, $scope, $modalInstance, item, Data, Auth) {
    $scope.users = [];

    $scope.students = [];
    $scope.faculties = [];
    // $scope.getFinished = false;
    // Data.get('users').then(function(data) {
    //     // $scope.users = data.data;
    for (var i = 0; i < $rootScope.studentlist.length; i++) {
        $scope.students.push($rootScope.studentlist[i].name);
    }
    for (var i = 0; i < $rootScope.facultylist.length; i++) {
        $scope.faculties.push($rootScope.facultylist[i].name);
    }

    $scope.checkboxModel = {
        value1: true,
        value2: 'YES'
    };
    $scope.project = angular.copy(item);
    $scope.project.project_student = $scope.project.project_student.split(",");
    $scope.project.project_faculty = $scope.project.project_faculty.split(",");


    // alert(JSON.stringify(item));

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };
    $scope.title = (item.project_ID != null) ? 'Edit Project' : 'Add Project';
    $scope.buttonText = (item.project_ID > 0) ? 'Update Project' : 'Add New Project';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.project);
    }
    $scope.saveProduct = function(project) {
        project.project_student = project.project_student.toString();
        project.project_faculty = project.project_faculty.toString();

        if (project.project_ID > 0) {
            Data.put('projects/' + project.id, project).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(project);
                    x.save = 'update';
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
                Auth.toast(result);
            });
        } else {
            project.project_status = 'Active';
            Data.post('projects', project).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(project);
                    x.save = 'insert';
                    x.id = result.data;
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
                alert(JSON.stringify(result));
                Auth.toast(result);
            });

        }
    };
});



app.controller('projectReportCtrl', function($rootScope, $scope, $modalInstance, item, Data, Auth) {
    $scope.users = [];

    $scope.students = [];
    $scope.faculties = [];
    // $scope.getFinished = false;
    // Data.get('users').then(function(data) {
    //     // $scope.users = data.data;
    for (var i = 0; i < $rootScope.studentlist.length; i++) {
        $scope.students.push($rootScope.studentlist[i].name);
    }
    for (var i = 0; i < $rootScope.facultylist.length; i++) {
        $scope.faculties.push($rootScope.facultylist[i].name);
    }

    $scope.checkboxModel = {
        value1: true,
        value2: 'YES'
    };
    $scope.project = angular.copy(item);
    $scope.project.project_student = $scope.project.project_student.split(",");
    $scope.project.project_faculty = $scope.project.project_faculty.split(",");


    // alert(JSON.stringify(item));

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };
    $scope.title = (item.project_ID != null) ? 'Edit Project' : 'Add Project';
    $scope.buttonText = (item.project_ID > 0) ? 'Update Project' : 'Add New Project';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.project);
    }
    $scope.saveProduct = function(project) {
        project.project_student = project.project_student.toString();
        project.project_faculty = project.project_faculty.toString();

        if (project.project_ID > 0) {
            Data.put('projects/' + project.id, project).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(project);
                    x.save = 'update';
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
                Auth.toast(result);
            });
        } else {
            project.project_status = 'Active';
            Data.post('projects', project).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(project);
                    x.save = 'insert';
                    x.id = result.data;
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
                alert(JSON.stringify(result));
                Auth.toast(result);
            });

        }
    };
});


app.controller('projectTaskCtrl', function($rootScope, $cookies, $scope, $modalInstance, item, Data, Auth) {
    $scope.task = {};

    $scope.students = [];
    $scope.faculties = [];

    $scope.project = angular.copy(item);

    $scope.project.project_student = $scope.project.project_student.split(",");
    $scope.project.project_faculty = $scope.project.project_faculty.split(",");
    for (var i = 0; i < $scope.project.project_student.length; i++) {
        $scope.students.push($scope.project.project_student[i]);
    };
    for (var i = 0; i < $rootScope.facultylist.length; i++) {
        $scope.faculties.push($scope.project.project_student[i]);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };

    $scope.title = "Add Task For: " + $scope.project.project_title;
    $scope.buttonText = 'Add New Task';

    $scope.task = { task_ID: '', task_author: '', task_student: '', task_project: '' };
    $scope.task.task_project = $scope.project.project_title;
    $scope.task.task_author = $cookies.USER_NAME;

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.project);
    }
    $scope.saveProduct = function(task) {

        task.task_author = $cookies.USER_NAME;
        task.task_student = task.task_student.toString();

        // task.task_due = task.task_due + '2015-03-23 00:08:00';

        if (task.task_ID > 0) {
            Data.put('tasks/' + task.task_ID, task).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(task);
                    x.save = 'update';
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
                Auth.toast(result);
            });
        } else {

            task.task_progress = 'Needs work';
            Data.post('tasks', task).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(task);
                    x.save = 'insert';
                    x.id = result.data;
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
                Auth.toast(result);
            });

        }
    };
});
