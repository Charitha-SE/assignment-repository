const { use } = require("../playwright.config");

class ApiEndpoints {
    constructor() {
        this.baseURL = use.baseURL;
        this.activitiesEndPoint = `${this.baseURL}/Activities`;
        this.authorsEndPoint = `${this.baseURL}/Authors`;
        this.booksEndPoint = `${this.baseURL}/Books`;
        this.coverPhotosEndPoint = `${this.baseURL}/CoverPhotos`;
        this.usersEndPoint = `${this.baseURL}/Users`;
    }

    getEndPoints() {
        return {
            activities: this.activitiesEndPoint,
            authors: this.authorsEndPoint,
            books: this.booksEndPoint,
            coverPhotos: this.coverPhotosEndPoint,
            users: this.usersEndPoint
        };
    }
}

module.exports = ApiEndpoints;
