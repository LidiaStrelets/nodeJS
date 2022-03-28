require("dotenv").config();
const { log } = require("console");
const fs = require("fs");
const path = require("path");

const text = process.env.TEXT || "";

const asyncCreateDir = async (path) =>
  new Promise((res, rej) => {
    fs.mkdir(path, (e) => {
      if (e) rej(e.message);
      res();
    });
  });
const asyncCreateFile = async (path, data) =>
  new Promise((res, rej) => {
    fs.writeFile(path, data, (e) => {
      if (e) rej(e.message);
      res(path);
    });
  });
const asyncReadFile = async (path) =>
  new Promise((res, rej) => {
    fs.readFile(path, { encoding: "utf-8" }, (e, data) => {
      if (e) rej(e.message);
      res(data);
    });
  });
const asyncRemoveFile = async (path) =>
  new Promise((res, rej) => {
    fs.rm(path, (e) => {
      if (e) rej(e.message);
      res("first file was removed");
    });
  });
const calculateWords = async (text) =>
  new Promise((res, rej) => {
    try {
      const words = text.split(" ");
      res(words.length);
    } catch (e) {
      rej(e.message);
    }
  });

const pathToDir = path.resolve(__dirname, "task");
const pathToFile = path.resolve(pathToDir, "text-from-env.txt");
const pathToSecFile = path.resolve(pathToDir, "words-quantity.txt");

asyncCreateDir(pathToDir)
  .then(() => asyncCreateFile(pathToFile, text))
  .then(asyncReadFile)
  .then(calculateWords)
  .then((quantity) =>
    asyncCreateFile(
      pathToSecFile,
      `In the env we have text with ${quantity} words`
    )
  )
  .then((path) => {
    asyncReadFile(path).then(log);
    asyncRemoveFile(pathToFile).then(log);
  })
  .catch(log);
