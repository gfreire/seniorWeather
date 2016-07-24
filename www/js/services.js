angular.module('senior.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

angular.module('senior.weather.services', [])

.constant('API_KEY', 'fb786585d388f297541d1ff3dceae83e')

.constant('ICON_BASE_PATH', 'http://openweathermap.org/img/w/')

.service('$openweathermap', ['$http', '$localstorage', '$rootScope', 'API_KEY', 'ICON_BASE_PATH', function($http, $localstorage, $rootScope, API_KEY, ICON_BASE_PATH) {

    this.$scope = $rootScope;

    var _this = this;

    this.getWeatherByLatLon = function(lat, lon) {

        if (!_this.$scope.citiesWeather) {
            _this.$scope.citiesWeather = [];
        }

        // $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat='+lat+'&lon='+lon+'&appid='+API_KEY+'&units=metric&cnt=5&lang=pt').success(
        $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+API_KEY+'&units=metric&cnt=5&lang=pt').success(
            function(data, status, headers, config) {

                data.icon = ICON_BASE_PATH + data.weather[0].icon + ".png";
                data.realName = 'Localização Atual';
                _this.$scope.citiesWeather.unshift(data);

        }).error(function(data, status, headers, config) {

        }).finally(function() {
            _this.$scope.hide();
        });
    };

    this.getWeatherByName = function(city) {

        if (city == '') {
            city = 'Campinas';
        }

        if (!_this.$scope.citiesWeather) {
            _this.$scope.citiesWeather = [];
        }

        // $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&appid='+API_KEY+'&units=metric&cnt=5&lang=pt').success(
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+API_KEY+'&units=metric&cnt=5&lang=pt').success(
            function(data, status, headers, config) {

                data.icon = ICON_BASE_PATH + data.weather[0].icon + ".png";
                data.realName = city;
                _this.$scope.citiesWeather.push(data);

        }).error(function(data, status, headers, config) {

        }).finally(function() {
            _this.$scope.hide();
        });
    };
}]);
