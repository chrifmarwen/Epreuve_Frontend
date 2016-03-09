(function () {

    'use strict';

    // 3rd party dependency
    require('angular');
    require('angular-ui-router');
    require('angular-animate');
    require('angular-cookies');

    // Local controller requirements
    var mainCtrl = require('./controllers/mainCtrl');
    var loginController = require('./controllers/loginCtrl');
    var peopleDirectoryController = require('./controllers/peopleDirectoryCtrl');
    var rhManagementController = require('./controllers/rhManagementCtrl');

    // Local services requirements
    var peopleProvider = require('./services/peopleProvider.js');

    // Local directives requirements
    var ngList = require('./directives/ngList.js');

    var services = angular.module('services', []);
    var directives = angular.module('directives', []);
    var app = angular.module('EmployeeDirectory', ['ui.router',
        'ngAnimate',
        'ngCookies',
        'services',
        'directives'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                // routes
                $stateProvider
                    .state('login', {
                        url: '/login',
                        views: {
                            '@': {
                                templateUrl: './partials/login.html'
                            }
                        }
                    })
                    .state('logout', {
                        url: '/logout',
                        views: {
                            '@': {
                                controller: function($state, $cookieStore) {
                                    $cookieStore.put('globals', {});
                                    $state.go('login');
                                }
                            }
                        }
                    })
                    .state('root', {
                        url: '',
                        views: {
                            '@': {
                                templateUrl: './partials/layout.html',
                                controller: function ($state) {
                                    //$state.go('root.people_directory');
                                }
                            },
                            'header@root': {
                                templateUrl: './partials/_header.html'
                            },
                            'footer@root': {
                                templateUrl: './partials/_footer.html'
                            }
                        }
                    })
                    .state('root.people_directory', {
                        url: '/people_directory',
                        views: {
                            'content@root': {
                                templateUrl: './partials/people_directory.html',
                                controller: 'PeopleDirectoryController'
                            }
                        }
                    })
                    .state('root.home', {
                        url: '/home',
                        views: {
                            'content@root': {
                                templateUrl: './partials/under_construction.html'
                            }
                        }
                    })
                    .state('root.jobs_manager', {
                        url: '/jobs_manager',
                        views: {
                            'content@root': {
                                templateUrl: './partials/under_construction.html'
                            }
                        }
                    })
                    .state('root.statistics', {
                        url: '/statistics',
                        views: {
                            'content@root': {
                                templateUrl: './partials/under_construction.html'
                            }
                        }
                    });

                $urlRouterProvider.otherwise('/login');
            }
        ])
        .run(['$rootScope', '$location', '$cookieStore', '$http',
            function ($rootScope, $location, $cookieStore, $http) {
                // keep user logged in after page refresh
                $rootScope.globals = $cookieStore.get('globals') || {};
                if ($rootScope.globals.currentUser) {
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                }

                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    // redirect to login page if not logged in and trying to access a restricted page
                    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
                    var loggedIn = $rootScope.globals.currentUser;
                    if (restrictedPage && !loggedIn) {
                        $location.path('/login');
                    }
                });
            }
        ]);

    //Load service
    services.factory('peopleProvider', ['$http', '$q', peopleProvider]);

    //Load directive
    directives.directive('ngList', ngList);

    //Load controller
    app
        .controller('MainController', ['$scope', '$rootScope', '$state', mainCtrl])
        .controller('LoginController', ['$scope', '$rootScope', '$state', '$cookieStore', loginController])
        .controller('PeopleDirectoryController', ['$scope', 'peopleProvider', peopleDirectoryController])
        .controller('RhManagementController', ['$scope', rhManagementController]);
}());
