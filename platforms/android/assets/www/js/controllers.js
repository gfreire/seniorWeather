angular.module('senior.weather.controllers', [])

.constant('CITIES_STORAGE', 'senior.weather.cities')

.controller('WeatherCtrl', function($scope, $http, $localstorage, $owm, $ionicPopup, $timeout, $ionicSlideBoxDelegate, $ionicLoading, $state) {
    // var loadWeather = function() {
    //     var cities = $localstorage.getObject('CITIES_STORAGE') || {};

    //     if (Object.keys(weatherLocations).length == 0) {
    //         $state.go("tab.locations");
    //     } else {
    //         $ionicLoading.show({
    //             template: 'Loading weather...'
    //         });

    //         angular.forEach(weatherLocations, function(wloc){
    //             if (typeof wloc.name != 'undefined') {
    //                 $owm.getWeatherCondition(wloc.name);
    //             }
    //         });

    //         $scope.Math = window.Math;

    //         $timeout(function(){
    //             $ionicSlideBoxDelegate.update();
    //             $ionicLoading.hide();
    //         }, 1000);
    //     };
    // };

    // $scope.doRefresh = function() {
    //     loadWeather();
    //     $scope.$broadcast('scroll.refreshComplete');
    //     $scope.$apply()
    // };

    // $scope.getMonthName = function(dt) {
    //     return $owm.getMonthName(dt);
    // };

    // $scope.getDayName = function(dt) {
    //     return $owm.getDayName(dt);
    // };

    // loadWeather();
})

.controller('CitiesCtrl', function($scope, $localstorage) {

    $scope.model = {city:null};

    $scope.addCity = function(city){

        var cities = $localstorage.getObject('CITIES_STORAGE') || {};

        cities.push({'name':city});
        
        $localstorage.setObject('CITIES_STORAGE', cities);

        $scope.cities = cities;

        $scope.model = {city:''};
    });

    $scope.cities = $localstorage.getObject('CITIES_STORAGE');

    $scope.deleteCity = function(index) {
        var cities = $localstorage.getObject('CITIES_STORAGE');
        cities.splice(index, 1);

        $scope.cities = cities;

        $localstorage.setObject('CITIES_STORAGE', cities);
    }

});
