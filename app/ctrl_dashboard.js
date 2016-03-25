app.controller('dashboardCtrl', function($rootScope, $log, $location, $scope, $modal, $filter, Data, Auth) {
    $scope.dates = {
        today: moment.tz('UTC').hour(12).startOf('h'), //12:00 UTC, today.
        minDate: moment.tz('UTC').add(-4, 'd').hour(12).startOf('h'), //12:00 UTC, four days ago.
        maxDate: moment.tz('UTC').add(4, 'd').hour(12).startOf('h'), //12:00 UTC, in four days.
    };

    $scope.options = {
        view: 'date',
        format: 'lll',
        maxView: false,
        minView: 'hours',
    };

    $scope.minDate = $scope.dates.minDate;
    $scope.maxDate = $scope.dates.maxDate;

    $scope.formats = [
        "MMMM YYYY",
        "DD MMM YYYY",
        "ddd MMM DD YYYY",
        "D MMM YYYY HH:mm",
        "lll",
    ];

    $scope.timezones = [
        ['London, UK', 'Europe/London'],
        ['Hong Kong, China', 'Asia/Hong_Kong'],
        ['Vancouver, Canada', 'America/Vancouver'],
    ];

    $scope.views = ['year', 'month', 'date', 'hours', 'minutes'];

    $scope.callbackState = 'Callback: Not fired';

    $scope.changeDate = function(modelName, newDate) {
        console.log(modelName + ' has had a date change. New value is ' + newDate.format());
        $scope.callbackState = 'Callback: Fired';
    }

    $scope.changeMinMax = function(modelName, newValue) {
        //minDate or maxDate updated. Generate events to update relevant pickers

        var values = {
            minDate: false,
            maxDate: false,
        }

        if (modelName === 'dates.minDate') {
            values.minDate = newValue;
            $scope.$broadcast('pickerUpdate', ['pickerMinDate', 'pickerMinDateDiv', 'pickerMaxSelector'], values);
            values.maxDate = $scope.dates.maxDate;
        } else if (modelName === 'dates.maxDate') {
            values.maxDate = newValue;
            $scope.$broadcast('pickerUpdate', ['pickerMaxDate', 'pickerMaxDateDiv', 'pickerMinSelector'], values);
            values.minDate = $scope.dates.minDate;
        }

        //For either min/max update, update the pickers which use both.
        $scope.$broadcast('pickerUpdate', ['pickerBothDates', 'pickerBothDatesDiv'], values);
    }

    $scope.changeData = function(type) {
        var values = {},
            pickersToUpdate = ['pickerMinDate', 'pickerMaxDate', 'pickerBothDates', 'pickerMinDateDiv', 'pickerMaxDateDiv', 'pickerBothDatesDiv', 'pickerRange'];

        switch (type) {
            case 'view':
                values.view = $scope.options.view;
                break;
            case 'minView':
                values.minView = $scope.options.minView;
                break;
            case 'maxView':
                values.maxView = $scope.options.maxView;
                break;
            case 'format':
                values.format = $scope.options.format;
                break;
        }

        if (values) {
            $scope.$broadcast('pickerUpdate', pickersToUpdate, values);
        }
    }
});
