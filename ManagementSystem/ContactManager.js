const PhoneBook = require('./PhoneBook');
const PersonalContact = require('./PersonalContact');
const BusinessContact = require('./BusinessContact');
const { ContactNotFoundError, FileSystemError } = require('./Errors');

const phoneBook = new PhoneBook();

function isValidPhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
}

function handleErrors(error) {
    if (error instanceof ContactNotFoundError) {
        console.error("Contact error:", error.message);
    } else if (error instanceof FileSystemError) {
        console.error("FileSystem Error:", error.message);
    } else {
        console.error("An unexpected error occurred:", error.message);
    }
}

function addContact(type, name, phone, extra) {
    try {
        if (type === 'personal') {
            phoneBook.addContact(new PersonalContact(name, phone, extra));
        } else if (type === 'business') {
            phoneBook.addContact(new BusinessContact(name, phone, extra));
        } else {
            console.log("Invalid contact type. Please enter 'Personal' or 'Business'.");
        }
        console.log("Contact created successfully.");
    } catch (error) {
        handleErrors(error);
    }
}

function updateContact(name, type, newName, newPhone, extra) {
    try {
        if (type === 'personal') {
            phoneBook.updateContact(name, new PersonalContact(newName, newPhone, extra));
        } else if (type === 'business') {
            phoneBook.updateContact(name, new BusinessContact(newName, newPhone, extra));
        } else {
            console.log("Invalid contact type. Please enter 'Personal' or 'Business'.");
        }
        console.log("Contact updated successfully.");
    } catch (error) {
        handleErrors(error);
    }
}

function deleteContact(name) {
    try {
        phoneBook.deleteContact(name);
        console.log("Contact deleted successfully.");
    } catch (error) {
        handleErrors(error);
    }
}

function displayContacts() {
    phoneBook.displayContacts();
}

function saveAndExit() {
    try {
        phoneBook.saveContactsToFile();
        console.log("Contacts saved successfully.");
    } catch (err) {
        console.error("An error occurred while saving contacts:", err.message);
    }
}

module.exports = {
    isValidPhoneNumber,
    handleErrors,
    addContact,
    updateContact,
    deleteContact,
    displayContacts,
    saveAndExit
};
