<!DOCTYPE html>
<html ng-app="myApp">

<body ng-cloak="" ng-app="myApp">
    <title>WKU SpF Project Manage System</title>
    <meta name="Description" content="">
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="css/custom.css" type="text/css" />
    <link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
    <link href="css/toaster.css" rel="stylesheet">
    <link href="css/angular-pickadate.css" rel="stylesheet">
    <!-- <link rel="stylesheet" href="css/bootstrap-select.css"> -->
    <!-- Time -->
    <link rel="stylesheet" href="styles/angular-datepicker.css" />
    <style type="text/css">
    a {
        color: orange;
    }
            .my-drop-zone { border: dotted 3px lightgray; }
            .nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */
            .another-file-over-class { border: dotted 3px green; }

            html, body { height: 100%; }
    </style>
    <!-- Libraries -->
    <script src="js/angular.min.js"></script>
    <script src="js/ng-upload.min.js"></script>
    <script src="js/angular-cookies.js"></script>
    <script src="js/ui-bootstrap-tpls-0.11.2.min.js"></script>
    <script src="js/angular-route.min.js"></script>
    <script src="js/angular-animate.min.js"></script>
    <script src="js/toaster.js"></script>
    <!-- AngularJS custom codes -->
    <script src="app/app.js"></script>
    <script src="app/data.js"></script>
    <script src="app/directives.js"></script>
    <script src="app/ctrl_projects.js"></script>
    <script src="app/ctrl_project_report.js"></script>
    <script src="app/ctrl_tasks.js"></script>
    <script src="app/ctrl_users.js"></script>
    <script src="app/ctrl_auth.js"></script>
    <script src="app/ctrl_settings.js"></script>
    <script src="app/ctrl_dashboard.js"></script>
    <!-- Some Bootstrap Helper Libraries -->
    <script src="js/jquery-2.2.2.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/underscore.min.js"></script>
    <script src="js/angular-file-upload.min.js"></script>

    <!-- Select -->
    <script src="bower_components/angular-bootstrap-multiselect/dist/angular-bootstrap-multiselect.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="js/ie10-viewport-bug-workaround.js"></script>
    <!-- TimePicker -->
    <script src="js/moment.min.js"></script>
    <script src="js/moment-timezone-with-data.js"></script>
    <script src="js/datePicker.js"></script>
    <script src="js/datePickerUtils.js"></script>
    <script src="js/dateRange.js"></script>
    <script src="js/input.js"></script>
    <!-- <div class="container"> -->
    <div class="page-content">
        <div ng-view="" id="ng-view"></div>
    </div>
    <!-- </div> -->


    
</body>
<toaster-container toaster-options="{'time-out': 2000}"></toaster-container>

</html>
