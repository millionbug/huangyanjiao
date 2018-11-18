let url = require('url')
console.log(url)
let request = {
  get query () {
    return url.parse(this.req.url, true).query
  }
}
module.exports = request