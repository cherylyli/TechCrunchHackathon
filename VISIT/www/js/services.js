angular.module('starter.services', [])

.factory('URL', function () {
    return {
        mergeHttp: function (url) {
            return url.replace(/http:\/\//g, '');
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = document.URL.split('?')[1].match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        }
    };
})

.factory('$localstorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}])

.factory("fromStateServ", function () {
    return {
        data: {},
        setState: function (module, fromState, fromParams) {
            this.data[module] = {
                "fromState": fromState,
                "fromParams": fromParams
            };
        },
        getState: function (module) {
            return this.data[module];
        }
    };
})

.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            if (attrs.src == undefined) {
                attrs.$set('src', attrs.errSrc);
            }
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    };
})

.constant('$ionicLoadingConfig', {
    templateUrl: 'templates/loading.html',
    noBackdrop: true
});