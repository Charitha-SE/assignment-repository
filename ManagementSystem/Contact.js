class Contact {
    constructor(name, phoneNumber) {
        if (new.target === Contact) {
            throw new Error("Cannot create an instance of the abstract class.");
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

module.exports = Contact;
