app.controller('tasksCtrl', function($scope, $modal, $filter, Data, Auth) {
    $scope.logout = function() {
        Auth.get('logout').then(function(results) {
            Auth.toast(results);
            $location.path('login');
        });
    }

    $scope.task = { task_ID: '', task_author: '' };
    $scope.tasks = {};

    Data.get('tasks').then(function(data) {
        $scope.tasks = data.data;
    });

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
            size: size,
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                $scope.tasks.push(selectedObject);
                $scope.tasks = $filter('orderBy')($scope.tasks, 'task_ID', 'reverse');
            } else if (selectedObject.save == "update") {
                p.task_title = selectedObject.task_title;
                p.task_author = selectedObject.task_author;
                p.task_description = selectedObject.task_description;
                p.task_student = selectedObject.task_student;
                p.task_progress = selectedObject.task_progress;
            }
        });
    };

    $scope.columns = [
        { text: "Task description", predicate: "task_description", sortable: true },
        { text: "Released by", predicate: "task_faculty", sortable: true },
        { text: "Student", predicate: "task_student", sortable: true },
        { text: "Due", predicate: "task_due", sortable: true },
        { text: "Progress", predicate: "task_progress", reverse: true, sortable: true },
        { text: "Action", predicate: "", sortable: false },

    ];

});


app.controller('taskEditCtrl', function($scope, $modalInstance, item, Data, Auth) {

    $scope.example = {
        value: new Date(2010, 11, 28, 14, 57)
    };
    $scope.task = angular.copy(item);
    // alert(JSON.stringify(item));

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };
    $scope.title = (item.task_ID != null) ? 'Edit Task' : 'Add Task';
    $scope.buttonText = (item.task_ID > 0) ? 'Update Task' : 'Add New Task';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.task);
    }
    $scope.saveProduct = function(task) {

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
            // task.task_author = name;
            alert(name);
            task.task_status = 'Upload work';
            Data.post('tasks', task).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(task);
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