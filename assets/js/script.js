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
                    var tagData = JSON.parse(resData.tags);

                    function getTags(id) {
                        var indx = 0;
                        var tags = '';
                        tagData.forEach(element => {
                            if (tagData[indx].pk == id) {
                                tags = `<span class="customFeedTag" style="background:${tagData[indx].fields.color}">${tagData[indx].fields.name}</span>`;
                            }
                            indx++;
                        })
                        return tags;
                    }

                    // var tagdata = tagData;
                    // console.log((tagdata.fields));
                    var i = 0;
                    resdata.forEach(element => {
                        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                        let current_datetime = new Date(Date.parse(resdata[i].fields.date));
                        let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
                        var tagsd = JSON.parse(JSON.stringify(resdata[i].fields.tag));
                        var nameArr = tagsd.split(',');
                        var da = '';
                        for (let index = 0; index < nameArr.length; index++) {
                            da += `${getTags(nameArr[index])}`;
                        }

                        var feedsCard = ` <div class="p-4 md:w-1/3">
                        <div class="feedCard h-full border-2 border-gray-200  overflow-hidden">

                            <img class="lg:h-48 md:h-36 w-full object-cover object-center"
                                src="https://toppernote.herokuapp.com/static/${resdata[i].fields.image}"
                                alt="blog">
                                <button class="myBtn" id="myBtn${resdata[i].pk}" onclick="showModal(${resdata[i].pk})"><i class="fa fa-play" aria-hidden="true"></i>
                                </button>
                            <div class="px-6 py-4">
                                <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">${da}</h2>
                                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${resdata[i].fields.head}</h1>
                                <p class="leading-relaxed mb-3 m-0 pr-5 w-full text-wrap overflow-scroll " style="height:200px;
                                ">${resdata[i].fields.discription}</p>
                                <div class="flex items-center flex-wrap ">
                                    <a target="_blank" href="${resdata[i].fields.sourcelink}" class="text-teal-500 inline-flex items-center md:mb-2 lg:mb-0">Read More
                                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor"
                                            stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                    <span class="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
                                    <svg class="pr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    width="26.449px" height="26.448px" viewBox="0 0 36.449 36.448" style="enable-background:new 0 0 36.449 36.448;"
                                    xml:space="preserve">
                               <g>
                                   <g>
                                       <rect x="12.858" y="14.626" width="4.596" height="4.089"/>
                                       <rect x="18.996" y="14.626" width="4.595" height="4.089"/>
                                       <rect x="25.128" y="14.626" width="4.596" height="4.089"/>
                                       <rect x="6.724" y="20.084" width="4.595" height="4.086"/>
                                       <rect x="12.858" y="20.084" width="4.596" height="4.086"/>
                                       <rect x="18.996" y="20.084" width="4.595" height="4.086"/>
                                       <rect x="25.128" y="20.084" width="4.596" height="4.086"/>
                                       <rect x="6.724" y="25.54" width="4.595" height="4.086"/>
                                       <rect x="12.858" y="25.54" width="4.596" height="4.086"/>
                                       <rect x="18.996" y="25.54" width="4.595" height="4.086"/>
                                       <rect x="25.128" y="25.54" width="4.596" height="4.086"/>
                                       <path d="M31.974,32.198c0,0.965-0.785,1.75-1.75,1.75h-24c-0.965,0-1.75-0.785-1.75-1.75V12.099h-2.5v20.099
                                           c0,2.343,1.907,4.25,4.25,4.25h24c2.344,0,4.25-1.907,4.25-4.25V12.099h-2.5V32.198z"/>
                                       <path d="M30.224,3.948h-1.098V2.75c0-1.517-1.197-2.75-2.67-2.75c-1.474,0-2.67,1.233-2.67,2.75v1.197h-2.74V2.75
                                           c0-1.517-1.197-2.75-2.67-2.75c-1.473,0-2.67,1.233-2.67,2.75v1.197h-2.74V2.75c0-1.517-1.197-2.75-2.67-2.75
                                           c-1.473,0-2.67,1.233-2.67,2.75v1.197H6.224c-2.343,0-4.25,1.907-4.25,4.25v2h2.5h27.5h2.5v-2
                                           C34.474,5.855,32.568,3.948,30.224,3.948z M11.466,7.646c0,0.689-0.525,1.25-1.17,1.25s-1.17-0.561-1.17-1.25V2.75
                                           c0-0.689,0.525-1.25,1.17-1.25s1.17,0.561,1.17,1.25V7.646z M19.546,7.646c0,0.689-0.525,1.25-1.17,1.25s-1.17-0.561-1.17-1.25
                                           V2.75c0-0.689,0.525-1.25,1.17-1.25s1.17,0.561,1.17,1.25V7.646z M27.626,7.646c0,0.689-0.525,1.25-1.17,1.25
                                           c-0.646,0-1.17-0.561-1.17-1.25V2.75c0-0.689,0.524-1.25,1.17-1.25c0.645,0,1.17,0.561,1.17,1.25V7.646z"/>
                                   </g>
                               </g>
                               
                               </svg>${formatted_date}
                                    </span>
                                    <span class="text-gray-600 inline-flex items-center leading-none text-sm">
                                    <a href="https://wa.me/?text=${resdata[i].fields.link}" class="whatsIcon"> <i class="fa fa-whatsapp" aria-hidden="true"></i></a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="myModal${resdata[i].pk}" class="modal">

                    <!-- Modal content -->
                    <iframe  src="https://www.youtube.com/embed/${(resdata[i].fields.link).slice(17,)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <button class="close">Close Video<i class="fa close fa-close" aria-hidden="true"></i></button>
                    </div>
                    `;
                        $("#homeFeeds").append(feedsCard);
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
