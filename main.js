const request = require('request');
const applies = require('./applies');
const configs = require('./configuraion-versions');
const runs = require('./runs');
//const plans = require('./plans');
/*const plans = {
    test: function() {
      let request = this.req("GET", "plans");
      return request;
    },

    get: function(id) {
      let request = this.req("GET", "plans", id);
      return request;
    },
}*/

/*
Stratos should store configurations in MongoDB, as opposed to VCS.
Stratos decides if a run should be performed, and call TFE with this module accordingly.
If a run is called, configuration-versions must also be managed.
*/

// Returns a client object to perform REST requests against a Terraform Enterprise instance.
module.exports = function tfeClient(tfeHost, tfeToken, workspaceId) {
  let client = {
    conf: getConfig(tfeHost, tfeToken, workspaceId),
    applies: applies,
    configs: configs,
    testPlans: plansTest,
    getPlanById: planGet,
    listRunsByWorkspaceId: runsList,
    req: doRequest,
    test: this.plans,
  }
  return client;
}

//const getConfig = function (tfeHost, tfeToken) {
function getConfig(tfeHost, tfeToken, workspaceId) {
    tfeConfig = {
        host: tfeHost,
        token: tfeToken,
        workspaceId: workspaceId,
        baseUrl: "/api/v2/",
        url: function() {
            return this.host + this.baseUrl;
        },
        endPoints: {
          plans: "plans",
          runs: "runs",
          applies: "applies",
          workspaces: "workspaces",
        },
    }

    return tfeConfig;
}

function doRequest(type, endPoint, urlAppend) {
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

//
// For testing against public api uri only
//
function plansTest() {
    let request = this.req("GET", "plans");
    return request;
}

function planGet(id) {
    let request = this.req("GET", "plans", id);
    return request;
}

function runsList() {
    let urlAppend = this.conf.workspaceId + "/runs";
    let request = this.req("GET", "workspace", urlAppend);
    return request;
}
