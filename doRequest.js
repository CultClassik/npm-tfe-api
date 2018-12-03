// type == GET, POST, etc
module.exports = function doRequest(type, endPoint, urlAppend) {
    let finalUrl = 'https://' + this.conf.url() + this.conf.endPoints[endPoint];
    if (urlAppend) {
        finalUrl += '/' + urlAppend;
    }
console.log("Final URL:: " + finalUrl);

    let options = {
        method: type,
        url: finalUrl,
        /*
        // required for auth, comment out for testing with bogus api
        headers: {
            "Authorization": "Bearer " + this.config.tfeToken,
        }
        */
    }
    request(options, function(error, response, body) {
        console.log(response.statusCode);
    });

}