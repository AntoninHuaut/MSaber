document.addEventListener("DOMContentLoaded", () => {
    const opt = {
        pagination: true,
        search: true,
        searchTimeOut: "500",
        pageList: "[25, 50, 100, 250, 1000, All]",
        pageSize: 25,
        url: "/api/",
        toolbar: "#toolbar"
    };

    $('table').bootstrapTable(opt);
});

function actionFormat(key) {
    const res = document.createElement('span');

    let aOC = document.createElement('a');
    let spanOC = document.createElement('span');
    spanOC.classList.add('mdi', 'mdi-cloud-download', 'ml-2', 'mr-2');
    spanOC.title = "OneClick download";
    aOC.href = "beatsaver://" + key;
    aOC.appendChild(spanOC);

    let adDL = document.createElement('a');
    let spanDL = document.createElement('span');
    spanDL.classList.add('mdi', 'mdi-download', 'ml-2', 'mr-2');
    spanDL.title = "Simple download";
    adDL.href = "https://beatsaver.com/api/download/key/" + key;
    adDL.appendChild(spanDL);

    res.appendChild(aOC);
    res.appendChild(adDL);

    return res.outerHTML;
}

function rankedOnlyButton(el) {
    if (!el.hasAttribute('selected')) el.setAttribute('selected', 'true');

    let selected = el.getAttribute('selected') === 'true';
    el.setAttribute('selected', !selected);

    if (selected) {
        filterByRanked();
        el.classList.remove('btn-danger');
        el.classList.add('btn-success');
    } else {
        removeFilter();
        el.classList.remove('btn-success');
        el.classList.add('btn-danger');
    }
}

function removeFilter() {
    $('table').bootstrapTable('filterBy', {});
}

function filterByRanked() {
    $('table').bootstrapTable('filterBy', {
        Ranked: true
    });
}

function ratingFormat(rate) {
    return rate * 100 + " %";
}

function rankedFormat(ranked) {
    return ranked ? "✔️" : "❌";
}

function diffsFormat(diffsList) {
    diffsList = diffsList.map(diff => diff.Diff);
    diffsList.sort((i1, i2) => {
        const i1V = getIdSort(i1);
        const i2V = getIdSort(i2);
        const maxLength = Object.keys(DIFFS_SORT).length;

        if (i1V <= maxLength || i2V <= maxLength) return i1V < i2V ? -1 : 1;

        return i1.localeCompare(i2);
    });

    return diffsList.join(", ");
}

function getIdSort(item) {
    item = item.trim().toLowerCase();
    return DIFFS_SORT[item] ? DIFFS_SORT[item] : Object.keys(DIFFS_SORT).length + 1;
}

const DIFFS_SORT = {
    "easy": 1,
    "normal": 2,
    "hard": 3,
    "expert": 4,
    "expertplus": 5
}