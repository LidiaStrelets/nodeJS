const Emitter = require('events')
require('dotenv').config()

const emitter = new Emitter()

emitter.on('message', (data, sec)=>{
    console.log(data);
    console.log(sec);
})

const MESSAGE = process.env.MESSAGE || 'no message found'

emitter.emit('message',MESSAGE, 222 )
