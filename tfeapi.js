const request = require('request');

/*
Stratos should store configurations in MongoDB, as opposed to VCS.
Stratos decides if a run should be performed, and call TFE with this module accordingly.
If a run is called, configuration-versions must also be managed.

*/

const config = {
    // may want to store this in a json file, and sensitive data be functions that make REST calls to Vault or similar
    tfeHost: process.env("TFE_HOST") || "https://tfe.domain.com",
    tfeToken: process.env("TFE_TOKEN") || "0123456789",
    baseUrl: "/api/v2/",
    url: tfeHost + baseUrl,
    plans: url + "/plans/",
    runs: url + "/runs/",
    applies: url + "/applies/",
}

function doRequest(type, endPoint, key) {
    // type == GET, POST, etc
    let options = {
        url: config[endoint] + key,
        headers: {
            "Authorization": "Bearer " + config.tfeToken,
        }
    }
    request(options, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
            console.log(body.url);
            console.log(body.explanation);
        }
    );
}

// create a configuration in tgz format for upload to TFE host
function newConfigVersion(jsonDoc, workspaceId) {

}

function getPlan(id) {
    let request = doRequest("plans", id);
    return request;
}

function createRun() {

}

function applyRun(runId) {

}

function listRuns(workspaceId) {

}

function getRunDetails(runId) {

}

function discardRun(runId) {

}

function cancelRun(runId) {

}