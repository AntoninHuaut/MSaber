const config = require('../config.json');
const fetch = require('node-fetch');

module.exports = class EDTCache {
    constructor() {
        this.refreshInterval = setInterval(() => this.refresh(), config.refreshMinuts * 60 * 1000);

        this.cached = [];
        this.refresh();
    }

    get() {
        return this.cached;
    }

    refresh() {
        console.log(new Date(), "Refresh MapList...");
        fetch(config.cache.map.list).then(res => res.json()).then(mapList => {
            mapList = mapList.map(map => {
                let diffsList = map.Diffs.map(diff => diff.Ranked);
                map.Ranked = diffsList.some(diff => diff === 1);

                let songSubName = map.SongSubName;
                if (songSubName.startsWith('(')) songSubName = songSubName.slice(1);
                if (songSubName.endsWith(')')) songSubName = songSubName.slice(0, -1);

                map.FullSongName = map.SongName + (songSubName ? ` (${songSubName})` : ``);

                return map;
            });
            this.cached = mapList;
        });
    }
}