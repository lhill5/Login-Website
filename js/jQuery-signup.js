
$(function () {

    $(".dropdown-item").on('click', function () {
        var gender = $(this).text();
        var dropdown_menu = $('#gender').html(gender);
        $('#gender').val(gender);
    });

    for (let i = 1; i <= 31; i++) {
        $('#day').append(`<option value=${i}>${i}</option>`);
    }

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(function (item, index) {
        $('#month').append(`<option value=${item}>${item}</option>`);
    });

    for (let i = 1900; i <= 2020; i++) {
        $('#year').append(`<option value=${i}>${i}</option>`);
    }


    $('.birthday-select-group').on('click', function () {
        var option = $(this).children().val();
    });


    $('.text-input').on('change', function () {
        let isNum = (val) => /^\d+$/.test(val);

        $(this).children().each(function () {
            // get input tag
            if ($(this).attr('class') === 'form-control') {
                // if input is for phone-number, check to see only numbers are entered

                let splitText = (text) => {
                    return text.slice(0, 3) + '-' + text.slice(3, 6) + '-' + text.slice(6, 10);
                }

                let user_input = $(this).val();
                let id = $(this).attr('id');

                if (id === 'phone-number') {
                    // valid input
                    let correct_input = false;
                    let format_input = false;

                    if (isNum(user_input) && user_input.length == 10) {
                        correct_input = true;
                        format_input = true;
                    } else {
                        // remove dashes to check if user entered correct phone # with dashes
                        let format_userInput = user_input.replace(/-/g, '');
                        // check if input without dashes is a number and 10 numbers long
                        if (isNum(format_userInput) && format_userInput.length == 10) {
                            let num_with_dashes = splitText(format_userInput);
                            // make sure dashes from user were in correct places, differentiate between 333-333-3333 and 3333333333--
                            if (user_input === num_with_dashes) {
                                correct_input = true;
                                format_input = false;
                            }
                        }
                    }

                    if (correct_input) {
                        $(this).css({ 'border': 'none' });
                        if (format_input) {
                            $(this).val(splitText(user_input));
                        }
                    } else {
                        invalidInput($(this));
                    }
                }
                else if (['first-name', 'last-name', 'username'].includes(id)) {
                    if (user_input.length >= 16) {
                        invalidInput($(this));
                    }
                    else {
                        $(this).css({ 'border': 'none' });
                    }
                } else if (id === 'email') {
                    let email = $(this).val();
                    // let valid_emailAddress = ['@gmail.com', '@comcast.net', '@yahoo.com', '@aol.com', '@michelin.com'];
                    // let valid_email = false;
                    // valid_emailAddress.forEach((item, index, arr) => {
                    //     if (email.indexOf(item) !== -1 && email.length > item.length) {
                    //         valid_email = true;
                    //     }
                    // });

                    // new method validate email using regex
                    let email_regex = /^([a-zA-Z])([a-zA-Z0-9._]*)(@gmail\.com|@comcast\.net|@yahoo\.com|@aol\.com|@michelin\.com)$/;
                    let valid_email = email_regex.test(email);

                    let img = $('#email-help-img');
                    if (valid_email) {
                        $(this).css({ 'border': 'none' });
                        img.css({ 'visibility': 'hidden' });
                    } else {
                        invalidInput($(this));
                        img.css({ 'visibility': 'visible' });
                    }
                } else if (id === 'password') {
                    let password = $(this).val();
                    console.log('here');
                    let password_regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*])^([a-zA-Z])([a-zA-Z0-9!@#$%^&*]{7,15})$/;
                    let good_password = password_regex.test(password);

                    let img = $('#password-help-img');
                    if (good_password) {
                        $(this).css({ 'border': 'none' });
                        img.css({ 'visibility': 'hidden' });
                    } else {
                        invalidInput($(this));
                        img.css({ 'visibility': 'visible' });
                    }
                } else if (id === 'confirm-password') {
                    let password = $('#password').val();
                    let confirm_password = $(this).val();
                    if (password !== confirm_password) {
                        invalidInput($(this));
                    } else {
                        $(this).css({ 'border': 'none' });
                    }
                }
            }
        });

        let password = $('#password').val();
        let confirm_password = $('#confirm-password').val();

    });


    $('#submit-button').on('click', function () {
        let firstName = $('#first-name');
        let lastName = $('#last-name');
        let phone_number = $('#phone-number');

        let gender = $('#gender');
        let birthdate_day = $('#day');
        let birthdate_month = $('#month');
        let birthdate_year = $('#year');

        let username = $('#username');
        let email = $('#email');
        let password = $('#password');
        let confirm_password = $('#confirm-password');

        let input_fields = [firstName, lastName, phone_number, gender, birthdate_day, birthdate_month, birthdate_year, username, email, password, confirm_password];
        let valid_input = true;
        input_fields.forEach((item, index, arr) => {
            if (item.val() === null || item.val() === undefined || item.val() === "") {
                valid_input = false;
                invalidInput(item);
            } else {
                item.css({ 'border': 'none' });
            }
        });

        if (valid_input) {
            // create a cookie to store user's info and go to account_created.html

            let user_info = {};
            // create an object with all of the user's info
            input_fields.forEach((item, index) => {
                let name = item.attr('id');
                let value = item.val();
                // if key doesn't exist, then .name becomes key, and value becomes value associated with key
                user_info[name] = value;
            });

            // check to see if account already exists by checking cookies
            // returns true if account does not exist
            let new_account = newAccount(user_info.email);

            if (new_account) {

                // create a cookie to store user's info
                obj_num = Object.keys(Cookies.get()).length + 1;

                obj_key = 'object' + String(obj_num);

                Cookies.set(obj_key, JSON.stringify(user_info), { expires: 365 });

                // window.location.replace('secondpage.html');
                window.location.href = 'account_created.html';

            } else {
                print('An account associated with that email already exists. Please Login In.');
            }
        }
    });


    // $('.dropdown-item').on('click', function() {
    //     let val = $(this).attr('id');
    //     print(val);

    // });


    // $('.text-input').on('keyup', function () {
    //     // print('changed');
    //     let isNum = (val) => /^\d+$/.test(val);
    //     let countChar = (char, str) => {
    //         let count = 0;
    //         for (let i = 0; i < str.length; i++) {
    //             if (str[i] === char) count++;
    //         }
    //         return count;
    //     }

    //     $(this).children().each(function () {
    //         // get input tag
    //         if ($(this).attr('class') === 'form-control') {
    //             // if input is for phone-number, check to see only numbers are entered
    //             if ($(this).attr('id') === 'phone-number') {
    //                 let user_input = $(this).val();
    //                 let char_added = user_input[user_input.length - 1];
    //                 let num_without_dashes = (user_input[3] === '-' || user_input[7] === '-') && isNum(user_input.replace(/-/g, ''));
    //                 let removeUserInput = () => $(this).val(user_input.slice(0, -1));
    //                 print(char_added);

    //                 if (user_input.replace(/-/g, '').length > 10) {
    //                     print('here1');
    //                     removeUserInput();
    //                 }
    //                 else if (char_added === '-') {
    //                     print('here2');
    //                     removeUserInput();
    //                 }
    //                 // when dash is added, need to ignore that when considering if input is number or not
    //                 else if (!isNum(user_input) && !num_without_dashes) {
    //                     print('here3');
    //                     removeUserInput();
    //                 }
    //                 else if ((user_input.length == 3 || user_input.replace('-', '').length == 6)) {
    //                     print('here4');
    //                     $(this).val(user_input + '-');
    //                 }
    //             }
    //             else {
    //                 print($(this).val());
    //             }
    //         }
    //     });
    // });

});


// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// function checkCookie() {
//     var user = getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:", "");
//         if (user != "" && user != null) {
//             setCookie("username", user, 365);
//         }
//     }
// }