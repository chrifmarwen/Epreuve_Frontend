/**
 * Created by Marwen on 06/03/2016.
 */

module.exports = function ($http, $q) {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            ngSelectedItem: '=',
            ngSelect: '&',
            ngTitle: '@',
            ngDeleteSelectedItem: '='
        },
        templateUrl: '../../partials/directive/template.html',
        replace: true,
        link: function(scope, iElement, iAttrs, ctrl) {

        }
    };
};