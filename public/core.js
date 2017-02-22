var app = angular.module('app', ['chart.js', 'ngRoute'])
// app.config(['ChartJsProvider', function (ChartJsProvider) {
//     // Configure all charts
//     ChartJsProvider.setOptions({
//         chartColors: ['#FF5252', '#FF8A80'],
//         responsive: true
//     });
//     // Configure all line charts
//     ChartJsProvider.setOptions('line', {
//         showLines: true
//     });
//     // Configure all line charts
//     ChartJsProvider.setOptions('legend', {
//         labels: {
//
//         }
//     });
// }])
app.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl : 'home.html',
        controller  : 'mainController'
    }).when('/config', {
        templateUrl : 'config.html',
        controller  : 'configController'
    })

    $locationProvider.html5Mode(true);
})

app.controller("mainController", ["$scope", "$http", function($scope, $http){
    $scope.formData = {};

    $scope.data = {
        labels: ['21/02/2017','22/02/2017', '23/02/2017', '24/02/2017'],
        data: [['20', '30', '20', '23'], ['15', '20', '22', '23']],
        series: ['serie a', 'serie b']
    }

    $scope.getData = function(){
        $http.get('/api/data')
        .then(function(data) {
            // $scope.data.data = data.data.map((x, i) => x[Object.keys(x)[i]]);
            data.data.forEach(x => delete x._id)
            $scope.data.series = Object.keys(data.data[0])
            $scope.data.labels = data.data.map(x => x.date)
            data.data.forEach(x => delete x.date);
            $scope.data.data = data.data;
            console.log($scope.data);
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }

    // when submitting the add form, send the text to the node API
    $scope.insertData = function() {
        $http.post('/api/data', $scope.formData)
        .then(function(data) {
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.data.push(data.data);
            console.log(data);
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    };

    $scope.getData();
}])

app.controller("configController", ["$scope", "$http", function($scope, $http){

}]);
