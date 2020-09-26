const fs = require('fs-extra')

exports.isExistFile = async file => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK, error => {
            if (error) return resolve(false)

            resolve(true)
        })
    })
}

exports.readFile = async file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (error, data) => {
            if (error) return reject(error)
            resolve(data)
        })
    })
}

exports.appendFile = async (pathFile, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(pathFile, data, (error) => {
            if (error) return reject(error)

            return resolve(true)
        })
    })
}


exports.writeFile = async (pathFile, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathFile, data, (error) => {
            if (error) return reject(error)

            return resolve(true)
        })
    })
}

exports.unlinkFile = async (pathFile) => {
    return new Promise((resolve, reject) => {
        fs.unlink(pathFile, (error) => {
            if (error) return reject(error)

            resolve(true)
        })
    })
}
