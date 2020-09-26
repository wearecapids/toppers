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


    $(document).ready(() => {
        // e.preventDefault();
        $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: "https://toppernote.herokuapp.com/toppersnote/app/feeds",
            cache: false,
            success: function (result) {
                console.log(result);
                if (result.error == true) {
                    alert("Something Went Wrong");
                } else if (result.error == false) {
                    var resData = JSON.parse(JSON.stringify(result.data));
                    var resdata = JSON.parse(resData.feed);
                    // resdata = resData[0];
                    var i = 0;
                    resdata.forEach(element => {
                        console.log(resdata[i]);

                        $("#homeFeeds").append(` <div class="p-4 md:w-1/3">
                        <div class="feedCard h-full border-2 border-gray-200  overflow-hidden">

                            <img class="lg:h-48 md:h-36 w-full object-cover object-center"
                                src="https://toppernote.herokuapp.com/${resdata[i].fields.image}"
                                alt="blog">
                                <button class="myBtn" id="myBtn${resdata[i].pk}" onclick="showModal(${resdata[i].pk})">Open Modal</button>
                            <div class="px-6 py-4">
                                <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY
                                </h2>
                                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${resdata[i].fields.head}</h1>
                                <p class="leading-relaxed mb-3 pr-5 h-20 text-wrap overflow-hidden">${resdata[i].fields.discription}</p>
                                <div class="flex items-center flex-wrap ">
                                    <a class="text-teal-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                            stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                    <span
                                        class="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
                                        <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>1.2K
                                    </span>
                                    <span class="text-gray-600 inline-flex items-center leading-none text-sm">
                                        <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path
                                                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                            </path>
                                        </svg>6
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="myModal${resdata[i].pk}" class="modal">

                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>Some text in the Modal..</p>
                    </div>

                    </div>
                    `);
                        i++;
                    });


                }
            }
        });
    })

});
function showModal(id) {
    // Get the modal
    var modal = document.getElementById("myModal" + id);

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn" + id);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}