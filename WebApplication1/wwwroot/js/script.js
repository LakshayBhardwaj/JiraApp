
function runApi(x) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://10.101.21.116:8080/rest/api/2/search?jql=' + x, true);
    request.setRequestHeader("Authorization", "Basic " + btoa("thinksysuser:thinksys@123"));
    request.onload = function () {
        // document.write(this.response);
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            loadchart(data);

        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
}

runApi('');

function loadchart(obj) {
    
        google.charts.load('current', {'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Project Name');
        data.addColumn('number', 'No. Of Issues');

        var projectNames = new Array();
        var uniqueProjectNames = new Array();
        var count = new Array();
        
        for (var i = 0; i < obj.issues.length; i++) {
            projectNames[i] = obj.issues[i].fields.project.name;
            if (uniqueProjectNames.includes(projectNames[i])) {
               
            } else {
                uniqueProjectNames.push(projectNames[i]);
            }
        }

        for (var j = 0; j < uniqueProjectNames.length; j++) {
            var initialCount = 0;
            for (var k = 0; k < projectNames.length; k++) {
                if (uniqueProjectNames[j] == projectNames[k]) {
                    initialCount++;
                    count[uniqueProjectNames[j]] = initialCount;
                   
                } else {

                }
            }
            
            data.addRows([[uniqueProjectNames[j], count[uniqueProjectNames[j]]]]);
        }
        console.log(projectNames);
        console.log(count[uniqueProjectNames[1]]);
        

        var options = {
            title: 'title',
            backgroundColor: '#353535',
            titleTextStyle: {
                color: 'white'
            },
            hAxis: {
                textStyle: {
                    color: 'white'
                },
                titleTextStyle: {
                    color: 'white'
                }
            },
            vAxis: {
                textStyle: {
                    color: 'white'
                },
                titleTextStyle: {
                    color: 'white'
                }
            },
            legend: {
                textStyle: {
                    color: 'white'
                }
            }
        };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}
    
}

