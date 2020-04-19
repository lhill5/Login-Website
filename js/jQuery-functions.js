let invalidInput = (jquery_obj) => {
    let id = jquery_obj.attr('id');
    let placeholder_message = "";
    switch (id) {
        case 'phone-number':
            placeholder_message = 'Not a valid phone number';
            break;
        case 'first-name':
        case 'last-name':
        case 'username':
            placeholder_message = 'Must be less than 16 characters';
            break;
        case 'password':
        case 'password-login':
            placeholder_message = 'Invalid Password';
            break;
        case 'email':
        case 'email-login':
            placeholder_message = 'Not a valid email address';
            break;
        case 'confirm-password':
            placeholder_message = "Doesn't match Password";
            break;
    }

    jquery_obj.css({ 'border': 'red 1.5px solid' });
    jquery_obj.attr('placeholder', placeholder_message);
    jquery_obj.val("");
}


let isNum = function (val) {
    return /^\d+$/.test(val);
}


function print(item) {
    console.log(item);
}


function newAccount(user_info) {

    let cookies = Cookies.get();
    // key will be object1, object2, etc.
    for (let key in cookies) {
        // convert string (JSON.stringify(obj)) to json object
        let value = JSON.parse(cookies[key]);
        // if an account with the same email already exists, then it's not a new account (return false)
        if (value.email === user_info.email) {
            return false;
        }
    }
    return true;
}
