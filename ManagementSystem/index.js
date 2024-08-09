const prompt = require('prompt-sync')();
const PhoneBook = require('./phoneBook');
const { PersonalContact, BusinessContact } = require('./Contact');
const { ContactNotFoundError, PhoneBookError } = require('./Errors');

const phoneBook = new PhoneBook();

while (true) {
    console.log("\nPhone Book Management System");
    console.log("1. Add Contact");
    console.log("2. Update Contact");
    console.log("3. Delete Contact");
    console.log("4. Display Contacts");
    console.log("5. Save and Exit");

    const choice = prompt("Enter your choice: ");

    try {
        if (choice === '1') {
            const type = prompt("Enter type (Personal/Business): ").toLowerCase();
            const name = prompt("Enter name: ");
            const phone = prompt("Enter phone: ");
            if (type === 'personal') {
                const email = prompt("Enter email: ");
                phoneBook.addContact(new PersonalContact(name, phone, email));
            } else if (type === 'business') {
                const company = prompt("Enter company: ");
                phoneBook.addContact(new BusinessContact(name, phone, company));
            }
        } else if (choice === '2') {
            const name = prompt("Enter the name of the contact to update: ");
            const type = prompt("Enter new type (Personal/Business): ").toLowerCase();
            const newName = prompt("Enter new name: ");
            const newPhone = prompt("Enter new phone: ");
            if (type === 'personal') {
                const email = prompt("Enter new email: ");
                phoneBook.updateContact(name, new PersonalContact(newName, newPhone, email));
            } else if (type === 'business') {
                const company = prompt("Enter new company: ");
                phoneBook.updateContact(name, new BusinessContact(newName, newPhone, company));
            }
        } else if (choice === '3') {
            const name = prompt("Enter the name of the contact to delete: ");
            phoneBook.deleteContact(name);
        } else if (choice === '4') {
            phoneBook.displayContacts();
        } else if (choice === '5') {
            try {
                phoneBook.saveContactsToFile();
            } catch (err) {
                if (err instanceof PhoneBookError) {
                    console.error("PhoneBook Error:", err.message);
                } else {
                    console.error("An unexpected error occurred:", err);
                }
            }
            break;
        } else {
            console.log("Please select from the above options.");
        }
    } catch (error) {
        if (error instanceof ContactNotFoundError) {
            console.error(error.message);
        } else if (error instanceof PhoneBookError) {
            console.error("PhoneBook Error:", error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
}
