/**
 * Created by Marwen on 08/03/2016.
 */

module.exports = function ($scope) {

    $scope.form = {
        "name": null,
        "email": null,
        "phone": null,
        "celphone": null,
        "location": null,
        "title": null,
        "company": null,
        "department": null,
        "startDate": null,
        "endDate": null
    };
    $scope.currentCompany = null;

    $scope.closeAddModal = function () {
        $scope.modal.addModalClose = true;
    };

    $scope.addEmployee = function (newEmployee) {
        angular.forEach($scope.companies, function(company) {
            if(company.id == newEmployee.company) {
                angular.forEach(company.departments, function(department) {
                    if(department.id == newEmployee.department) {
                        department.employees.unshift(newEmployee);
                    }
                });
            }
        });
        $scope.modal.addModalClose = true;
    };

    $scope.selectCurrentCompany = function (company) {
        $scope.currentCompany = $scope.companies.filter(function (e) {
            if (company === e.id) {
                return e;
            }
        })[0];
    };
};