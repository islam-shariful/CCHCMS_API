$(document).ready(function(){

    $("#loginForm").submit(function(e){
        e.preventDefault();
        login($(this));
    });
    var login = function myFunction(form) {
        var auth = $("#username").val() +':'+ $("#password").val();
        var encodedAuth = window.btoa(auth);
        $.cookie('auth', encodedAuth, { sameSite: 'None'});
        $.ajax({
            url:"http://localhost:51369/api/users/"+$("#username").val(),
            method:"GET",
            //dataType: 'json',
            headers: {
                'Authorization':'Basic '+ encodedAuth,
                'Content-Type':'application/json'
            },
            dataType: "json",
            cache: false,
            success: function(response)
            {
                var role = response.role;
                console.log(role);

                if(role=='admin'){
                    location.replace("admin.html");
                }
                else if(role=='doctor'){
                    location.replace("doctor.html");
                }
                else if(role=='patient'){
                    location.replace("patient.html");
                }
                
            },
            error: function(xhr, status, error) {
                if(xhr.status==401) {
                    console.log(encodedAuth);
                    alert("Username/Password is not valid");
                    form.trigger("reset");
                }
            }
            // complete:function(xmlhttp,status){
            //     // console.log(encodedAuth);
            //     console.log("HTTP: "+xmlhttp.responseJSON);
            //     if(xmlhttp.status == 200){
            //         location.replace("doctor.html");
            //     }else{
            //         alert("Username/Password is not valid")
            //     }
                
            // }
        });
        
        
      }


});