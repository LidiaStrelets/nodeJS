const { log } = require("console");
const fs = require("fs");
const path = require("path");

// fs.mkdir(path.resolve(__dirname, 'streams'), ()=>{})
// fs.readFile(path.resolve(__dirname, "streams", "big-file.txt"), (err, data) => {
//   if (err) console.log(err.message);
//   else console.log(data);
// });

const readStream = fs.createReadStream(
  path.resolve(__dirname, "streams", "big-file.txt"), {encoding:'utf8'}
);

// readStream.on("data", (chunk) => {
// //   log(chunk);
// log('read part')
// });
// readStream.on('open', ()=>log('started reading'))
// readStream.on('end', ()=>log('finished reading'))
// readStream.on('error', (e)=>log('error while reading: ', e.message))

const writeStream = fs.createWriteStream(path.resolve(__dirname, "streams", "new-big-file.txt"))

for(let i=0; i<50; i+=1){
    writeStream.write(`${Date.now()}\n`)
}

writeStream.on('error', e=>log(e.message))
writeStream.end()