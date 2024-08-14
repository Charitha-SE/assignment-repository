const prompt = require('prompt-sync')();
const { 
    isValidPhoneNumber, 
    addContact, 
    updateContact, 
    deleteContact, 
    displayContacts, 
    saveAndExit } = require('./ContactManager');

while (true) {
    console.log("\nPhone Book Management System");
    console.log("1. Add Contact");
    console.log("2. Update Contact");
    console.log("3. Delete Contact");
    console.log("4. Display Contacts");
    console.log("5. Save and Exit");

    const choice = prompt("Enter your choice: ");

    switch (choice) {
        case '1': {
            const type = prompt("Enter type (Personal/Business): ").toLowerCase();
            const name = prompt("Enter name: ");
            let phone = prompt("Enter phone: ");

            while (!isValidPhoneNumber(phone)) {
                console.log("Invalid phone number. Please enter only 10 digits.");
                phone = prompt("Enter phone: ");
            }

            if (type === 'personal') {
                const email = prompt("Enter email: ");
                addContact(type, name, phone, email);
            } else if (type === 'business') {
                const company = prompt("Enter company: ");
                addContact(type, name, phone, company);
            }
            break;
        }
        case '2': {
            const name = prompt("Enter the name of the contact to update: ");
            const type = prompt("Enter new type (Personal/Business): ").toLowerCase();
            const newName = prompt("Enter new name: ");
            let newPhone = prompt("Enter new phone: ");

            while (!isValidPhoneNumber(newPhone)) {
                console.log("Invalid phone number. Please enter only 10 digits.");
                newPhone = prompt("Enter new phone: ");
            }

            if (type === 'personal') {
                const email = prompt("Enter new email: ");
                updateContact(name, type, newName, newPhone, email);
            } else if (type === 'business') {
                const company = prompt("Enter new company: ");
                updateContact(name, type, newName, newPhone, company);
            }
            break;
        }
        case '3': {
            const name = prompt("Enter the name of the contact to delete: ");
            deleteContact(name);
            break;
        }
        case '4':
            displayContacts();
            break;
        case '5':
            saveAndExit();
            return;
        default:
            console.log("Please select from the above options.");
    }
}
