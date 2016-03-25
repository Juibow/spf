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

    $scope.edit = function(p, size) {
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
                $scope.users.push(selectedObject);
                $scope.users = $filter('orderBy')($scope.users, 'uid', 'reverse');
            } else if (selectedObject.save == "update") {
                p.uid = selectedObject.uid;
                p.name = selectedObject.name;
                p.first_name = selectedObject.first_name;
                p.last_name = selectedObject.last_name;
            }
        });
    };

    $scope.open = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/userAdd.html',
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
                $scope.users.push(selectedObject);
                $scope.users = $filter('orderBy')($scope.users, 'uid', 'reverse');
            } else if (selectedObject.save == "update") {
                p.uid = selectedObject.uid;
                p.name = selectedObject.name;
                p.first_name = selectedObject.first_name;
                p.last_name = selectedObject.last_name;
            }
        });
    };

    $scope.columns = [
        { text: "ID", predicate: "id", sortable: true, dataType: "number" },
        { text: "First Name", predicate: "student", sortable: true },
        { text: "Last Name", predicate: "faculty", sortable: true },
        { text: "Role", predicate: "progress", reverse: true, sortable: true, dataType: "number" },
        { text: "Phone", predicate: "status", sortable: true },
        { text: "email", predicate: "email", sortable: true },
        { text: "Action", predicate: "", sortable: false }
    ];

});

///Users updatefunction($scope, $rootScope, $routeParams, $location, $http, Auth)

app.controller('userEditCtrl', function($scope, $rootScope, $routeParams, $location, $modalInstance, $http, Auth, item, Data) {

    $scope.login = {};
    $scope.signup = {};
    $scope.signup = { email: '', password: '', name: '', phone: '' };
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

    $scope.U = angular.copy(item);

    $scope.cancel = function() {
        $modalInstance.dismiss('Close');
    };

    $scope.title = (item.id > 0) ? 'Edit Product' : 'Add Product';
    $scope.buttonText = (item.id > 0) ? 'Update Product' : 'Add New Product';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.product);
    }
    $scope.saveProduct = function(product) {
        product.uid = $scope.uid;
        if (product.id > 0) {
            Data.put('users/' + product.id, product).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(product);
                    x.save = 'update';
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
        } else {
            product.status = 'Active';
            Data.post('users', product).then(function(result) {
                if (result.status != 'error') {
                    var x = angular.copy(product);
                    x.save = 'insert';
                    x.id = result.data;
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
        }

    };
});
