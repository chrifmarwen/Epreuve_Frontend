var data = [];
var lasTdepartmentId = 0;
var lastEmployeeId = 0;

// counts
var companyCnt = 10;
var departmentsPerCompanyCnt = 10;
var employeePerDepartmentCnt = 50;

// companies
for(var i=1; i <= companyCnt;i++) {
	var company = {
		"id": i,
		"name": "Company " + i,
		"departments": []
	};
	for(var j=1; j <= departmentsPerCompanyCnt; j++) {
		var department = {
			"id": lasTdepartmentId++,
			"name": "Department " + lasTdepartmentId,
			"employees": []
		};
		for(var k=1; k <= employeePerDepartmentCnt; k++) {
			var employee = {
				"id": lastEmployeeId++,
				"name": "Employee " + lastEmployeeId
			};
			department.employees.push(employee);
		}
		company.departments.push(department);
	}
	data.push(company);
}

console.log(JSON.stringify(data));