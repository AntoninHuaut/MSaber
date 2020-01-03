const MapCache = require('./MapCache');
const cache = new MapCache();

exports.get = () => {
    return cache.get();
}