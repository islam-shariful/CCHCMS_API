$(document).ready(function(){
    var cook = $.cookie('auth');
    console.log(cook);

    $("#logoutButton").click(function(){
        logout();
    });
    $("#SearchPatient").click(function(){
        SearchPatient();
    });
    //-------------
    $("#prescriptButton").click(function(){
        Prescript();
    });
    $("#submit").click(function(){
        Submit();
        // alert("submited");
        //SearchPatient();
    });
    $("#SearchForPrescription").click(function(){
        SearchForPrescription();
    });
    $("#pdf-button").click(function(){
        DownloadPDF();
    });
    var logout = function(){
        $.cookie("auth", null);
        location.replace("login.html");
    }
    //-----------------------------------------------------------------------
    var SearchPatient = function (){
        //$("#patientInfoDiv").html("Successful");
        $.ajax({
            url:"http://localhost:51369/api/prescriptions/"+$("#patientId").val(),
            method:"GET",
            headers: {
                'Authorization':'Basic '+ cook,
                'Content-Type':'application/json'
            },
            dataType: "json",
            complete:function(xmlhttp,status){
                if(xmlhttp.status == 200){
                    var patientInfo = xmlhttp.responseJSON;
                    console.log(patientInfo);
                    var output = "";
                    output += '<table border="1px"><tr><td>Id</td><td>DoctorId</td><td>PatientId</td><td>Medicines</td><td>Diagnosis</td><td>Date</td>';
                    output += '<td>PatientBloodGroup</td><td>BornDisease</td><td>Birth Date</td><td>Birth Mark</td><td>email</td></tr>';
                    output += "<tr><td>"+patientInfo.id+"</td><td>"+patientInfo.doctorId+"</td><td>"+patientInfo.patientId+"</td><td>"+patientInfo.medicins+"</td><td>"+patientInfo.diagnosis+"</td><td>"+patientInfo.date+"</td>";
                    output += "<td>"+patientInfo.patient.bloodGroup+"</td>"+"<td>"+patientInfo.patient.bornDisease+"</td>"+"<td>"+patientInfo.patient.dob+"</td>"+"<td>"+patientInfo.patient.birthMark+"</td>"+"<td>"+patientInfo.patient.email+"</td></tr>";
                    output += "</table>";
                    $("#patientInfoDiv").html(output);
                }else{
                    $("#patientInfoDiv").html("<h3>No patients with such Id/UserName</h3>");
                }
                
            }
        });
    }
    //--------------------------
    var Prescript = function(){
        var output = "</br><form>";
        output += 'DoctorId: <input type="text" id="DoctorId"/></br></br>';
        output += 'PatientId: <input type="text" id="PatientId"/></br></br>';
        output += 'Medicines: <input type="text" id="Medicins"/></br></br>';
        output += 'Diagnosis: <input type="text" id="Diagnosis"/></br></br>';
        output += 'Date: <input type="text" id="Date"/>';
        output += '<input type="submit" id="submit" value="submit"/></br></br>';
        output += "</form></br></br>";
        $("#mainDiv").html(output);
    }
    var Submit = function(){
        //e.preventDefault();
        // console.log(cook);
        $.ajax({
            url : "http://localhost:51369/api/prescriptions/",
            method: "POST",
            headers: {
                'Authorization':'Basic '+ cook,
                contentType: "application/json"
            },
            data : { 
                DoctorId : $("#DoctorId").val(), 
                PatientId: $("#PatientId").val(), 
                Medicins: $("#Medicins").val(), 
                Diagnosis: $("#Diagnosis").val(), 
                Date: $("#Date").val() 
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201) {
                    alert("Successful");
                    location.replace("doctorPrescript.html");
                }
            },
            error: function(xhr, status, error) {
                if(xhr.status==201) {
                    alert("Successful");
                }else{
                    alert(error);
                }
            }
        });
        //return false;
    }
    var SearchForPrescription = function() {
        //alert("Successful");
        $.ajax({
            url:"http://localhost:51369/api/prescriptions/"+$("#patientId").val(),
            method:"GET",
            headers: {
                'Authorization':'Basic '+ cook,
                'Content-Type':'application/json'
            },
            dataType: "json",
            complete:function(xmlhttp,status){
                if(xmlhttp.status == 200){
                    var patientInfo = xmlhttp.responseJSON;
                    console.log(patientInfo);
                    var output = "";
                    output += '<table border="1px"><tr><td>Id</td><td>DoctorId</td><td>PatientId</td><td>Medicines</td><td>Diagnosis</td><td>Date</td>';
                    output += "<tr><td>"+patientInfo.id+"</td><td>"+patientInfo.doctorId+"</td><td>"+patientInfo.patientId+"</td><td>"+patientInfo.medicins+"</td><td>"+patientInfo.diagnosis+"</td><td>"+patientInfo.date+"</td>";
                    output += "</tr></table>";
                    $("#patientInfoDiv").html(output);
                }else{
                    $("#patientInfoDiv").html("<h3>No patients with such Id/UserName</h3>");
                }
                
            }
        });
      }
});