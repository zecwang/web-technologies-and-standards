/* If you're feeling fancy you can add interactivity
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('Hello INFSCI 2560!');

// You JavaScript here

let form = document.getElementsByTagName('form')[0];
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let username_error = document.getElementById('username-error');
let email_error = document.getElementById('email-error');
let password_error = document.getElementById('password-error');

let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let passwordRegExp = /([a-zA-Z0-9.]+)$/;

function addEvent(element, event, callback) {
    var previousEventCallBack = element["on" + event];
    element["on" + event] = function (e) {
        var output = callback(e);

        // A callback that returns `false` stops the callback chain
        // and interrupts the execution of the event callback.
        if (output === false) return false;

        if (typeof previousEventCallBack === 'function') {
            output = previousEventCallBack(e);
            if (output === false) return false;
        }
    }
}

addEvent(window, "load", function () {
    let get_username = document.getElementById('get-username');
    let get_email = document.getElementById('get-email');
    let get_password = document.getElementById('get-password');
    get_username.textContent = localStorage.getItem('username');
    get_email.textContent = localStorage.getItem('email');
    get_password.textContent = localStorage.getItem('password');
});

let pass;
addEvent(form, 'submit', function () {
    pass = true;
    if (username.value.length === 0) {
        username_error.innerHTML = "Username required";
        username_error.className = "error active";
        pass = false;
    } else {
        username_error.innerHTML = "";
        username_error.className = "error";
        if (pass) pass = true;
    }

    if (email.value.length === 0) {
        email_error.innerHTML = "Email required";
        email_error.className = "error active";
        pass = false;
    } else if (!emailRegExp.test(email.value)) {
        email_error.innerHTML = "Please include '@' in the input.";
        email_error.className = "error active";
        pass = false;
    } else {
        email_error.innerHTML = "";
        email_error.className = "error";
        if (pass) pass = true;
    }

    if (!passwordRegExp.test(password.value)) {
        password_error.innerHTML = "Only allow English letters, digits or '.' for the input.";
        password_error.className = "error active";
        pass = false;
    } else {
        password_error.innerHTML = "";
        password_error.className = "error";
        if (pass) pass = true;
    }

    if (!pass)
        return false;
    else {
        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        alert("Submitted successfully!!");
    }
});
