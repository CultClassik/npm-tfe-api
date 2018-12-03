const req = require('./doRequest.js');

/*
function test() {
    let request = this.req("GET", "plans");
    return request;
}

function get(id) {
    let request = this.req("GET", "plans", id);
    return request;
}
*/

module.exports = {
    test: function() {
    console.log(this);
      let request = req("GET", "plans");
      return request;
    },

    get: function(id) {
      let request = req("GET", "plans", id);
      return request;
    }
}
