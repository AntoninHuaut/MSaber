const fetch = require('node-fetch');
const mapManager = require('../cache/mapManager');
const config = require('../config.json');

exports.get = async function (req, res) {
    const key = req.params.key;
    const hasDetails = req.params.type === 'details';
    let mapSelect = mapManager.get();

    if (key) {
        if (hasDetails) {
            try {
                mapSelect = await fetch(config.cache.map.detail + key).then(res => res.json());
            } catch (ex) {
                mapSelect = {
                    'error': ex
                };
            }
        } else {
            mapSelect = mapSelect.filter(map => map.Key === key);
            if (mapSelect.length > 0) mapSelect = mapSelect[0];
        }
    }

    res.send(mapSelect);
}

exports.ranked = async function (req, res) {
    const mapList = mapManager.get().filter(map => map.Diffs.some(isRanked));
    res.send(mapList);
}

function isRanked(key) {
    return key.Ranked === 1;
}