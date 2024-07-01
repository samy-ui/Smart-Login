// Get elements from the DOM
var loginForm = document.getElementById('loginForm');
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginEmailAlert = document.getElementById('loginEmailAlert');
var loginPasswordAlert = document.getElementById('loginPasswordAlert');
var loginExistAlert = document.getElementById('loginExistAlert');
var loginSuccessAlert = document.getElementById('loginSuccessAlert');

// Retrieve all users from localStorage
var allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

// Add event listener for form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (checkIfLoginInputsAreTrue()) {
        authenticateUser();
    }
});

// Authenticate the user
function authenticateUser() {
    var user = allUsers.find(user => user.email === loginEmail.value && user.password === loginPassword.value);

    if (user) {
        loginExistAlert.classList.replace('d-block', 'd-none');
        loginSuccessAlert.classList.replace('d-none', 'd-block');
        setTimeout(() => {
            window.location.href = `welcome.html?name=${user.name}`;
        }, 1500); // Redirect after 1.5 seconds to allow the success alert to show
    } else {
        loginSuccessAlert.classList.replace('d-block', 'd-none');
        loginExistAlert.classList.replace('d-none', 'd-block');
    }
}

// Validate input fields
function validateLoginInput(Regex, element, alertEl) {
    if (Regex.test(element.value)) {
        alertEl.classList.replace('d-block', 'd-none');
        return true;
    } else {
        alertEl.classList.replace('d-none', 'd-block');
        return false;
    }
}

// Check if login inputs are valid
function checkIfLoginInputsAreTrue() {
    var isEmailValid = validateLoginInput(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, loginEmail, loginEmailAlert);
    var isPasswordValid = validateLoginInput(/^(?=.*[A-Z])(?=.*\W).{8,}$/, loginPassword, loginPasswordAlert);

    return isEmailValid && isPasswordValid;
}
