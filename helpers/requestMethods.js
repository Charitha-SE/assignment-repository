const { EndPoints } = require('../Constants/EndPoint');

const endPoints = EndPoints();

async function getList(requestContext, endpoint) {
    const response = await requestContext.get(endpoint, {});
    return response;
}

async function createRecord(requestContext, postData, endpoint) {
    const response = await requestContext.post(endpoint, {
        data: postData
    });
    return response;
}


async function updateRecord(requestContext, updateData, id, endpoint) {
    const response = await requestContext.put(`${endpoint}/${id}`, { 
        data: updateData
    });
    return response;
}

async function deleteRecord(requestContext, id, endpoint) {
    const response = await requestContext.delete(`${endpoint}/${id}`); 
    return response;
}

module.exports = { createRecord, getList,updateRecord,deleteRecord };