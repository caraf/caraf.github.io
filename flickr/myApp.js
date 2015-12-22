angular.module('myApp', ['ngMessages'])
    .controller('MyCtrl', ['$scope', '$timeout', '$q', '$http', function($scope, $timeout, $q, $http) {

    $scope.searchTag = "Enter a tag to search";
    $scope.searchTagReal = "";
    $scope.pics = [];
    $scope.looking = false;
    $scope.checkForRequired = true;
    $scope.failedQuery = false;
    $scope.results = false;

    $scope.submit = function() {

        $scope.checkForRequired = true;
        console.log($scope.myForm);
        $scope.pics = [];
        $scope.failedQuery = false;
        $scope.results = false;

        if ($scope.myForm.searchTag.$dirty && $scope.myForm.searchTag.$valid)
        {
            $scope.searchTagReal = $scope.searchTag;
            $scope.searchTag = "";
            $scope.checkForRequired = false;
            $scope.looking = true;;
    
            var httpParams = {
                method: 'flickr.photos.search',
                api_key: '2eefeb663b560aa3d4d3a6eb05b2f0d1',
                tags: $scope.searchTagReal,
                format: 'json',
                nojsoncallback: 1
    
            };
            
            $http({
                url: 'https://api.flickr.com/services/rest',
                params: httpParams
             })
             .then(
                 function(response) {
                    $scope.pics = response.data.photos.photo;
                    $scope.results = true;
                    $scope.looking = false;
			    
                },
                function() {
                    $scope.failedQuery = true;
                    $scope.looking = false;
                }
            )
        }
    };


}]);


