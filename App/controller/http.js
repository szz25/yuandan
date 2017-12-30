app.controller('main', ['$scope', 'ajax', function($scope, ajax) {
    $scope.data = ajax.getJson({
        url: 'http://localhost:8080/list',
        method: 'POST'
    })
}])