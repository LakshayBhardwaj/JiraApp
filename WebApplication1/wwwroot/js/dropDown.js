var checkboxArray = new Array();
var issueTypeArray = new Array();
var issueStatusArray = new Array();
var issueAssigneeArray = new Array();
$(document).click(function (e) {
    var container1 = $("#p12");
    var container2 = $("#p13");
    var container3 = $("#p14");
    var container4 = $("#p15");
    var projects = "";
    var type = "";
    var status = "";
    var assignee = "";


    // if the target of the click isn't the container nor a descendant of the container
    if (!container1.is(e.target) && container1.has(e.target).length === 0) {
        document.getElementById("myDropdown0").classList.remove("show");
    }
    if (!container2.is(e.target) && container2.has(e.target).length === 0) {
        document.getElementById("myDropdown1").classList.remove("show");
    }
    if (!container3.is(e.target) && container3.has(e.target).length === 0) {
        document.getElementById("myDropdown2").classList.remove("show");
    }
    if (!container4.is(e.target) && container4.has(e.target).length === 0) {
        document.getElementById("myDropdown3").classList.remove("show");
    }

    if (e.target.classList == "link") {
        //  alert($(e.target).attr('classList'));
        checkbox = document.getElementById(e.toElement.id).previousElementSibling;
        if ($("#" + checkbox.id).prop('checked') == true) {
            $("#" + checkbox.id).prop("checked", false);
            if (e.target.parentElement.parentElement.id == 'myDropdown0') {
                var rm = checkboxArray.indexOf(checkbox.value);
                checkboxArray.splice(rm, 1);
            }
            else if (e.target.parentElement.parentElement.id == 'myDropdown1') {
                var rm = issueTypeArray.indexOf(checkbox.value);
                issueTypeArray.splice(rm, 1);
            }
            else if (e.target.parentElement.parentElement.id == 'myDropdown2') {
                var rm = issueStatusArray.indexOf(checkbox.value);
                issueStatusArray.splice(rm, 1);
            }
            else if (e.target.parentElement.parentElement.id == 'myDropdown3') {
                var rm = issueAssigneeArray.indexOf(checkbox.value);
                issueAssigneeArray.splice(rm, 1);
            }

        } else {
            $("#" + checkbox.id).prop("checked", true);
            if (e.target.parentElement.parentElement.id == 'myDropdown0') {

                checkboxArray.push(checkbox.value);
            }
            else if (e.target.parentElement.parentElement.id == 'myDropdown1') {

                issueTypeArray.push(checkbox.value);
            }
            else if (e.target.parentElement.parentElement.id == 'myDropdown2') {

                issueStatusArray.push(checkbox.value);
            }
            else if (e.target.parentElement.parentElement.id == 'myDropdown3') {

                issueAssigneeArray.push(checkbox.value);
            }

        }

        for (var i = 0; i < checkboxArray.length; i++) {

            if (i == 0) {
                projects = projects +"'"+ checkboxArray[i]+"'";
            } else {
                projects = projects + ",'" + checkboxArray[i]+"'";
            }
        }

        for (var i = 0; i < issueTypeArray.length; i++) {

            if (i == 0) {
                type = type +"'"+ issueTypeArray[i]+"'";
            } else {
                type = type + ",'" + issueTypeArray[i]+"'";
            }
        }

        for (var i = 0; i < issueStatusArray.length; i++) {

            if (i == 0) {
                status = status +"'"+issueStatusArray[i]+"'";
            } else {
                status = status + ",'" + issueStatusArray[i]+"'";
            }
        }

        for (var i = 0; i < issueAssigneeArray.length; i++) {

            if (i == 0) {
                assignee = assignee + "'" + issueAssigneeArray[i] + "'";
            } else {
                assignee = assignee + ",'" + issueAssigneeArray[i] + "'";
            }
        }

        if ((projects == "" || projects == null) && (type == "" || type == null) && (status == "" || status == null) && (assignee == "" || assignee == null)) {
            runApi('');
            document.getElementById('pie').innerHTML = "NO DATA";
        }
        else {
            var jqlQuery = new Array();
            var flag = 1; 
            if (projects == "") { jqlQuery[0] =""} else {
                if (flag = 1) { jqlQuery[0] = "project in (" + projects + ")"; flag--; } else { jqlQuery[0] = "AND project in (" + projects + ")"; }
            }
            if (type == "") { jqlQuery[1] ="" } else {
                if (flag == 1) { jqlQuery[1] = "issuetype in (" + type + ")"; flag--; } else { jqlQuery[1] = "AND issuetype in (" + type + ")"; }
            }
            if (status == "") { jqlQuery[2] = "" } else {
                if (flag == 1) { jqlQuery[2] = "status in (" + status + ")"; flag--; } else { jqlQuery[2] = "AND status in (" + status + ")"; }
            }
            if (assignee == "") { jqlQuery[3] = "" } else {
                if (flag == 1) { jqlQuery[3] = "assignee in (" + assignee + ")"; flag--; } else { jqlQuery[3] = "AND assignee in (" + assignee + ")"; }
            }
            console.log(jqlQuery[0] + jqlQuery[1] + jqlQuery[2] + jqlQuery[3]);
            runApi(jqlQuery[0] + jqlQuery[1] + jqlQuery[2] + jqlQuery[3]);
        }

    }

    if (e.target.classList == "project") {
        //  alert($(e.target).attr('classList'));
        checkbox = e.toElement;
        //console.log(checkbox)
        if ($("#" + checkbox.id).prop('checked') == true) {
            if (e.target.parentElement.parentElement.id == 'myDropdown0') {
                checkboxArray.push(checkbox.value);
            }
            if (e.target.parentElement.parentElement.id == 'myDropdown1') {
                issueTypeArray.push(checkbox.value);
            }
            if (e.target.parentElement.parentElement.id == 'myDropdown2') {
                issueStatusArray.push(checkbox.value);
            }
            if (e.target.parentElement.parentElement.id == 'myDropdown3') {
                issueAssigneeArray.push(checkbox.value);
            }
        } else {
            if (e.target.parentElement.parentElement.id == 'myDropdown0') {
                var rm = checkboxArray.indexOf(checkbox.value);
                checkboxArray.splice(rm, 1);
            }
            if (e.target.parentElement.parentElement.id == 'myDropdown1') {
                var rm = issueTypeArray.indexOf(checkbox.value);
                issueTypeArray.splice(rm, 1);
            }
            if (e.target.parentElement.parentElement.id == 'myDropdown2') {
                var rm = issueStatusArray.indexOf(checkbox.value);
                issueStatusArray.splice(rm, 1);
            }
            if (e.target.parentElement.parentElement.id == 'myDropdown3') {
                var rm = issueAssigneeArray.indexOf(checkbox.value);
                issueAssigneeArray.splice(rm, 1);
            }
        }
        console.log(checkboxArray)
        for (var i = 0; i < checkboxArray.length; i++) {
            console.log(checkboxArray.length);
            if (i == 0) {
                projects = projects +"'"+checkboxArray[i]+"'";
            } else {
                projects = projects + ",'" + checkboxArray[i]+"'";
            }
        }

        for (var i = 0; i < issueTypeArray.length; i++) {
            //console.log(checkboxArray.length);
            if (i == 0) {
                type = type +"'"+ issueTypeArray[i]+"'";
            } else {
                type = type + ",'" + issueTypeArray[i]+"'";
            }
        }

        for (var i = 0; i < issueStatusArray.length; i++) {
            //console.log(checkboxArray.length);
            if (i == 0) {
                status = status + "'" + issueStatusArray[i] + "'";
            } else {
                status = status + ",'" + issueStatusArray[i] + "'";
            }
        }

        for (var i = 0; i < issueAssigneeArray.length; i++) {
            //console.log(checkboxArray.length);
            if (i == 0) {
                assignee = assignee + "'" + issueAssigneeArray[i] + "'";
            } else {
                assignee = assignee + ",'" + issueAssigneeArray[i] + "'";
            }
        }

        console.log(projects);
        if ((projects == "" || projects == null) && (type == "" || type == null) && (status == "" || status == null) && (assignee == "" || assignee == null)) {
            runApi('');
            document.getElementById('pie').innerHTML = "NO DATA";
        }
        else {
            var jqlQuery = new Array();
            var flag = 1;
            if (projects == "") { jqlQuery[0] = "" } else {
                if (flag = 1) { jqlQuery[0] = "project in (" + projects + ")"; flag--; } else { jqlQuery[0] = "AND project in (" + projects + ")"; }
            }
            if (type == "") { jqlQuery[1] = "" } else {
                if (flag == 1) { jqlQuery[1] = "issuetype in (" + type + ")"; flag--; } else { jqlQuery[1] = "AND issuetype in (" + type + ")"; }
            }
            if (status == "") { jqlQuery[2] = "" } else {
                if (flag == 1) { jqlQuery[2] = "status in (" + status + ")"; flag--; } else { jqlQuery[2] = "AND status in (" + status + ")"; }
            }
            if (assignee == "") { jqlQuery[3] = "" } else {
                if (flag == 1) { jqlQuery[3] = "assignee in (" + assignee + ")"; flag--; } else { jqlQuery[3] = "AND assignee in (" + assignee + ")"; }
            }
            console.log(jqlQuery[0] + jqlQuery[1] + jqlQuery[2] + jqlQuery[3]);
            runApi(jqlQuery[0] + jqlQuery[1] + jqlQuery[2] + jqlQuery[3]);
        }

    }


});

var x;
function myFunction(x) {
    document.getElementById("myDropdown" + x).classList.add("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i ,checkbox1;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    checkbox1 = div.getElementsByTagName("input");
    
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
       
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            checkbox1[i + 1].style.display = "";
        } else {
            a[i].style.display = "none";
            checkbox1[i+1].style.display = "none";
        }
    }
}

