/**
 * Created by Marwen on 06/03/2016.
 */

module.exports = function ($scope, peopleProvider) {
    $scope.companiesList = [];

    $scope.lastSelectedItem = null;
    $scope.lastSelectedItemTitle = null;
    // delete modal
    $scope.closed = true;
    // add modal
    $scope.modal = {
        addModalClose: true
    };

    $scope.companies = [];
    $scope.departments = [];

    $scope.selectedCompany = {
        id: null,
        departments: []
    };
    $scope.selectedDepartment = {
        id: null,
        employees: []
    };
    $scope.selectedEmployee = {
        id: null
    };
    $scope.obj = {dontAskAgain: false};
    $scope.dontAskAgain = false;

    peopleProvider.fetch().then(function (data) {
        $scope.companiesList = data;
        $scope.companies = angular.copy($scope.companiesList);
        angular.forEach($scope.companies, function(elem) {
            $scope.departments = $scope.departments.concat(elem.departments);
        });
    });

    $scope.selectCompany = function (company) {
        $scope.selectedCompany = company;
        $scope.selectedDepartment = {};
        $scope.lastSelectedItem = "company";
    };
    $scope.selectDepartment = function (department) {
        $scope.selectedDepartment = department;
        $scope.lastSelectedItem = "department";
    };
    $scope.selectEmployee = function (employee) {
        $scope.selectedEmployee = employee;
        $scope.lastSelectedItem = "employee";
    };

    $scope.closeDeleteModal = function () {
        $scope.closed = true;
        $scope.dontAskAgain = $scope.obj.dontAskAgain;
    };
    $scope.openDeleteModal = function (item) {
        $scope.lastSelectedItem = item;
        if($scope.dontAskAgain) {
            $scope.deleteItem(item);
        } else if($scope.selectedCompany.id !== null) {
            $scope.closed = false;
        }
    };
    $scope.openAddModal = function(key) {
        $scope.modal.addModalClose = false;
    };

    $scope.deleteItem = function (item) {
        var _company = $scope.companies.filter(function(item) {
            return $scope.selectedCompany.id === item.id;
        });
        switch (item) {
            case 'employee':
                var _department = _company[0].departments.filter(function(item) {
                    return $scope.selectedDepartment.id === item.id;
                });
                removeFromArray(_department[0].employees,$scope.selectedEmployee);
                $scope.selectedEmployee = {};
                break;
            case 'company':
                removeFromArray($scope.companies,$scope.selectedCompany);
                $scope.selectedCompany = {};
                $scope.selectedDepartment = {};
                break;
            case 'department':
                removeFromArray(_company[0].departments,$scope.selectedDepartment);
                $scope.selectedDepartment = {};
                break;
        }
        $scope.lastSelectedItemTitle = null;
        $scope.lastSelectedItem = null;
        $scope.closed = true;
        $scope.dontAskAgain = $scope.obj.dontAskAgain;
    };
};

function removeFromArray(array, object) {
    var index = array.map(function(item) { return item.id; })
        .indexOf(object.id);
    return index > -1 && array.splice(index, 1);
}