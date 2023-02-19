const { normalize, dirname } = require('path')

exports.getDevFolder = (path) => {
    const [nodeModules, devFolder] = normalize(dirname(path)
        .replace('/src', '')
        .replace('\src', '')).split(/\/|\\/g)

    return [nodeModules, devFolder].join('/')
}