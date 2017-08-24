
let employeeInput = ['1,John,HR','2,Alice,SD','3,Helen,SD','4,Shawn,EXE'];
let friendList = ["1,2",'1,3', '2,4', '3,4'];

function solution1() {
    let employees = getInfo(employeeInput, friendList);
    displayFriends(employees);
    friendFromOtherDepartment(employees);
    console.log(isSameCircle(employees));

    function isSameCircle(employees) {
        if (!employees[1]) {
            console.log('no employee');
            return;
        };
        //only need to DFS to find one people to see whether everyone appears
        let visited = {};

        helper(employees[1]);

        //check whether all visited.
        if (Object.keys(visited).length === employees.length - 1) {
            return true;
        }
        return false;

        function helper(employee) {
            console.log('current visited: ', visited);
            if (visited.hasOwnProperty(employee.name)) {
                return;
            }
            visited[employee.name] = true;
            for (let friend of employee.friends) {
                helper(employees[friend.id]);
            }
        }
    }

    function displayFriends(employees) {
        for (let i = 1; i < employees.length; i++) {
            let employee = employees[i];
            console.log('Friends list: ');
            console.log(employee.name + ': ' + JSON.stringify(employee.friends));
        }
        console.log('\n\n\n\n');
    }


    function friendFromOtherDepartment(employees) {
        let result = {};
        for (let i = 1; i < employees.length; i++) {
            let employee = employees[i];
            for (let friend of employee.friends) {
                if (employees[friend.id].department !== employee.department) {
                    if (result[employee.department]) {
                        result[employee.department]++;
                        break;
                    } else {
                        result[employee.department] = 1;
                        break;
                    }
                }
            }
        }
        console.log('Outside Department Friendship List: \n', result);
        console.log('\n\n\n');
        return result
    }


    function getInfo(employeeInput, friendList) {
        let employees = [];
        for (let person of employeeInput) {
            let temp = person.split(',');
            employees[temp[0]] = {name: temp[1], department: temp[2], friends: []};
        }
        for (let friend of friendList) {
            let temp = friend.split(',');
            employees[temp[0]].friends.push({name: employees[temp[1]].name, id: temp[1]});
            employees[temp[1]].friends.push({name: employees[temp[0]].name, id: temp[0]});
        }
        return employees;
    }
}


