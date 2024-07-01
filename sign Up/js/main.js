var signUpForm = document.getElementById('registerForm');
var signName = document.getElementById('signName');
var signEmail = document.getElementById('signEmail');
var signPassword = document.getElementById('signPassword');
var nameAlert = document.getElementById('nameAlert');
var emailAlert = document.getElementById('emailAlert');
var passwordAlert = document.getElementById('passwordAlert');
var existAlert = document.getElementById('existAlert');
var successAlert = document.getElementById('successAlert');
var allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

// Event listener for form submission
signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (checkIfAllInputsAreTrue()) {
        addUser();
    }
});

// Function to add user to local storage
function addUser() {
    var newUser = {
        name: signName.value,
        email: signEmail.value,
        password: signPassword.value
    };

    if (isEmailExists(newUser.email)) {
        existAlert.classList.replace('d-none', 'd-block');
        successAlert.classList.replace('d-block', 'd-none'); // Hide success message
    } else {
        allUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        successAlert.classList.replace('d-none', 'd-block');
        existAlert.classList.replace('d-block', 'd-none'); // Hide exist alert message
        clearForm();
    }
}

// Function to check if email already exists
function isEmailExists(email) {
    return allUsers.some(function (user) {
        return user.email === email;
    });
}

// Function to clear form inputs after successful registration
function clearForm() {
    signName.value = '';
    signEmail.value = '';
    signPassword.value = '';
}

// Function to validate input fields
function validateInput(Regex, element, alertEl) {
    var pattern = Regex;
    if (pattern.test(element.value)) {
        alertEl.classList.replace('d-block', 'd-none');
        return true;
    } else {
        alertEl.classList.replace('d-none', 'd-block');
        return false;
    }
}

// Function to validate all input fields together
function checkIfAllInputsAreTrue() {
    var isNameValid = validateInput(/^[a-zA-Z0-9]{2,}$/, signName, nameAlert);
    var isEmailValid = validateInput(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, signEmail, emailAlert);
    var isPasswordValid = validateInput(/^(?=.*[A-Z])(?=.*\W).{8,}$/, signPassword, passwordAlert);

    return isNameValid && isEmailValid && isPasswordValid;
}
