angular.module('starter.controllers', [])

.controller('HomeCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory,$state) {

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

.controller('SortCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory,$state) {

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

.controller('CompanyDetailCtrl', function ($scope, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $localstorage, $ionicHistory,$state,$stateParams) {

    $scope.$on('$ionicView.enter', function () {
        $ionicTabsDelegate.$getByHandle('tabs').showBar(false);
    });

    /*initialize the $scope variable*/
    $scope.company = '';
    $scope.event = '';
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
            url: API.COMPANYINFO,
            headers: SETTING,
            data: {
                id: $scope.id
            },
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
    
    /**
     * Change Coupon or activity
     * @author fly
     * @param null
     * @return null
     */
    $scope.chooseCoupon = function () {
        $ionicScrollDelegate.scrollTop();
        $scope.couponTab = 'active-tab';
        $scope.activityTab = '';
    };
    $scope.chooseActivity = function () {
        $ionicScrollDelegate.scrollTop();
        $scope.couponTab = '';
        $scope.activityTab = 'active-tab';
    };

});