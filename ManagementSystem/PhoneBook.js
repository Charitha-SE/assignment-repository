const fs = require('fs');
const PersonalContact = require('./PersonalContact');
const BusinessContact = require('./BusinessContact');
const { ContactNotFoundError, FileSystemError } = require('./Errors');

const fileName = 'contacts.txt';

class PhoneBook {
    constructor() {
        this.contacts = [];
        this.loadContactsFromFile();
    }

    addContact(contact) {
        this.contacts.push(contact);
        this.updateFileWithContacts();
    }

    updateContact(name, newContact) {
        const index = this.contacts.findIndex(contact => contact.name === name);
        if (index !== -1) {
            this.contacts[index] = newContact;
            this.updateFileWithContacts();
        } else {
            throw new ContactNotFoundError(`Contact name "${name}" not found.`);
        }
    }

    deleteContact(name) {
        const index = this.contacts.findIndex(contact => contact.name === name);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            this.updateFileWithContacts();
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
            if (!fs.existsSync(fileName)) {
                fs.writeFileSync(fileName, '', 'utf8');
                console.log(`File '${fileName}' not found. Created a new file.`);
            }
            const data = fs.readFileSync(fileName, 'utf8');
            const lines = data.trim().split('\n');
            for (const line of lines) {
                const [type, name, phoneNumber, extra] = line.split(',');
                const existingContact = this.contacts.find(contact => contact.name === name);
                if (!existingContact) {
                    if (type.toLowerCase() === 'personal') {
                        const personalContact = new PersonalContact(name, phoneNumber, extra);
                        this.contacts.push(personalContact);
                    } else if (type.toLowerCase() === 'business') {
                        const businessContact = new BusinessContact(name, phoneNumber, extra);
                        this.contacts.push(businessContact);
                    }
                }
            }
        } catch (err) {
            throw new FileSystemError("Failed to read contacts.");
        }
    }

    updateFileWithContacts() {
        try {
            const newData = this.contacts.map(contact => {
                if (contact instanceof PersonalContact) {
                    return `Personal,${contact.name},${contact.phoneNumber},${contact.email}`;
                } else if (contact instanceof BusinessContact) {
                    return `Business,${contact.name},${contact.phoneNumber},${contact.company}`;
                }
            }).join('\n') + '\n';
            fs.writeFileSync(fileName, newData, 'utf8');
        } catch (err) {
            throw new FileSystemError("Failed to save contacts to file.");
        }
    }

    isContactExists(name) {
        return this.contacts.some(contact => contact.name === name);
    }
}

module.exports = PhoneBook;
