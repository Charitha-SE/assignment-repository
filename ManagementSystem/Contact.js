class Contact {
    constructor(name, phoneNumber) {
        if (this.constuctor === Contact) {
            throw new Error("Cannot create instance of abstract class.");
        }
        this._name = name;
        this._phoneNumber = phoneNumber;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
    }
    display() {
        console.log(`Name: ${this.name}, PhoneNumber: ${this.phoneNumber}`);
    }
}

class PersonalContact extends Contact {
    constructor(name, phoneNumber, email) {
        super(name, phoneNumber);
        this.email = email;
    }
    display() {
        console.log(`Name: ${this.name}, PhoneNumber: ${this.phoneNumber}, Email: ${this.email}`);
    }
}

class BusinessContact extends Contact {
    constructor(name, phoneNumber, company) {
        super(name, phoneNumber);
        this.company = company;
    }
    display() {
        console.log(`Name: ${this.name}, PhoneNumber: ${this.phoneNumber}, Company: ${this.company}`);
    }
}

module.exports = { Contact, PersonalContact, BusinessContact };
