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


function newAccount(new_email) {

    let cookies = Cookies.get();
    // key will be object1, object2, etc.
    for (let key in cookies) {

        let value = cookies[key];
        // convert string (JSON.stringify(obj)) to json object
        let user_info = JSON.parse(cookies[key]);

        let user_email = user_info.email;
        if (user_email === new_email) {
            // there's already an account created with this email, not new account
            return false;
        }
    }
    return true;
}


function getPassword(email) {

    let cookies = Cookies.get();
    // key will be object1, object2, etc.
    for (let key in cookies) {

        let value = cookies[key];
        let user_info = JSON.parse(value);

        let user_email = user_info.email;
        let user_password = user_info.password;

        if (user_email === email) {
            return user_password;
        }
    }
    // if email was not found return blank
    return "";
}


function getName(email, first_name = false, last_name = false) {

    let cookies = Cookies.get();

    // key will be object1, object2, etc.
    for (let key in cookies) {

        let value = cookies[key];
        let user_info = JSON.parse(value);
        console.log(user_info);

        /* first_name in user_info is first-name, cannot get first name using (.), must 
           use string format object['string'] 
        */




        let user_email = user_info.email;
        let name;
        if (first_name) {
            name = user_info['first-name'];
        }
        else if (last_name) {
            name = user_info['last-name'];
        }
        else name = user_info['first-name'] + ' ' + user_info['last-name'];

        if (user_email === email) {
            return name;
        }
    }
    // if email was not found return blank
    return "";
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }




