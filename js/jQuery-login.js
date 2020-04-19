$('#email-login').on('change', function () {
    let email = $(this).val();

    let email_regex = /^([a-zA-Z])([a-zA-Z0-9._]*)(@gmail\.com|@comcast\.net|@yahoo\.com|@aol\.com|@michelin\.com)$/;
    let valid_email = email_regex.test(email);

    let img = $('#email-help-img');

    if (valid_email) {
        $(this).css({ 'border': 'none' });
        img.css({'visibility': 'hidden'});
    } else {
        invalidInput($(this));
        img.css({'visibility': 'visible'});
    }
});


$('#password-login').on('change', function () {
    let password = $(this).val();
    let password_regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*])^([a-zA-Z])([a-zA-Z0-9!@#$%^&*]{7,15})$/;
    let good_password = password_regex.test(password);
    
    let img = $('#password-help-img');

    if (good_password) {
        $(this).css({ 'border': 'none' });
        img.css({'visibility': 'hidden'});

    } else {
        invalidInput($(this));
        img.css({'visibility': 'visible'});
    }
});

$('#submit-login').on('click', function() {
    console.log('here');
    // let email = $('#email-login').val();
    // let password = $('#password-login').val();
    // console.log(email, password);

    // let isInvalid = function(input) {
    //     if (input === null || input === undefined || input === "") {
    //         return true;
    //     }
    //     return false;
    // }

    // if (isInvalid(email)) invalidInput(email)
    // else email.css({ 'border': 'none' });

    // if (isInvalid(password)) invalidInput(password);
    // else password.css({ 'border': 'none' });
});



