app.factory('ajax', function($q, $http) {
    return {
        getJson: function(obj) {
            const defer = $q.defer();
            $http(obj)
                .then(function(result) {
                    defer.resolve(result.data)
                })
            return $q.all(defer).$$state
        }
    }
})