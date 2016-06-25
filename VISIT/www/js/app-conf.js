/**
 * 默认程序设置
 */
var SETTING = {
    PLATFORM: 'iphone',
    OS_NAME: 'ios',
    OS_VERSION: '5.0',
    APP_VERSION: '1.0.0',
    UDID: 'TEST-UDID'
};

var ERROR = {
    WRONG_ACCESSTOKEN: 'wrong accessToken',
    HEHE_YOU_CANNOT: '呵呵，不能帮自己点赞。',
    IS_NOT_EXISTS: 'is not exists',
    TIME_OUT: 5000
};

var USER = {};

var API_HOST = '/api';
//var API_HOST = 'http://vipapi-v3.shanghaiwow.com/api';
var API = {
    HOME: API_HOST + '/home',
    
    ALLCOMPANY: API_HOST + '/allcompanies',
    
    COMPANYINFO: API_HOST + '/companyinfo'


};

String.prototype.formatParam = function () {
    var string = this + '';
    for (var i = 0; i < arguments.length; i++) {
        string = string.replace(/{(:\w+)}/, arguments[i]);
    }
    return string;
};
