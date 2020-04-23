
$(function () {

    // gets right part of URL after the '#'
    let name = window.location.hash.substring(1);
    $('#user-name').append(name);

    $('#email-login').on('change', function () {
        let email = $(this).val();

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
    });


    $('#password-login').on('change', function () {
        let password = $(this).val();
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
    });


    $('#submit-login').on('click', function () {


        let email = $('#email-login');
        let password = $('#password-login');
        // console.log(email);
        // console.log(password);

        let isInvalid = function (input) {
            if (input === null || input === undefined || input === "") {
                return true;
            }
            return false;
        }

        let email_val = email.val();
        let password_val = password.val();
        // if either email or password are invalid, then program will delete invalid text and replace with "" ("" == invalid)
        if (email_val === "") {
            invalidInput(email);
        }
        else if (password_val === "") {
            invalidInput(password);
        }
        else {
            // if new account, then tell user account doesnt exist and to create a new account
            if (newAccount(email_val)) {
                $('#no-account').css({ 'visibility': 'visible' });
            } else {
                // if existing account (trying to login so this makes sense) then check to see if password is correct
                $('#no-account').css({ 'visibility': 'hidden' });
                let user_password = getPassword(email_val);
                if (user_password == password_val) {
                    // user entered correct password, let them sign in
                    let name = getName(email_val, first_name = true);
                    let capitalize = (str) => str.replace(/^\w/, (char) => char.toUpperCase());

                    name = capitalize(name);
                    // sets anchor part of URL
                    window.location.href = 'logged_in.html' + '#' + name;
                } else {
                    invalidInput(password);
                }
            }
        }
    });
});

