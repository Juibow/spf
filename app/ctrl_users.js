///usersCtrl
app.controller('usersCtrl', function($scope, $modal, $filter, Data, Auth) {
    $scope.user = {};
    $scope.users = {};
    Data.get('users').then(function(data) {
        $scope.users = data.data;

    });
    $scope.changeProductStatus = function(product) {
        product.status = (product.status == "Approve" ? "Unprove" : "Approve");
        Data.put("users/" + product.id, { status: product.status });
    };
    $scope.deleteProduct = function(product) {
        // alert(JSON.stringify(product));
        if (confirm("Are you sure to remove the user")) {
            Data.delete("users/" + product.email).then(function(result) {
                $scope.users = _.without($scope.users, _.findWhere($scope.users, { email: product.email }));
            });
        }
    };


    $scope.open = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/userEdit.html',
            controller: 'userEditCtrl',
            size: size,
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                Data.get('users').then(function(data) {
                    $scope.users = data.data;
                });
                $scope.users = $filter('orderBy')($scope.users, 'uid', 'reverse');
            } else if (selectedObject.save == "update") {
                p.uid = selectedObject.uid;
                p.name = selectedObject.name;
                p.name = selectedObject.name;
            }
        });
    };

    $scope.columns = [
        { text: "ID", predicate: "uid", sortable: true, dataType: "number" },
        { text: "Name", predicate: "name", sortable: true },
        { text: "Role", predicate: "role", reverse: true, sortable: true, dataType: "number" },
        { text: "Phone", predicate: "phone", sortable: true },
        { text: "email", predicate: "email", sortable: true },
        { text: "Action", predicate: "", sortable: false }
    ];

});

///Users updatefunction($scope, $rootScope, $routeParams, $location, $http, Auth)

app.controller('userEditCtrl', function($scope, $rootScope, $routeParams, $location, $modalInstance, $http, Auth, item, Data) {

    $scope.login = {};
    $scope.user = {};
    $scope.user = { email: '', password: '', name: '', phone: '' };
    $scope.signUp = function(customer) {
        Auth.post('signUp', {
            customer: customer
        }).then(function(results) {
            Auth.toast(results);
            if (results.status == "success") {
                var x = angular.copy(customer);
                x.save = 'insert';
                x.id = results.data;
                $modalInstance.close(x);
            }
        });
    };

    $scope.role_options = ["Administrator", "Faculty", "Student"];

    $scope.save = function(customer) {

        Data.post('users', customer).then(function(result) {
            if (result.status != 'error') {
                var x = angular.copy(project);
                x.save = 'insert';
                x.id = result.data;
                $modalInstance.close(x);
            } else {
                console.log(result);
            }
            Auth.toast(result);
        });

    };

    $scope.user = angular.copy(item);

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };

    $scope.title = (item.uid > 0) ? 'Edit User' : 'Add User';
    $scope.buttonText = (item.uid > 0) ? 'Update User' : 'Add New User';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.user);
    }
    $scope.saveUser = function(user) {
        if (user.uid > 0) {
            Data.put('users/' + user.uid, user).then(function(result) {
                Auth.toast(result);
                if (result.status != 'error') {
                    var x = angular.copy(user);
                    x.save = 'update';
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
        } else {
            Auth.post('signUp', {
                customer: user
            }).then(function(results) {
                Auth.toast(results);
                if (results.status == "success") {
                    var x = angular.copy(user);
                    x.save = 'insert';
                    x.id = results.data;
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
        }

    };
});
