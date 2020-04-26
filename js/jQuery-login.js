
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
        let text = $('#password-help-text');

        if (good_password) {
            $(this).css({ 'border': 'none' });
            img.css({ 'visibility': 'hidden' });

        } else {
            invalidInput($(this));
            text.html('Must contain at least one number, symbol, lowercase letter, uppercase letter, and must be between 8-16 characters long.');
            img.css({ 'visibility': 'visible' });
        }
    });


    $('#submit-login').on('click', function () {


        let email = $('#email-login');
        let password = $('#password-login');

        let email_img = $('#email-help-img');
        let password_img = $('#password-help-img');
        let text = $('#password-help-text');
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
            email_img.css({ 'visibility': 'visible' });
        }
        if (password_val === "") {
            invalidInput(password);
            password_img.css({ 'visibility': 'visible' });
        }
        else if (email_val !== "" && password_val !== "") {
            // if new account, then tell user account doesnt exist and to create a new account
            let no_account = $('#no-account');
            if (newAccount(email_val)) {
                no_account.css({ 'visibility': 'visible' });
            } else {
                // if existing account (trying to login so this makes sense) then check to see if password is correct
                no_account.css({ 'visibility': 'hidden' });
                let user_password = getPassword(email_val);
                if (user_password === password_val) {
                    // user entered correct password, let them sign in
                    let name = getName(email_val, first_name = true);
                    let capitalize = (str) => str.replace(/^\w/, (char) => char.toUpperCase());

                    name = capitalize(name);
                    // sets anchor part of URL
                    window.location.href = 'logged_in.html' + '#' + name;
                } else {
                    invalidInput(password, good_password = true);
                    text.html('The password you entered for this email: ' + email_val + ' is incorrect.');
                    password_img.css({ 'visibility': 'visible' });
                }
            }
        }
    });
});

