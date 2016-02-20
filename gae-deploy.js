var fs              = require('fs')
var https           = require('https')
var unzip           = require('unzip')
var del             = require('del')
var sh              = require('shelljs')
var win             = require('os').platform() === 'win32'
var path            = require('path')

module.exports = {
  getSdk: getSdk
}

function getSdk (p, cb) {
  var sdkDir = p.sdkDir || path.join('..', 'appengine-java-sdk')
  var sdkVer = p.sdkVer || '1.9.32'
  var tmpDir = p.tmpDir || 'tmp'

  var appcfg = path.join(sdkDir, 'bin', 'appcfg.' + (win ? 'cmd' : 'sh'))
  var url = 'https://storage.googleapis.com/appengine-sdks/featured/appengine-java-sdk-' + sdkVer + '.zip'

  if (fs.existsSync(appcfg)) {
    console.log('gae-java-sdk present')
    return cb()
  }

  console.log('downloading GAE JAVA SDK: ' + url)
  del.sync(sdkDir)
  del.sync(tmpDir)

  https
    .get(url, function (response) {
      response
        .pipe(unzip.Extract({ path: tmpDir }))
        .on('close', function () {
          console.log('downloaded, moving to ' + sdkDir)
          fs.renameSync(path.join(tmpDir, 'appengine-java-sdk-' + sdkVer), sdkDir)
          del.sync(tmpDir)
          console.log('sdk done!')
          cb()
        })
      })
    .on('error', function (err) {
      del.sync(tmpDir)
      cb(err.message)
    })
}
