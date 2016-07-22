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

.service('$owm', ['$http', '$localstorage', '$rootScope', function($http, $localstorage, $rootScope) {

    this.$scope = $rootScope;

    var _this = this;

    this.getWeatherCondition = function(city) {

        if (city == '') {
            city = 'Campinas';
        }

        _this.$scope.weatherItems = [];

        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+API_KEY+'&units=metrics&count=5&lang=pt').success(
            function(data, status, headers, config) {

                 _this.getIcon(data).then(function(d){
                    var prefix = 'wi wi-';
                    var code = data.weather[0].id;
                    var icon = d.data[code].icon;

                    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                        icon = 'day-' + icon;
                    }

                    icon = prefix + icon;

                    data.weatherIcon = icon;
                    data.realName = location_name;
                    _this.$scope.weatherItems.push(data);
                });
        }).error(function(data, status, headers, config) {

        }).finally(function() {
            //$scope.hide();
        });
    };

    this.getMonthName = function(dt) {

        return new Date(dt).toLocaleString({ month: "short" });
    };

    this.getDayName = function(dt) {

        return new Date(dt).toLocaleString({ weekday: "long" });
    };
}]);
