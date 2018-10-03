//object structure for response
function Response() {
    //////////////////////
    this.success = 0;
    this.error = 0;
    this.responseCode = 0;
    this.inputs = {};
    this.message = '';
    this.response = {
        data: [],
        dataLength: 0,
        dataType: ''
    }
    //////////////////////
}

exports.sendJson = function (req, res, statusCode, message, data) {

    //response object initialization
    let resp = new Response();

    //query parameters
    if (req.query) {
        resp.inputs.query = req.query;
    }

    //body parameters
    if (req.body) {
        resp.inputs.body = req.body;
    }

    //request method
    resp.inputs.requestMethod = req.method;

    if (message) {
        resp.message = message;
    } else {
        resp.message = 'no message';
    }

    if (data) {
        if (data.length != undefined) {
            resp.response.data = data;
            resp.response.dataType = 'array';
            resp.response.dataLength = data.length;
        } else {
            resp.response.data = data;
            resp.response.dataType = 'object';
        }
    }

    if (statusCode) {
        res.status(statusCode); //setting status code of request
        switch (statusCode) {
            case 200:
                resp.success = 1;
                resp.error = 0;
                break;
        }
    }

    return res.json(resp);
}