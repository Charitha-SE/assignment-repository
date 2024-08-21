const Contact = require('./Contact');

class BusinessContact extends Contact {
    constructor(name, phoneNumber, company) {
        super(name, phoneNumber);
        this.company = company;
    }

    display() {
        console.log(`Name: ${this.name}, PhoneNumber: ${this.phoneNumber}, Company: ${this.company}`);
    }
}

module.exports = BusinessContact;
