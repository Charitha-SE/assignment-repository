const PhoneBook = require('./PhoneBook');
const PersonalContact = require('./PersonalContact');
const BusinessContact = require('./BusinessContact');
const { ContactNotFoundError, FileSystemError } = require('./Errors');
const {
    promptForValidPhoneNumber,
    promptForValidEmail,
    promptForValidType,
    promptForUniqueName
} = require('./UserInputs');

const prompt = require('prompt-sync')();

const phoneBook = new PhoneBook();

function handleErrors(error) {
    if (error instanceof ContactNotFoundError) {
        console.error("Contact error:", error.message);
    } else if (error instanceof FileSystemError) {
        console.error("FileSystem Error:", error.message);
    } else {
        console.error("An unexpected error occurred:", error.message);
    }
}

const Actions = {
    addContact: () => {
        const type = promptForValidType();
        const name = promptForUniqueName('', phoneBook);
        const phone = promptForValidPhoneNumber();

        let contact;
        if (type === 'personal') {
            const email = promptForValidEmail();
            contact = new PersonalContact(name, phone, email);
        } else {
            const company = prompt("Enter company: ");
            contact = new BusinessContact(name, phone, company);
        }

        try {
            phoneBook.addContact(contact);
            console.log("Contact added successfully.");
        } catch (error) {
            handleErrors(error);
        }
    },
    updateContact: () => {
        const name = prompt("Enter the name of the contact to update: ");

        if (!phoneBook.isContactExists(name)) {
            console.log("No contact found with this name.");
            return;
        }

        const type = promptForValidType();
        const newName = promptForUniqueName(name, phoneBook);
        const newPhone = promptForValidPhoneNumber();

        let newContact;
        if (type === 'personal') {
            const email = promptForValidEmail();
            newContact = new PersonalContact(newName, newPhone, email);
        } else {
            const company = prompt("Enter new company: ");
            newContact = new BusinessContact(newName, newPhone, company);
        }

        try {
            phoneBook.updateContact(name, newContact);
            console.log("Contact updated successfully.");
        } catch (error) {
            handleErrors(error);
        }
    },
    deleteContact: () => {
        const name = prompt("Enter the name of the contact to delete: ");
        try {
            phoneBook.deleteContact(name);
            console.log("Contact deleted successfully.");
        } catch (error) {
            handleErrors(error);
        }
    },
    displayContacts: () => {
        phoneBook.displayContacts();
    },
    saveAndExit: () => {
        try {
            phoneBook.saveContactsToFile();
            console.log("Contacts saved successfully.");
        } catch (err) {
            console.error("An error occurred while saving contacts:", err.message);
        }
    }
};

while (true) {
    console.log("\n--- Phone Book Management System ---");
    console.log("1. Add Contact");
    console.log("2. Update Contact");
    console.log("3. Delete Contact");
    console.log("4. Display Contacts");
    console.log("5. Save and Exit");

    const choice = prompt("Enter your choice: ");

    switch (choice) {
        case '1':
            Actions.addContact();
            break;
        case '2':
            Actions.updateContact();
            break;
        case '3':
            Actions.deleteContact();
            break;
        case '4':
            Actions.displayContacts();
            break;
        case '5':
            Actions.saveAndExit();
            return;
        default:
            console.log("Please select from the above options.");
    }
}
