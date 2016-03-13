app.controller('authCtrl', function($scope, $rootScope, $routeParams, $location, $http, Auth) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function(customer) {
        Auth.post('login', {
            customer: customer
        }).then(function(results) {
            Auth.toast(results);
            if (results.status == "success") {
                $location.path('project');
            }
        });
    };
    $scope.signup = { email: '', password: '', name: '', phone: '', address: '' };
    $scope.signUp = function(customer) {
        Auth.post('signUp', {
            customer: customer
        }).then(function(results) {
            Auth.toast(results);
            if (results.status == "success") {
                $location.path('project');
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

app.controller('productsCtrl', function($scope, $modal, $filter, Data, Auth) {

    $scope.project = {};
    Data.get('project').then(function(data) {
        $scope.project = data.data;
    });
    $scope.logout = function() {
        Auth.get('logout').then(function(results) {
            Auth.toast(results);
            $location.path('login');
        });
    }
    $scope.changeProductStatus = function(project) {
        project.status = (project.status == "Active" ? "Inactive" : "Active");
        Data.put("project/" + project.id, { status: project.status });
    };
    $scope.deleteProduct = function(project) {
        if (confirm("Are you sure to remove the project")) {
            Data.delete("project/" + project.id).then(function(result) {
                Auth.toast(result);
                $scope.project = _.without($scope.project, _.findWhere($scope.project, { id: project.id }));
            });

        }
    };
    $scope.open = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/productEdit.html',
            controller: 'productEditCtrl',
            size: size,
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                $scope.project.push(selectedObject);
                $scope.project = $filter('orderBy')($scope.project, 'id', 'reverse');
            } else if (selectedObject.save == "update") {
                p.description = selectedObject.description;
                p.student = selectedObject.student;
                p.faculty = selectedObject.faculty;
                p.progress = selectedObject.progress;
            }
        });
    };

    $scope.columns = [
        { text: "ID", predicate: "id", sortable: true, dataType: "number" },
        { text: "Title", predicate: "title", sortable: true },
        // {text:"Description",predicate:"description",sortable:true},
        { text: "Student", predicate: "student", sortable: true },
        { text: "Faculty", predicate: "faculty", sortable: true },
        { text: "Progress", predicate: "progress", reverse: true, sortable: true, dataType: "number" },
        { text: "Status", predicate: "status", sortable: true },
        { text: "Action", predicate: "", sortable: false }
    ];

});

app.controller('productEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.product = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit Product' : 'Add Product';
        $scope.buttonText = (item.id > 0) ? 'Update Product' : 'Add New Product';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.product);
        }
        $scope.saveProduct = function (product) {
            product.uid = $scope.uid;
            if(product.id > 0){
                Data.put('project/'+product.id, product).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(product);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                product.status = 'Active';
                Data.post('project', product).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(product);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});



///worksCtrl
app.controller('worksCtrl', function($scope, $modal, $filter, Data) {
    $scope.product = {};
    Data.get('works').then(function(data) {
        $scope.products = data.data;
    });
    $scope.changeProductStatus = function(product) {
        product.status = (product.status == "Approve" ? "Unprove" : "Approve");
        Data.put("works/" + product.id, { status: product.status });
    };
    $scope.deleteProduct = function(product) {
        if (confirm("Are you sure to remove the product")) {
            Data.delete("works/" + product.id).then(function(result) {
                $scope.products = _.without($scope.products, _.findWhere($scope.products, { id: product.id }));
            });
        }
    };
    $scope.open = function(p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/productEdit.html',
            controller: 'productEditCtrl',
            size: size,
            resolve: {
                item: function() {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if (selectedObject.save == "insert") {
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            } else if (selectedObject.save == "update") {
                p.description = selectedObject.description;
                p.student = selectedObject.student;
                p.faculty = selectedObject.faculty;
                p.progress = selectedObject.progress;
            }
        });
    };

    $scope.columns = [
        { text: "ID", predicate: "id", sortable: true, dataType: "number" },
        { text: "Project", predicate: "title", sortable: true },
        { text: "Task Description", predicate: "description", sortable: true },
        { text: "Student", predicate: "student", sortable: true },
        { text: "Faculty", predicate: "faculty", sortable: true },
        { text: "Progress", predicate: "progress", reverse: true, sortable: true, dataType: "number" },
        { text: "Approve", predicate: "status", sortable: true },
        { text: "Action", predicate: "", sortable: false }
    ];

});

///usersCtrl
app.controller('usersCtrl', function($scope, $modal, $filter, Data) {
    $scope.product = {};
    Data.get('products').then(function(data) {
        $scope.products = data.data;
    });
    $scope.changeProductStatus = function(product) {
        product.status = (product.status == "Approve" ? "Unprove" : "Approve");
        Data.put("products/" + product.id, { status: product.status });
    };
    $scope.deleteProduct = function(product) {
        if (confirm("Are you sure to remove the product")) {
            Data.delete("products/" + product.id).then(function(result) {
                $scope.products = _.without($scope.products, _.findWhere($scope.products, { id: product.id }));
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
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            } else if (selectedObject.save == "update") {
                p.description = selectedObject.description;
                p.student = selectedObject.student;
                p.faculty = selectedObject.faculty;
                p.progress = selectedObject.progress;
            }
        });
    };

    $scope.columns = [
        { text: "ID", predicate: "id", sortable: true, dataType: "number" },
        { text: "Username", predicate: "title", sortable: true },
        { text: "Faculty", predicate: "description", sortable: true },
        { text: "First Name", predicate: "student", sortable: true },
        { text: "Last Name", predicate: "faculty", sortable: true },
        { text: "Role", predicate: "progress", reverse: true, sortable: true, dataType: "number" },
        // {text:"Approve",predicate:"status",sortable:true},
        { text: "Action", predicate: "", sortable: false }
    ];

});

///Users update

app.controller('userEditCtrl', function($scope, $modalInstance, item, Data) {

    $scope.product = angular.copy(item);

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
            Data.put('products/' + product.id, product).then(function(result) {
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
            Data.post('products', product).then(function(result) {
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
