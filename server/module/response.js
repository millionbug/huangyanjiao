let response = {
  get body () {
    return this._body
  },
  /**
   * 设置返回给客户端的body
   */
  set body (data) {
    this._body = data // 这里没有调用this.res.end方法来直接返回数据，是因为可能会多次复写body，所以真正的操作会在applicatioin中
  },
  get status () {
    return this.res.statusCode
  },
  /**
   * 设置返回给客户端的status
   */
  set status (code) {
    this.res.statusCode = code
  }
}
module.exports = response
