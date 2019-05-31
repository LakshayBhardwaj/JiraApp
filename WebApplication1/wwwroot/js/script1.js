//function runapi(x) {
//    var request = new xmlhttprequest();
//    request.open('post', 'https://localhost/api/products/names', true);
//    request.send(x);
//    request.onload = function () {
//        document.write(this.response);
//        // begin accessing json data here
//        //var data = json.parse(this.response);
//        if (request.status >= 200 && request.status < 400) {
//            console.log(data);

//        } else {
//            const errormessage = document.createelement('marquee');
//            errormessage.textcontent = `gah, it's not working!`;
//           // app.appendchild(errormessage);
//        }
//    }
   
//}

//runApi("lakshay");
//var postData = {
//    Id =1,
//    Data="Hello there"
//}

function runApi(x) {
    $.ajax({
        url: "http://localhost:53819/api/values/list1",


        type: "POST",
        data: {
            getFilter: x
            //Data:"Hello there"
        },

        success: function (response) {
            console.log(response);
            var htmlContent;
           // console.log(Object.values(response.issue[0].Issues)[0][0].Name);
            htmlContent =  "<h3>Issues : </h3>";
            htmlContent += "<table><tr><th>Issue Name</th><th>ID</th><th>TYPE</th><th>STATUS</th><th>ASSIGNEE</th></tr>";
            for (var j = 0; j < response.issue.length; j++) {
                for (var k = 0; k < Object.values(response.issue[j].Issues)[0].length; k++) {
                    htmlContent += "<tr>";
                    var issueElements = Object.values(Object.values(response.issue[j].Issues)[0][k]).length;
                    for (var i = 0; i < issueElements; i++) {
                        htmlContent += "<td>" + Object.values(Object.values(response.issue[j].Issues)[0][k])[i] + "</td>";
                    }
                    htmlContent += "</tr>";
                }
            }
            htmlContent += "</table>";

            document.getElementById("pie").innerHTML = htmlContent;
            loadchart(response);
        },
        error: function (response) { console.log(response); },
        failure: function (response) { debugger; }
    });
}

runApi('');

function loadchart(obj) {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Project Name');
        data.addColumn('number', 'No. Of Issues');

        var projectNames = new Array();
        var uniqueProjectNames = new Array();
        var count = new Array();

        for (var i = 0; i < obj.issue.length; i++) {
            uniqueProjectNames.push(obj.issue[i].ProjectName);
            count.push(obj.issue[i].NoOfIssues);
        }

        for (var j = 0; j < uniqueProjectNames.length; j++) {

            data.addRows([[uniqueProjectNames[j], count[j]]]);
        }
        console.log(projectNames);
        console.log(count[uniqueProjectNames[1]]);


        var options = {
            title: 'title',
           
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }

}



