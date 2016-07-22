angular.module('senior.weather.controllers', [])

.constant('CITIES_STORAGE', 'senior.weather.cities')

.controller('WeatherCtrl', function($scope, $http, $localstorage, $openweathermap, $ionicLoading, $timeout, $ionicSlideBoxDelegate, $state, CITIES_STORAGE) {
    var loadWeather = function() {
        var cities = $localstorage.getObject(CITIES_STORAGE) || {};

        if (Object.keys(cities).length == 0) {
            $state.go("tab.cities");
        } else {
            $ionicLoading.show({
                template: 'Loading...'
            });

            angular.forEach(cities, function(city){
                if (city.name != '') {
                    $openweathermap.getWeatherCondition(city.name);
                }
            });

            $scope.Math = window.Math;

            $timeout(function(){
                $ionicSlideBoxDelegate.update();
                $ionicLoading.hide();
            }, 1000);
        };
    };

    // Slider
    $scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500,
    }

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.doRefresh = function() {
        loadWeather();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply()
    };

    $scope.getMonthName = function(dt) {
        return $openweathermap.getMonthName(dt);
    };

    $scope.getDayName = function(dt) {
        return $openweathermap.getDayName(dt);
    };

    loadWeather();
})

.controller('CitiesCtrl', function($scope, $localstorage, CITIES_STORAGE) {

    $scope.model = {city:''};

    $scope.addCity = function(city) {

        var cities = $localstorage.getObject(CITIES_STORAGE) || {};

        if (Object.keys(cities).length == 0) {
          cities = [];
        }
        cities.push({'name':city});
        
        $localstorage.setObject(CITIES_STORAGE, cities);

        $scope.cities = cities;

        $scope.model = {city:''};
    }

    $scope.cities = $localstorage.getObject(CITIES_STORAGE);

    $scope.deleteCity = function(index) {
        var cities = $localstorage.getObject(CITIES_STORAGE);
        cities.splice(index, 1);

        $scope.cities = cities;

        $localstorage.setObject(CITIES_STORAGE, cities);
    }

});
