
class ContactNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ContactNotFoundError";
    }
}

class PhoneBookError extends Error {
    constructor(message) {
        super(message);
        this.name = "PhoneBookError";
    }
}

module.exports = { ContactNotFoundError, PhoneBookError };
