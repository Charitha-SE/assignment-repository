const fs = require('fs');
const { ContactNotFoundError, PhoneBookError } = require('./Errors');
const { PersonalContact, BusinessContact } = require('./Contact');

class PhoneBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
        console.log("Contact created successfully.");
    }

    updateContact(name, newContact) {
        const index = this.contacts.findIndex(contact => contact.name === name);
        if (index !== -1) {
            this.contacts[index] = newContact;
            console.log("Contact updated successfully.");
        } else {
            throw new ContactNotFoundError(`Contact name "${name}" not found.`);
        }
    }

    deleteContact(name) {
        const index = this.contacts.findIndex(contact => contact.name === name);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log("Contact deleted successfully.");
        } else {
            throw new ContactNotFoundError(`Contact name "${name}" not found.`);
        }
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("No contacts are available.");
        } else {
            this.contacts.forEach(contact => contact.display());
        }
    }

    loadContactsFromFile() {
        try {
            const data = fs.readFileSync('contacts.txt', 'utf8');
            const lines = data.split('\n');
            for (let line of lines) {
                if (line) {
                    const [type, name, phoneNumber, extra] = line.split(',');
                    if (type.toLowerCase() === 'personal') {
                        this.addContact(new PersonalContact(name, phoneNumber, extra));
                    } else if (type.toLowerCase() === 'business') {
                        this.addContact(new BusinessContact(name, phoneNumber, extra));
                    }
                }
            }
        } catch (err) {
            throw new PhoneBookError("Failed to read contacts.");
        }
    }

    saveContactsToFile() {
        try {
            const data = this.contacts.map(contact => {
                if (contact instanceof PersonalContact) {
                    return `Personal,${contact.name},${contact.phoneNumber},${contact.email}`;
                } else if (contact instanceof BusinessContact) {
                    return `Business,${contact.name},${contact.phoneNumber},${contact.company}`;
                }
            }).join('\n');
            fs.writeFileSync('contacts.txt', data, 'utf8');
        } catch (err) {
            throw new PhoneBookError("Failed to save contacts to file.");
        }
    }
}

module.exports = PhoneBook;
