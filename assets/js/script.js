$(document).ready(() => {



    $("#signUpBoxToggle").click(() => {
        $("#signUpBox").show();
        $("#loginBox").hide();
    })
    $("#logInBoxToggle").click(() => {
        $("#signUpBox").hide();
        $("#loginBox").show();
    })
    $("#sendOtpBtn").click(() => {
        var mobile = $("#mobileInput").val();
        var otpInput = $("#otpInput").val();
        var otp = '';
        if (mobile == '') {
            console.log("Hello Error");
            $("#loginError").html("Mobile Number Cannot be empty");
            $("#loginError").show();
        } else if (isNaN(mobile)) {
            console.log("Hello Error");
            $("#loginError").html("Invalid Mobile Number");
            $("#loginError").show();
        } else {
            formData = {
                mobile: mobile
            }
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "https://toppernote.herokuapp.com/toppersnote/user/otp",
                data: formData,
                cache: false,
                success: function (result) {
                    console.log(result);
                    if (result.error == true) {
                        $("#loginError").html(result.message);
                        $("#loginError").show();
                    } else if (result.error == false) {
                        otp = result.message;
                        $("#loginError").removeClass("text-red-500");
                        $("#loginError").addClass("text-green-500");
                        $("#loginError").html("OTP Sent");
                        $("#loginError").show();
                        $("#mobileInput").hide();
                        $("#otpInput").show();
                        $("#sendOtpBtn").hide();
                        $("#loginBtn").show();
                    }

                }
            });

        }
    });
    $("#loginBtn").click(() => {
        var mobile = $("#mobileInput").val();
        var otpInput = $("#otpInput").val();
        if (otpInput == '') {
            console.log("Hello Error");
            $("#loginError").html("OTP Number Cannot be empty");
            $("#loginError").show();
        } else if (isNaN(otpInput)) {
            // console.log("Hello Error");
            $("#loginError").html("Invalid OTP Number");
            $("#loginError").show();
        } else {
            var formData = {
                mobile: mobile,
                otp: otpInput
            }

            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "https://toppernote.herokuapp.com/toppersnote/user/verify",
                data: formData,
                cache: false,
                success: function (result) {
                    // console.log(result);
                    if (result.error == true) {
                        $("#loginError").html(result.message);
                        $("#loginError").show();
                    } else if (result.error == false) {
                        var resData = JSON.parse(JSON.stringify(result.data));
                        resData = JSON.parse(resData);
                        resdata = resData[0];
                        // console.log(resdata.fields.first_name);
                        if (resdata.fields.first_name == null) {
                            $("#signUpMsg").removeClass("text-red-500");
                            $("#signUpMsg").addClass("text-green-500");
                            $("#signUpMsg").html("New User, Kindly Sign Up.");
                            $("#signUpMsg").show();
                            $("#signUpBox").show();
                            $("#loginBox").hide();
                        } else {
                            sessionStorage.loginTrue = true;
                            sessionStorage.sessData = resdata;
                            window.location.href = "feed.html";
                        }

                    }
                }
            });
        }
    })
    $('#signUpBtn').click(() => {
        var regex = /^[a-zA-Z]+$/;
        var emailregex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;

        var fname = $("#signFname").val();
        var lname = $("#signLname").val();
        var smail = $("#signEmail").val();
        var sdob = $("#signDOB").val();
        var mobile = $("#mobileInput").val();
        console.log(fname + " " + lname);
        if (fname == '' && lname == '' && smail == '' && dob == '') {
            $("#signErrorMsg").html("Fill all the fields.").show();
        } else if (!regex.test(fname)) {
            $("#signErrorMsg").html("First Name can contain only alphabets").show();
        } else if (!regex.test(lname)) {
            $("#signErrorMsg").html("Last Name can contain only alphabets").show();
        } else if (!emailregex.test(smail)) {
            $("#signErrorMsg").html("Invalid Email Address").show();
        } else {
            var formData = {
                first_name: fname,
                last_name: lname,
                mobile: mobile,
                email: smail,
                dob: sdob
            }
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "https://toppernote.herokuapp.com/toppersnote/user/register",
                data: formData,
                cache: false,
                success: function (result) {
                    // console.log(result);
                    if (result.error == true) {
                        $("#signErrorMsg").addClass("text-red-500");
                        $("#signErrorMsg").removeClass("text-green-500");
                        $("#signErrorMsg").html(result.message).show();
                    } else if (result.error == false) {
                        var resData = JSON.parse(JSON.stringify(result.data));
                        resData = JSON.parse(resData);
                        resdata = resData[0];
                        sessionStorage.loginTrue = true;
                        sessionStorage.sessData = resdata;
                        $("#signErrorMsg").removeClass("text-red-500");
                        $("#signErrorMsg").addClass("text-green-500");
                        $("#signErrorMsg").html(result.message).show();
                        $("#signUpMsg").hide();
                        window.location.href = "feed.html";
                    }
                }
            });
        }

    });


    

});