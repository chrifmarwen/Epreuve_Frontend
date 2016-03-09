
module.exports = function ($scope, $rootScope, $state) {
    $scope.currentUser = $rootScope.globals.currentUser;
    $scope.uiRouterState = $state;
    $scope.toggled = true;
    $scope.toggleMenu = function() {
        $scope.toggled = !$scope.toggled;
    };
};