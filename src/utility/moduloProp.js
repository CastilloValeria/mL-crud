const fs = require("fs");
const path = require("path")

const lectura = (fileName) => {
    const file = fs.readFileSync(`${__dirname}/../data/${fileName}.json`,"utf-8");
    const json = JSON.parse(file);
    return json;
}

const escritura = (array,fileName) => {
    const json = JSON.stringify(array);
    fs.writeFileSync(`${__dirname}/../data/${fileName}.json`,json,"utf-8")
}

module.exports = {lectura, escritura}