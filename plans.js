module.exports = {
    test: function() {
    console.log(this);
      let request = this.req("GET", "plans");
      return request;
    },

    get: function(id) {
      let request = this.req("GET", "plans", id);
      return request;
    }
}
