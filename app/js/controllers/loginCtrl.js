/**
 * Created by Marwen on 05/03/2016.
 */

module.exports = function ($scope, $rootScope, $state,$cookieStore) {
    $scope.loginObj = {
        username: "",
        password: "",
        rememberMe: false
    };
    var loginObj = $scope.loginObj;

    // init
    (function() {

    }());

    $scope.signin = function() {
        if(loginObj.username === 'admin' && loginObj.password === 'admin') {
            // TODO : set cookies expiration to month if remmeberMe is true
            $rootScope.globals = {
                currentUser: {
                    username: loginObj.username,
                    authdata: loginObj.password
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
            $state.go('root.people_directory');
        } else {

        }
    };
};