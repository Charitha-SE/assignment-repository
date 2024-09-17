const { use } = require("../playwright.config");


function  getApiEndPoints() {
    const activitiesEndPoint = use.baseURL+'/Activities';
    const authorsEndPoint = use.baseURL+'/Authors';
    const booksEndPoint = use.baseURL+'/Books';
    const coverPhotosEndPoint = use.baseURL+'/CoverPhotos';
    const usersEndPoint = use.baseURL+'/Users';

    return {
        activities: activitiesEndPoint,
        authors: authorsEndPoint,
        books: booksEndPoint,
        coverPhotos: coverPhotosEndPoint,
        users: usersEndPoint
    };
}

module.exports = { getApiEndPoints };
