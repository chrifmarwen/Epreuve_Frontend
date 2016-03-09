/**
 * Created by Marwen on 06/03/2016.
 */

module.exports = function ($http, $q) {
    var mainData = [];

    return {
        //Methods exposed for the class
        fetch: function(){
            //fetch the data from below hard coded
            var deferred = $q.defer();
            if(mainData.length !== 0) {
                deferred.resolve(mainData);
            } else {
                $http.get('data/init.json').then(function(response) {
                    mainData = response.data.data;
                    deferred.resolve(mainData);
                });
            }
            return deferred.promise;
        }
    };
};