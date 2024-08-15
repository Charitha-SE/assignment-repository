// UserInputs.js
const prompt = require('prompt-sync')();

function promptForValidPhoneNumber() {
    let phone = prompt("Enter phone: ");
    while (!isValidPhoneNumber(phone)) {
        console.log("Invalid phone number. Please enter exactly 10 digits only numbers are accepted.");
        phone = prompt("Enter phone: ");
    }
    return phone;
}

function promptForValidEmail() {
    let email = prompt("Enter email: ");
    while (!isValidEmail(email)) {
        console.log("Invalid email format. Please enter a valid email.");
        email = prompt("Enter email: ");
    }
    return email;
}

function promptForValidType() {
    let type = prompt("Enter type (Personal/Business): ").toLowerCase();
    while (type !== 'personal' && type !== 'business') {
        console.log("Invalid contact type. Please enter 'Personal' or 'Business'.");
        type = prompt("Enter type (Personal/Business): ").toLowerCase();
    }
    return type;
}

function isValidPhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function promptForUniqueName(existingName = '', phoneBook) {
    let name = prompt("Enter name: ");
    while (phoneBook.isContactExists(name) && name !== existingName) {
        console.log("A contact with this name already exists. Please enter a different name.");
        name = prompt("Enter name: ");
    }
    return name;
}

module.exports = {
    promptForValidPhoneNumber,
    promptForValidEmail,
    promptForValidType,
    promptForUniqueName
};
