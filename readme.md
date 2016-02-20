
# gae-deploy

> Deploy static website to GAE

## Install

    npm install gae-deploy --save-dev
        
## Usage

    var gae = require('gae-deploy')({})
    
    // Download AppEngine Java SDK into '../appengine-java-sdk' folder (by default)
    // Only if not already existing
    
    gulp.task('getSdk', (cb) => {
      gae.getSdk(cb)          
    })
    
    // Deploy "war" folder
    
    gulp.task('deploy', (cb) => {
      gae.deploy('war', cb)          
    })

## Options
    
    var gae = require('gae-deploy')({
        sdkDir: '../appengine-java-sdk',
        sdkVer: '1.9.32',
        tmpDir: 'tmp'
    })
    
