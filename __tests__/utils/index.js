const getTypeOf = data => ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

module.exports = {
  getTypeOf
}
