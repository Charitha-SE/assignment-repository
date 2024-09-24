class ApiEndpoints {
    constructor() {
        this.baseURL = 'https://fakerestapi.azurewebsites.net/api/v1';
        this.activities = `${baseURL}/Activities`;
        this.authors = `${baseURL}/Authors`;
        this.books = `${baseURL}/Books`;
        this.coverPhotos = `${baseURL}/CoverPhotos`;
        this.users = `${baseURL}/Users`;
    }
}

module.exports = ApiEndpoints;
