app.controller('tasksCtrl', function($rootScope, $filter, $cookies, $location, $scope, $modal, $filter, Data, Auth) {
    $scope.logout = function() {
        Auth.get('logout').then(function(results) {
            Auth.toast(results);
            $location.path('login');
        });
    }

    $scope.task = { task_ID: '', task_author: '', task_student: '', task_project: '' };
    $scope.tasks = {};

    Data.get('users').then(function(data) {
        $rootScope.userlist = data.data;
    });

    $rootScope.projects = {};



    if ($cookies.USER_ROLE == 'Faculty') {

        Data.get('/GET/spf_projects/project_faculty/' + $cookies.USER_NAME).then(function(data) {
            $rootScope.projects = data.data
        });

        Data.get('/GET/spf_tasks/task_author/' + $cookies.USER_NAME).then(function(data) {
            $scope.tasks = data.data;
        });

    };
    if ($cookies.USER_ROLE == 'Administrator') {

        Data.get('tasks').then(function(data) {
            $scope.tasks = data.data;
        });

    };
    if ($cookies.USER_ROLE == 'Student') {

        Data.get('/GET/spf_tasks/task_student/' + $cookies.USER_NAME).then(function(data) {
            $scope.tasks = data.data;
        });

    };


    $scope.changeProductStatus = function(task) {
        task.task_status = (task.task_status == "Active" ? "Inactive" : "Active");
        Data.put("tasks/" + task.task_ID, { status: task.task_status });

    };
    $scope.deleteProduct = function(task) {
        if (confirm("Are you sure to remove the task")) {
            Data.delete("tasks/" + task.task_ID).then(function(result) {
                Auth.toast(result);
                $scope.tasks = _.without($scope.tasks, _.findWhere($scope.tasks, { task_ID: task.task_ID }));
            });
        }
    };
    $scope.open = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/taskEdit.html',
            controller: 'taskEditCtrl',
            windowClass: 'large-Modal',
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                Data.get('tasks').then(function(data) {
                    $scope.tasks = data.data;
                });
                $scope.tasks = $filter('orderBy')($scope.tasks, 'task_ID', 'reverse');
            } else if (selectedObject.save == "update") {
                Data.get('tasks').then(function(data) {
                    $scope.tasks = data.data;
                });
                // p.task_title = selectedObject.task_title;
                // p.task_author = selectedObject.task_author;
                // p.task_description = selectedObject.task_description;
                // p.task_student = selectedObject.task_student.toString();
                // p.task_progress = selectedObject.task_progress;
            }
        });
    };

    $scope.upload = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/taskUpload.html',
            controller: 'taskUploadCtrl',
            windowClass: 'large-Modal',
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                Data.get('tasks').then(function(data) {
                    $scope.tasks = data.data;
                });
                $scope.tasks = $filter('orderBy')($scope.tasks, 'task_ID', 'reverse');
            } else if (selectedObject.save == "update") {
                Data.get('tasks').then(function(data) {
                    $scope.tasks = data.data;
                });
                // p.task_title = selectedObject.task_title;
                // p.task_author = selectedObject.task_author;
                // p.task_description = selectedObject.task_description;
                // p.task_student = selectedObject.task_student.toString();
                // p.task_progress = selectedObject.task_progress;
            }
        });
    };

    $scope.check = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/taskCheck.html',
            controller: 'taskCheckCtrl',
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                Data.get('tasks').then(function(data) {
                    $scope.tasks = data.data;
                });
                $scope.tasks = $filter('orderBy')($scope.tasks, 'task_ID', 'reverse');
            } else if (selectedObject.save == "update") {
                Data.get('tasks').then(function(data) {
                    $scope.tasks = data.data;
                });
                // p.task_title = selectedObject.task_title;
                // p.task_author = selectedObject.task_author;
                // p.task_description = selectedObject.task_description;
                // p.task_student = selectedObject.task_student.toString();
                // p.task_progress = selectedObject.task_progress;
            }
        });
    };

    $scope.columns = [
        { text: "Task project", predicate: "task_project", sortable: true },
        { text: "Task description", predicate: "task_description", sortable: true },
        { text: "Released by", predicate: "task_faculty", sortable: true },
        { text: "Student", predicate: "task_student", sortable: true },
        { text: "Due", predicate: "task_due", sortable: true },
        { text: "Progress", predicate: "task_progress", reverse: true, sortable: true },
        { text: "Action", predicate: "", sortable: false },

    ];

});


app.controller('taskEditCtrl', function($scope, $cookies, $rootScope, $modalInstance, item, Data, Auth) {
    $scope.users = [];
    $scope.options = [];
    $scope.projectOpetions = [];
    // $scope.getFinished = false;
    // Data.get('users').then(function(data) {
    //     // $scope.users = data.data;
    for (var i = 0; i < $rootScope.userlist.length; i++) {
        $scope.options.push($rootScope.userlist[i].name);
    };
    for (var i = 0; i < $rootScope.projects.length; i++) {
        $scope.projectOpetions.push($rootScope.projects[i].project_title);
    };
    //     $scope.getFinished = true;
    // });

    // for (var i = 0; i < 2; i++) {
    //     $scope.options.push(userlist[i].name);
    // }

    $scope.task = angular.copy(item);
    $scope.task.task_student = $scope.task.task_student.split(",");


    // alert(JSON.stringify(item));

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };
    $scope.title = (item.task_ID != null) ? 'Edit Task' : 'Add Task For:';
    $scope.buttonText = (item.task_ID > 0) ? 'Update Task' : 'Add New Task';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.task);
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


    ///Time

});


app.controller('taskUploadCtrl', function($scope, $cookies, $rootScope, $modalInstance, item, Data, Auth, FileUploader) {

    $scope.task = angular.copy(item);

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };
    $scope.title = 'Upload my work';
    $scope.buttonText = (item.task_ID > 0) ? 'Edit my work' : 'Submit my work';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.task);
    }
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php'
    });
    $scope.files = [];



    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.files.push(response.name);
        // alert(JSON.stringify(response));
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);

    $scope.saveProduct = function(task) {

        task.task_progress = 'Check work';
        task.work_file = $scope.files.toString();

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
    };

});


app.controller('taskCheckCtrl', function($scope, $cookies, $rootScope, $modalInstance, item, Data, Auth) {

    $scope.task = angular.copy(item);
    $scope.attachment = "http://cs.wku.edu.cn/spf/uploads/" + $scope.task.work_file;

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };
    $scope.title = "Check student's work";
    $scope.buttonText = 'Approve this work';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.task);
    }
    $scope.saveProduct = function(task) {

        task.task_progress = "Work approved";
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
    };
});
