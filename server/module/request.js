let url = require('url')
let request = {
  get query () {
    return url.parse(this.req.url, true).query
  }
}
module.exports = request