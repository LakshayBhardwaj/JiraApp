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
        },
        error: function (response) { console.log(response); },
        failure: function (response) { debugger; }
    });
}

runApi('');

