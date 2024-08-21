const Contact = require('./Contact');

class PersonalContact extends Contact {
    constructor(name, phoneNumber, email) {
        super(name, phoneNumber);
        this.email = email;
    }

    display() {
        console.log(`Name: ${this.name}, PhoneNumber: ${this.phoneNumber}, Email: ${this.email}`);
    }
}

module.exports = PersonalContact;
