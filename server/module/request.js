let url = require('url')
let request = {
  get query () {
    return url.parse(this.req.path, true).query
  }
}
module.exports = request