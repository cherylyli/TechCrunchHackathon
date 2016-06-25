// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            //StatusBar.styleDefault();
            StatusBar.styleLightContent();
        }
    });
})

.run(function ($localstorage, $interval) {
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: API.LOGIN,
        headers: SETTING,
        data: {
            phone: '13344445555'
        },
        success: function (result) {
            if (result.statusCode == 200) {
                console.log(result);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });


    /*get the navigator geolocation*/

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 60000,
            timeout: 30000
        };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    }

    function onSuccess(position) {
        $localstorage.set('user.latitude', position.coords.latitude);
        $localstorage.set('user.longitude', position.coords.longitude);
        console.log('Latitude:' + position.coords.latitude + ' - Longitude:' + position.coords.longitude);
    }

    function onError(error) {
        console.log('code: ' + error.code + ' - message: ' + error.message);
    }
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/index.html',
                controller: 'HomeCtrl'
            }
        }
    })

    .state('tab.sort', {
        url: '/sort',
        params: {
            sort: null,
        },
        views: {
            'tab-home': {
                templateUrl: 'templates/home/sort.html',
                controller: 'SortCtrl'
            }
        }
    })

    .state('tab.home-company-detail', {
        url: '/home-company-detail/{id}/{tab}',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/company-detail.html',
                controller: 'CompanyDetailCtrl'
            }
        }
    })

    .state('tab.home-event-detail', {
        url: '/home-event-detail/{id}',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/event-detail.html',
                controller: 'EventDetailCtrl'
            }
        }
    })

    .state('tab.search', {
        url: '/search',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    .state('tab.company', {
        url: '/company',
        views: {
            'tab-company': {
                templateUrl: 'templates/company/index.html',
                controller: 'CompanyCtrl'
            }
        }
    })

    .state('tab.company-company-detail', {
        url: '/company-company-detail/{id}/{tab}',
        views: {
            'tab-company': {
                templateUrl: 'templates/home/company-detail.html',
                controller: 'CompanyDetailCtrl'
            }
        }
    })

    .state('tab.company-event-detail', {
        url: '/company-event-detail/{id}',
        views: {
            'tab-company': {
                templateUrl: 'templates/home/event-detail.html',
                controller: 'EventDetailCtrl'
            }
        }
    })
    
    .state('tab.event', {
        url: '/event',
        views: {
            'tab-event': {
                templateUrl: 'templates/event/index.html',
                controller: 'EventCtrl'
            }
        }
    })
    
    .state('tab.event-event-detail', {
        url: '/event-event-detail/{id}',
        views: {
            'tab-event': {
                templateUrl: 'templates/home/event-detail.html',
                controller: 'EventDetailCtrl'
            }
        }
    })

    .state('tab.user', {
        url: '/user',
        views: {
            'tab-user': {
                templateUrl: 'templates/user/index.html',
                controller: 'UserCtrl'
            }
        }
    })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

});