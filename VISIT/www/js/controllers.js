angular.module('starter.controllers', [])

.controller('HomeCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory, $state) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(true);
    });

    /*initialize the $scope variable*/
    $scope.company = [];
    $scope.focus = [];

    /**
     * Initialize the Controller
     * @author fly
     * @param null
     * @return null
     */
    var init = function () {

        $ionicLoading.show();
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: API.HOME,
            headers: SETTING,
            data: {},
            success: function (result) {
                if (result.statusCode == 200) {
                    console.log(result.data);
                    $scope.company = result.data.company;
                    $scope.focus = result.data.hot;
                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle("slide-focus").update();
                    }, 100);

                }
                $ionicLoading.hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
                $ionicLoading.hide();
            }
        });
    };

    init();

    $scope.sort = function (sort) {
        $state.go('tab.sort', {
            sort: sort
        });
    };

    $scope.goCompanyDetail = function (id) {
        $state.go('tab.home-company-detail', {
            id: id
        });
    };

})

.controller('SortCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory, $state) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(true);
    });

    /*initialize the $scope variable*/
    $scope.company = [];

    /**
     * Initialize the Controller
     * @author fly
     * @param null
     * @return null
     */
    var init = function () {

        $ionicLoading.show();
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: API.ALLCOMPANY,
            headers: SETTING,
            data: {},
            success: function (result) {
                if (result.statusCode == 200) {
                    console.log(result.data);
                    $scope.company = result.data;


                }
                $ionicLoading.hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
                $ionicLoading.hide();
            }
        });
    };

    init();

})

.controller('CompanyDetailCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(false);
    });

    /*initialize the $scope variable*/
    $scope.company = '';
    $scope.event = '';
    $scope.id = $stateParams.id;

    $scope.eventtab = 'active-tab';
    $scope.detailtab = '';

    /**
     * Initialize the Controller
     * @author fly
     * @param null
     * @return null
     */
    var init = function () {

        $ionicLoading.show();
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: API.COMPANYINFO,
            headers: SETTING,
            data: {
                id: $scope.id
            },
            success: function (result) {
                if (result.statusCode == 200) {
                    console.log(result.data);
                    $scope.company = result.data.company;
                    $scope.event = result.data.events;

                }
                $ionicLoading.hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
                $ionicLoading.hide();
            }
        });
    };

    init();

    /**
     * Change 
     * @author fly
     * @param null
     * @return null
     */
    $scope.chooseEvent = function () {
        $ionicScrollDelegate.scrollTop();
        $scope.eventtab = 'active-tab';
        $scope.detailtab = '';
    };
    $scope.chooseDetail = function () {
        $ionicScrollDelegate.scrollTop();
        $scope.eventtab = '';
        $scope.detailtab = 'active-tab';
    };

    $scope.goEventDetail = function (id) {
        $state.go('tab.home-event-detail', {
            id: id
        });
    };

})

.controller('EventDetailCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(false);
    });

    /*initialize the $scope variable*/
    $scope.data = '';
    $scope.id = $stateParams.id;



    /**
     * Initialize the Controller
     * @author fly
     * @param null
     * @return null
     */
    var init = function () {

        $ionicLoading.show();
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: API.EVENTINFO,
            headers: SETTING,
            data: {
                id: $scope.id
            },
            success: function (result) {
                if (result.statusCode == 200) {
                    console.log(result.data);
                    $scope.data = result.data;

                }
                $ionicLoading.hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
                $ionicLoading.hide();
            }
        });
    };

    init();


})

.controller('SearchCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(true);
    });

    $scope.name = {
        value: ''
    };

    $scope.clear = function () {
        $scope.name.value = '';
    };

    $scope.Search = function () {
        $state.go('tab.sort', {
            sort: ''
        });
    };

    $scope.KeySearch = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.Search();
        }
    };

})

.controller('CompanyCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(true);
    });

    $scope.company = '';
    
    /**
     * Initialize the Controller
     * @author fly
     * @param null
     * @return null
     */
    var init = function () {

        $ionicLoading.show();
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: API.COMPANY,
            headers: SETTING,
            data: {},
            success: function (result) {
                if (result.statusCode == 200) {
                    console.log(result.data);
                    $scope.company = result.data.company;

                }
                $ionicLoading.hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
                $ionicLoading.hide();
            }
        });
    };

    init();
})

.controller('EventCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(true);
    });

    $scope.event = '';
    
    /**
     * Initialize the Controller
     * @author fly
     * @param null
     * @return null
     */
    var init = function () {
        
        $ionicLoading.show();
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: API.EVENT,
            headers: SETTING,
            data: {},
            success: function (result) {
                if (result.statusCode == 200) {
                    console.log(result.data);
                    $scope.event = result.data.company;

                }
                $ionicLoading.hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
                $ionicLoading.hide();
            }
        });
    };

    init();
})

.controller('UserCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory, $state, $stateParams, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(true);
    });

});