const { log } = require('console')
const os = require('os')
const cluster = require('cluster')

// log(os.platform(), os.arch(), )
// log()

if(cluster.isMaster){
    for(let i=0; i<os.cpus().length-1; i+=1){
        cluster.fork()
    }
}
else{
    log(`Process ${process.pid} has started`)
}