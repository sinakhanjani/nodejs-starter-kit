const fs = require('fs')
const path = require('path')

const decode = function(name, escaping) {
    try {
        const route = path.join(__dirname, '../json/' + `${name}.json`)            
        const dataBuffer = fs.readFileSync(route)
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        escaping(data)
    } catch (e) {
        return []
    }
}

const encode = function(data, name) {
    try {
        const route = path.join(__dirname, '../json/' + `${name}.json`)            
        const dataJSON = JSON.stringify(data)        
        fs.writeFileSync(route, dataJSON, "utf8")
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    decode,
    encode
}