let wightTable = heightTable = 80;
let wightHeightCell = "5px";
let countCells = wightTable * heightTable;
let delayValue = 100;
let flagRun = false;
let aliveCells = new Map();
let diedCells = new Map();
// cleanGrid();

// function calculateNeighbors() {
//     for (let ind = 0; ind < countCells; ind++) {
//         let countNeighbors = 0;
//         if (aliveCells.has(ind - heightTable))
//             countNeighbors++;
//         if (aliveCells.has(ind + heightTable))
//             countNeighbors++;
//         if (ind % heightTable === 0) {
//             if (aliveCells.has(ind - heightTable + 1))
//                 countNeighbors++;
//             if (aliveCells.has(ind + heightTable + 1))
//                 countNeighbors++;
//         } else if (ind % heightTable === (heightTable - 1)) {
//             if (aliveCells.has(ind - heightTable - 1))
//                 countNeighbors++;
//             if (aliveCells.has(ind - 1))
//                 countNeighbors++;
//             if (aliveCells.has(ind + heightTable - 1))
//                 countNeighbors++;
//         } else {
//             if (aliveCells.has(ind - heightTable - 1))
//                 countNeighbors++;
//             if (aliveCells.has(ind - 1))
//                 countNeighbors++;
//             if (aliveCells.has(ind + heightTable - 1))
//                 countNeighbors++;
//             if (aliveCells.has(ind - heightTable + 1))
//                 countNeighbors++;
//             if (aliveCells.has(ind + 1))
//                 countNeighbors++;
//             if (aliveCells.has(ind + heightTable + 1))
//                 countNeighbors++;
//         }
//
//         if (aliveCells.has(ind)) {
//             aliveCells.set(ind, countNeighbors);
//         } else {
//             diedCells.set(ind, countNeighbors);
//         }
//     }
//
// }
//
// function oneStep() {
//     for (let [ind, neighbors] of aliveCells) {
//         if (neighbors < 2 || neighbors > 3) {
//             aliveCells.delete(ind);
//             diedCells.set(ind, 0)
//         }
//     }
//     for (let [ind, neighbors] of diedCells) {
//         if (neighbors === 3) {
//             aliveCells.set(ind, 0);
//             diedCells.delete(ind)
//         }
//     }
//
//     drawCells();
//     calculateNeighbors();
//
// }

function generateCells() {
    let req = new XMLHttpRequest();
    req.open('GET', 'localhost:5000', false);
    try {
        req.send();
        if (req !== 200) {
            console.log(req);
        }
    } catch (e) {
        console.log(e);
    }

    // for (let i = 0; i < countCells; i++) {
    //     diedCells.set(i, 0);
    // }
    // let x = 0;
    // while (x < Math.floor(countCells / 2)) {
    //     let ind = Math.floor(Math.random() * countCells);
    //     if (diedCells.has(ind)) {
    //         diedCells.delete(ind);
    //         aliveCells.set(ind, 0);
    //         x++;
    //     }
    //
    // // }
    //
    // calculateNeighbors();
    // drawCells();
}
//
// function drawCells() {
//     for (let [key] of aliveCells) {
//         let td = document.getElementById(key);
//         td.setAttribute("bgcolor", "black");
//     }
//     for (let [key] of diedCells) {
//         let td = document.getElementById(key);
//         td.setAttribute("bgcolor", "white");
//     }
// }
//
// function cleanGrid() {
//     setFlag(false);
//     aliveCells.clear();
//     for (let i = 0; i < countCells; i++) {
//         diedCells.set(i, 0);
//     }
//     drawCells();
// }
//
// function setDelay() {
//     let v = document.getElementById("delayValue").value;
//     delayValue = parseInt(v);
// }
//
// async function sleep(delayValue) {
//     return new Promise(resolve => setTimeout(resolve, delayValue));
// }
//
// async function runSteps() {
//     if (delayValue === 0) return;
//     while (flagRun) {
//         await sleep(delayValue);
//         oneStep();
//     }
// }
//
// function setFlag(f) {
//     flagRun = f;
//     if (flagRun) runSteps();
// }
//
// function clickGrid(idTd) {
//     console.log(idTd.id);
//     let clickId = parseInt(idTd.id);
//     if (aliveCells.has(clickId)) {
//         aliveCells.delete(clickId);
//         diedCells.set(clickId, 0);
//     } else {
//         diedCells.delete(clickId);
//         aliveCells.set(clickId, 0);
//     }
//
//     calculateNeighbors();
//     drawCells();
// }

function drawGrid() {
    const tableBody = document.createElement("tbody");
    let c = 0;
    for (let i = 0; i < heightTable; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < wightTable; j++) {
            const el = document.createElement("td");
            el.setAttribute("width", wightHeightCell);
            el.setAttribute("height", wightHeightCell);
            el.setAttribute("id", c);
            el.setAttribute("onclick", "clickGrid(this)")
            row.appendChild(el);
            c++;
        }
        tableBody.appendChild(row);
    }
    document.getElementById("gameGrid").appendChild(tableBody);
    document.getElementById("gameGrid").setAttribute("border", "0");
}