
class ContactNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ContactNotFoundError";
    }
}

class FileSystemError extends Error {
    constructor(message) {
        super(message);
        this.name = "FileSystemError";
    }
}

module.exports = { ContactNotFoundError,  FileSystemError };
