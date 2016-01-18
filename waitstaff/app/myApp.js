    angular.module('myApp', ['ngMessages', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home/', {
            templateUrl: 'home.html'
        })
        $routeProvider.when('/', {
            templateUrl: 'home.html'
        })
        .when('/new-meal/', {
            templateUrl: 'new-meal.html',
            controller: 'NewMealCtrl'
        })
        .when('/my-earnings/', {
        templateUrl: 'my-earnings.html',
        controller: 'EarningsCtrl'
        })
        .otherwise('/error', {
            template: 'home.html'
        });
    }])
    .controller('EarningsCtrl', function($scope, $rootScope) {

        $scope.setLocal = function() {
            $scope.tipTotal = $rootScope.tipTotal;
            $scope.mealCount = $rootScope.mealCount;
            $scope.avgTipPerMeal = $rootScope.avgTipPerMeal;
        }

        if ($rootScope.tipTotal == undefined) {
             $scope.tipTotal = "0.00";
             $scope.mealCount = 0;
             $scope.avgTipPerMeal = "0.00";
         }
         else {
             $scope.setLocal();
         } 


        $scope.initValues = function() {
            $rootScope.baseMealPrice = "0.00";
            $rootScope.taxRate = "";
            $rootScope.tipPercentage = "";
            $rootScope.subTotal = "0.00";
            $rootScope.tip = "0.00";
            $rootScope.total = "0.00";
            $rootScope.tipTotal = "0.00";
            $rootScope.mealCount = 0;
            $rootScope.avgTipPerMeal = "0.00";
            $scope.setLocal();

        };

        $scope.reset = function() {
            $scope.initValues();     
            $rootScope.reset= 1;
        };

       
    })

    .controller('NewMealCtrl', function($scope, $rootScope) {

    
    $scope.submit = function() {

        if ($scope.myForm.$valid)
        {
            $rootScope.baseMealPrice = $scope.baseMealPrice;
            $rootScope.taxRate = $scope.taxRate;
            $rootScope.tipPercentage = $scope.tipPercentage;

            $rootScope.subTotal = (parseInt($rootScope.baseMealPrice) + (parseInt($rootScope.baseMealPrice) * parseInt($rootScope.taxRate) / 100)).toFixed(2);
            $rootScope.tip = parseInt($rootScope.subTotal * $rootScope.tipPercentage / 100).toFixed(2);
            $rootScope.total = (parseInt($rootScope.subTotal) + parseInt($rootScope.tip)).toFixed(2);
    
            $rootScope.tipTotal = (parseInt($rootScope.tipTotal) + parseInt($rootScope.tip)).toFixed(2);
            $rootScope.mealCount++; 
            $rootScope.avgTipPerMeal = ($rootScope.tipTotal / $rootScope.mealCount).toFixed(2);
  

        }
      
    };

    $scope.initInputValues = function() {
        $rootScope.baseMealPrice = "0.00";
        $rootScope.taxRate = "";
        $rootScope.tipPercentage = "";
    };

    $scope.initValues = function() {
        $scope.initInputValues();
        $rootScope.subTotal = "0.00";
        $rootScope.tip = "0.00";
        $rootScope.total = "0.00";
        $rootScope.tipTotal = "0.00";
        $rootScope.mealCount = 0;
        $rootScope.avgTipPerMeal = "0.00";


    };

    if ($rootScope.tipTotal == undefined) {
        $scope.initValues();
    }

    $scope.cancel = function() {
        $rootScope.initInputValues();     
        $scope.myForm.$setPristine();

    };


});

