const test = require('tape')
const hind = require('./')

test('returns x bytes of the file', function (t) {
  const data = 1
  const o = hind(data)
  t.equal(o(), 1)
  t.end()
})
