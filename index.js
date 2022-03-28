const dotenv = require("dotenv").config();
const { log } = require("console");
const path = require("path");
const fs = require("fs");

// console.log(process.pid)
// console.log(process.env.PORT)
// console.log(process.env.NODE_ENV)

// console.log(process.argv);

const newPath = path.join("string", "another");
// log(newPath)
// log(__dirname)
// log(__filename)
// log(path.join(__dirname, '..'))

const secPath = path.resolve("hey");
// log(path.parse(secPath))
// log(path.parse(newPath))

const myUrl = "http://localhost:3000/tabs/home";
const url = new URL(myUrl);
// log(url)

// fs.mkdir(path.resolve(__dirname, "dir_new"), (e) => {
//   if (e) log(e.message);
//   else log("success!");
// });

// fs.rmdir(path.resolve(__dirname, 'dir_new'), (e)=>{
//     if(e)log(e.message)
//     else log('success delete!')
// })

// fs.writeFile(path.resolve(__dirname, 'dir', 'file.txt'),'hello world', (e)=>{
//     if(e)log(e.message)
//     else log('success create file!')
// })

// fs.appendFile(path.resolve(__dirname, 'dir', 'file.txt'),'\naddsome info', (e)=>{
//     if(e)log(e.message)
//     else log('success update file!')
// })

const asyncCreateFile = async (path, data) =>
  new Promise((res, rej) => {
    fs.writeFile(path, data, (error) => {
      if (error) rej(error.message);
      res();
    });
  });

const asyncUpdateFile = async (path, data) =>
  new Promise((res, rej) => {
    fs.appendFile(path, data, (error) => {
      if (error) rej(error.message);
      res();
    });
  });

const asyncReadFile = async (path) =>
  new Promise((res, rej) => {
    fs.readFile(path, { encoding: "utf-8" }, (error, data) => {
      if (error) rej(error.message);
      res(data);
    });
  });

const pathToFile = path.resolve(__dirname, "dir_new", "file-1.txt");
asyncCreateFile(pathToFile, "this is my new file")
  .then(() => asyncUpdateFile(pathToFile, "\n some text") )
  .then(() => asyncReadFile(pathToFile))
  .then(log)
  .catch(log);
