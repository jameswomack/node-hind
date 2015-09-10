const FS  = require('fs')
const URL = require('url')

// `tail` should be used with `bind`, passing in options
function tail (options, req, res, next) {
  res.writeHead(200, {
    'content-type': 'text/plain'
  })

  const path = options.path
  const log  = options.log
  var   size = options.size || 1 * 1024 * 1024
  const stat = FS.stat.bind(FS, path)
  const read = FS.createReadStream.bind(FS, path)

  stat(function (err, stats) {
    if (err) return res.end()

    var   start  = 0
    const len    = stats.size
    const parsed = URL.parse(req.url, true)

    size = +(parsed.query.bytes || size)

    if (len > size) start = len - size

    if (log && log.debug) log.debug('readStream from %s to %s',
                                    start, start + size)

    read(path, { start: start })
      .pipe(res)
      .on('end', next)
  })
}

module.exports = tail
