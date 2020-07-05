let wightTable = heightTable = 80;
let wightHeightCell = "5px";
let flagRun = true;
let delayValue = 100;
clearCells();

function setFlag(f) {
    flagRun = f;
    if (flagRun) runSteps();
}

function setDelay() {
    let v = document.getElementById("delayValue").value;
    delayValue = parseInt(v);
}

async function sleep(delayValue) {
    return new Promise(resolve => setTimeout(resolve, delayValue));
}

async function runSteps() {
    if (delayValue === 0) return;
    while (flagRun) {
        await sleep(delayValue);
        await makeRequestAndUpdate("one_step");
    }
}

function drawCells(cells) {
    let elements = Object.values(cells[0]);
    for (let i = 0; i < elements.length; i++) {
        let currElement = elements[i];
        if (currElement['status'] === true) {
            let td = document.getElementById(i);
            td.setAttribute("bgcolor", "black");
        } else {
            let td = document.getElementById(i);
            td.setAttribute("bgcolor", "white")
        }
    }
}

function clearCells() {
    for (let i = 0; i < wightTable * heightTable; i++) {
        let td = document.getElementById(i);
        td.setAttribute("bgcolor", "white");
    }
}

async function makeRequestAndUpdate(type) {
    let response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            type: type
        })
    });
    let result = await response.json();
    console.log(result);
    drawCells(result['result']);
}

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