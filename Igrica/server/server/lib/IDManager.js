let id = 0;
let iskorisceniid = {};
generisiID = function () {
    let trenid = ++id;
    while (iskorisceniid[trenid]) {
        trenid == ++id;
    }
    return trenid;
}
obrisiID = function (id) {
    if (iskorisceniid[id])
        delete iskorisceniid[id];
}