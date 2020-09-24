$(document).ready(() => {
    $("#sendOtpBtn").click(() => {
        var mobile = $("#mobileInput").val();
        if (mobile == '') {
            console.log("Hello Error");
            $("#loginError").html("Mobile Number Cannot be empty");
            $("#loginError").show();
        } else if (isNaN(mobile)) {
            console.log("Hello Error");
            $("#loginError").html("Invalid Mobile Number");
            $("#loginError").show();
        } else {
            $("#loginError").removeClass("text-red-500");
            $("#loginError").addClass("text-green-500");
            $("#loginError").html("OTP Sent");
            $("#loginError").show();
            $("#mobileInput").hide();
            $("#otpInput").show();
            $("#sendOtpBtn").hide();
            $("#loginBtn").show();
        }
    });
    $("#loginBtn").click(() => {

        var formData = {
            mobile: $("#mobileInput").val(),
            otp: $("#otpInput").val(),
        }
        console.log(formData);
        window.location.href = "login.html";

    })

});