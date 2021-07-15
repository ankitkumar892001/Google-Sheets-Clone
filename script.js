let cells = document.querySelectorAll(".row>.col");
let fontResizer = document.querySelector("#font-size");
let fontStyler = document.querySelector("#font-family");
let boldBtn = document.querySelector("#bold");
let italicBtn = document.querySelector("#italic");
let underlineBtn = document.querySelector("#underline");
let alignStyler = document.querySelector("#styler-align");
let bgSelector = document.querySelector("#bg-color");
let textColorSelector = document.querySelector("#color");
let addressBox = document.querySelector("#address-box");
let formulaInput = document.querySelector(".formula-box");
let plusBtn = document.querySelector(".fa-plus");
let presentSheets = document.querySelectorAll(".sheet");

let sheetId = 0;
let sheetDB = workbookDB[0]; 
// console.log("workbookDB - ",workbookDB);


// `````````````````````````````````````````````````````````````````````````````````````
// ````````````````````````` DUAL BINDING I part ( Div -> Menu ) `````````````````````````
// `````````````````````````````````````````````````````````````````````````````````````
// ````````````````````````` addeventListener for every cell `````````````````````````
// `````````````````````````````````````````````````````````````````````````````````````
let cellsHandler = () => {
    for (let i = 0; i < cells.length; i++) {              //2600 cells
        cells[i].addEventListener("click", (event) => {
            let rId = Number(cells[i].getAttribute("rid"));
            let cId = Number(cells[i].getAttribute("cid"));
            let address = `${String.fromCharCode(cId + 65)}${rId + 1}`;
            addressBox.value = address;

            // setting styles to menu items when clicked on div  
            let cellObject = sheetDB[rId][cId];
            setStyles(cellObject);
            setFormula(cellObject);
        });
    }
};

cellsHandler();

let setStyles = (cellObject) => {
    setFontSize(cellObject);
    setFontStyle(cellObject);
    setBUI(cellObject);
    setAlign(cellObject);
    setColor(cellObject);
};

let setBUI = (cellObject) => {
    // bold
    if (cellObject.bold == true) {
        boldBtn.classList.add("active-styler");
    } else {
        boldBtn.classList.remove("active-styler");
    }

    // italic
    if (cellObject.italic == true) {
        italicBtn.classList.add("active-styler");
    } else {
        italicBtn.classList.remove("active-styler");
    }

    // underline
    if (cellObject.underline == true) {
        underlineBtn.classList.add("active-styler");
    } else {
        underlineBtn.classList.remove("active-styler");
    }
};

let setAlign = (cellObject) => {
    if (cellObject.halign == "left") {
        alignStyler.value = "left";
    } else if (cellObject.halign == "right") {
        alignStyler.value = "right";
    } else if (cellObject.halign == "center") {
        alignStyler.value = "center";
    }
};

let setFontSize = (cellObject) => {
    if (cellObject.fontSize == "8") {
        fontResizer.value = "8";
    } else if (cellObject.fontSize == "10") {
        fontResizer.value = "10";
    } else if (cellObject.fontSize == "12") {
        fontResizer.value = "12";
    } else if (cellObject.fontSize == "16") {
        fontResizer.value = "16";
    } else if (cellObject.fontSize == "20") {
        fontResizer.value = "20";
    } else if (cellObject.fontSize == "32") {
        fontResizer.value = "32";
    }
};

let setFontStyle = (cellObject) => {
    if (cellObject.fontFamily == "Arial") {
        fontStyler.value = "Arial";
    } else if (cellObject.fontFamily == "Cambria") {
        fontStyler.value = "Cambria";
    } else if (cellObject.fontFamily == "Fantasy") {
        fontStyler.value = "Fantasy";
    } else if (cellObject.fontFamily == "Georgia") {
        fontStyler.value = "Georgia";
    } else if (cellObject.fontFamily == "Monospace") {
        fontStyler.value = "Monospace";
    } else if (cellObject.fontFamily == "sans-serif") {
        fontStyler.value = "sans-serif";
    } 
};

let setColor = (cellObject) => {
    textColorSelector.value = cellObject.textColor;
    bgSelector.value = cellObject.bgColor;
};

let setFormula = (cellObject) => {
    formulaInput.value = cellObject.formula;
};


// `````````````````````````````````````````````````````````````````````````````````````
// ````````````````````````` DUAL BINDING II part ( Menu -> Div ) `````````````````````````
// `````````````````````````````````````````````````````````````````````````````````````
// ````````````````````````` addeventListeners for every tool in Menu `````````````````````````
// `````````````````````````````````````````````````````````````````````````````````````
fontResizer.addEventListener("change", (event) => {
    // event.currentTarget -> returns element in the form of an object
    console.log("event.currentTarget - ",event.currentTarget);

    let size = event.currentTarget.value;
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);
    cells[rId * 26 + cId].style.fontSize = size + "px";
    sheetDB[rId][cId].fontSize = size;
});

fontStyler.addEventListener("change", (event) => {
    let style = event.currentTarget.value;
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);
    cells[rId * 26 + cId].style.fontFamily = style;
    sheetDB[rId][cId].fontFamily = style;
});

boldBtn.addEventListener("click", (event) => {
    let isActive = boldBtn.classList.contains("active-styler");
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);
    let cellObject = sheetDB[rId][cId];
    if (isActive) {
        cells[rId * 26 + cId].style.fontWeight = "normal";
        boldBtn.classList.remove("active-styler");
        cellObject.bold = false;
    } else {
        cells[rId * 26 + cId].style.fontWeight = "bolder";
        boldBtn.classList.add("active-styler");
        cellObject.bold = true;
    }
});

italicBtn.addEventListener("click", (event) => {
    let isActive = italicBtn.classList.contains("active-styler");
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);
    let cellObject = sheetDB[rId][cId];
    if (isActive) {
        cells[rId * 26 + cId].style.fontStyle = "normal";
        italicBtn.classList.remove("active-styler");
        cellObject.italic = false;
    } else {
        cells[rId * 26 + cId].style.fontStyle = "italic";
        italicBtn.classList.add("active-styler");
        cellObject.italic = true;
    }
});

underlineBtn.addEventListener("click", (event) => {
    let isActive = underlineBtn.classList.contains("active-styler");
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);
    let cellObject = sheetDB[rId][cId];
    if (isActive) {
        cells[rId * 26 + cId].style.textDecoration = "none";
        underlineBtn.classList.remove("active-styler");
        cellObject.underline = false;
    } else {
        cells[rId * 26 + cId].style.textDecoration = "underline";
        underlineBtn.classList.add("active-styler");
        cellObject.underline = true;
    }
});

alignStyler.addEventListener("change", (event) => {
    let alignVal = event.currentTarget.value;
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);
    cells[rId * 26 + cId].style.textAlign = alignVal;
    sheetDB[rId][cId].halign = alignVal;
});

document.querySelector("#color").addEventListener("change", (event) => {
    let color = event.target.value;
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);
    cells[rId * 26 + cId].style.color = color;
    sheetDB[rId][cId].textColor = color;
});
document.querySelector("#bg-color").addEventListener("change", (event) => {
    let color = event.target.value;
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);
    cells[rId * 26 + cId].style.backgroundColor = color;
    sheetDB[rId][cId].bgColor = color;
});


// ```````````````````````````````````````````````````````````````````````````
// `````````` Helper function to derive rId and cId from address-box ( D1 -> 0,3 ) ``````````
// ```````````````````````````````````````````````````````````````````````````
let getAdress = (address) => {
    let cId = address.charCodeAt(0) - 65;
    let rId = Number(address.slice(1)) - 1;
    return { rId, cId };
};


// ```````````````````````````````````````````````````````````````````````````
// ``````````````` Plus Button addeventListener to add a new sheet ```````````````
// ```````````````````````````````````````````````````````````````````````````
plusBtn.addEventListener("click", (event) => {
    let sheetArr = document.querySelectorAll(".sheet");
    let newSheetId = sheetArr.length + 1;
    if (newSheetId <= 10) {
        let sheets = document.querySelector(".sheets");
        let newSheet = document.createElement("div");
        newSheet.classList.add("sheet");
        newSheet.setAttribute("sheetIdx", newSheetId);
        newSheet.innerText = `Sheet ${newSheetId}`;
        sheets.appendChild(newSheet);
        newSheetCreate();
        newSheet.addEventListener("click", sheetSelect);
        newSheet.click();
    } else {
        alert("Can't create more than 10 sheets");
    }
});


// ```````````````````````````````````````````````````````````````````````````
// ````` Creates new sheetDB (blank) and adds it to workbookDB (plusBtn) `````
// ```````````````````````````````````````````````````````````````````````````
let newSheetCreate = () => {
    console.log("newSheetCreate");
    let sheetDB = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cell = {
                fontSize: "16",
                fontFamily: "Arial",
                bold: false,
                italic: false,
                underline: false,
                halign: "left",
                textColor: "#000000",
                bgColor: "#ffffff",
                children: [],
                formula: "",
                value: "",
            };
            row.push(cell);
        }
        sheetDB.push(row);
    }
    workbookDB.push(sheetDB);

    myStorage.setItem("Sheets-Workbook", JSON.stringify(workbookDB));
};


// ```````````````````````````````````````````````````````````````````````````
// ``````````````` Function triggered when a sheet is selected ```````````````
// ```````````````````````````````````````````````````````````````````````````
let sheetSelect = (event) => {
    console.log("sheetSelect");
    let currentTarget = event.target;
    let sheetArr = document.querySelectorAll(".sheet");
    for (let i = 0; i < sheetArr.length; i++) {
        if (sheetArr[i].classList.contains("active-sheet")) {
            sheetArr[i].classList.remove("active-sheet");
            break;
        }
    }
    currentTarget.classList.add("active-sheet");
    sheetId = Number(currentTarget.getAttribute("sheetIdx")) - 1;
    console.log("sheetId - ",sheetId);
    sheetDB = workbookDB[sheetId];
    loadUI(sheetDB);
};

for (let i = 0; i < presentSheets.length; i++) {
    presentSheets[i].addEventListener("click", sheetSelect);
}


// ```````````````````````````````````````````````````````````````````````````
// ``````````````` Loads UI for the Selected Sheet (sheetSelect()) ```````````````
// ```````````````````````````````````````````````````````````````````````````
let loadUI = (sheetDB) => {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let {
                fontSize,
                fontFamily,
                bold,
                italic,
                underline,
                halign,
                textColor,
                bgColor,
                value,
            } = sheetDB[i][j];

            cell.style.fontSize = fontSize + "px";
            cell.style.fontFamily = fontFamily;
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.style.fontStyle = italic == true ? "italic" : "normal";
            cell.style.textDecoration = underline == true ? "underline" : "none";
            cell.style.textAlign = halign;
            cell.style.color = textColor;
            cell.style.backgroundColor = bgColor;
            cell.innerText = value;
        }
    }
};


// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// `````````````Updating values of selected cell with blur event``````````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("blur", function handleCell() {
        let address = addressBox.value;
        let { rId, cId } = getAdress(address);
        let cellObject = sheetDB[rId][cId];
        let cell = document.querySelector(`.col[rid="${rId}"][cid="${cId}"]`);

        if (cellObject.value != cell.innerText && cellObject.formula != "") {
            // removing the cell that's changed from children array of parent cells.
            removeChildren(formulaInput.value, address);
            cellObject.formula = "";
        }

        if (cellObject.value != cell.innerText) {
            // for a change in parent cell, updating values in children cells
            cellObject.value = cell.innerText;
            updateChildren(cellObject);
        }

        cellObject.value = cell.innerText;

        // Updating local storage
        myStorage.setItem("Sheets-Workbook", JSON.stringify(workbookDB));
    });
}

// cells[0].click();

// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````Formula implementation``````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
formulaInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter" && formulaInput.value != "") {
        let address = addressBox.value;
        let { rId, cId } = getAdress(address);
        let cellObject = sheetDB[rId][cId];
        if (cellObject.formula != "" && formulaInput.value != cellObject.formula) {
            removeOldFormula(cellObject, address);
        }

        // handling new formula
        newFormulaHandler();

        // Updating local storage
        myStorage.setItem("Sheets-Workbook", JSON.stringify(workbookDB));
    }
});

let removeOldFormula = (cellObject, address) => {
    // removing the cell who's formula is changed, from children array of parent cells.
    removeChildren(formulaInput.value, address);
    cellObject.formula = "";
};

let newFormulaHandler = () => {
    let formula = formulaInput.value;
    // Step 1 ->  Evaluate formula
    let ans = evaluateFormula(formula);

    // Step 2 -> Putting value in the selected cell (UI and DB)
    let address = addressBox.value;
    let { rId, cId } = getAdress(address);

    // 2.1 -> DB
    sheetDB[rId][cId].value = ans;
    // 2.2 -> UI
    let cell = document.querySelector(`.col[rid="${rId}"][cid="${cId}"]`);
    cell.innerText = ans;

    // Step 3 -> Adding formula to the target cell (DB)
    sheetDB[rId][cId].formula = formula;

    addChildren(formula, address);
};

let addChildren = (formula, address) => {
    let formulaTokens = formula.split(" ");
    // split
    // [(, A1, +, A2,)]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let { rId, cId } = getAdress(formulaTokens[i]);
            let cellObject = sheetDB[rId][cId];

            if (!cellObject.children.includes(address)) {
                cellObject.children.push(address);
            } else {
                // cellObject.children.push(address);
                console.log("Already has the value in children");
            }
        }
    }
};

let removeChildren = (formula, address) => {
    let formulaTokens = formula.split(" ");
    // split
    // [(, A1, +, A2,)]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let { rId, cId } = getAdress(formulaTokens[i]);
            let cellObject = sheetDB[rId][cId];
            // cellObject.children.remove(address);
            let idx = cellObject.children.indexOf(address);
            cellObject.children.splice(idx, 1);
        }
    }
};

let updateChildren = (cellObject) => {
    let childrenArr = cellObject.children;
    // handling each child of parent
    for (let i = 0; i < childrenArr.length; i++) {
        let address = childrenArr[i];
        let { rId, cId } = getAdress(address);
        let childObject = sheetDB[rId][cId];

        let formula = childObject.formula;
        // new value for child
        let ans = evaluateFormula(formula);
        // updating UI ans DB for CHILD
        // 2.1 -> DB
        childObject.value = ans;
        // 2.2 -> UI
        let cell = document.querySelector(`.col[rid="${rId}"][cid="${cId}"]`);
        cell.innerText = ans;

        // revursively perform the same for all the children (DFS algorithm)
        updateChildren(childObject);
    }
};

let evaluateFormula = (formula) => {
    let formulaTokens = formula.split(" ");
    // split
    // [(, A1, +, A2,)]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let { rId, cId } = getAdress(formulaTokens[i]);
            let cellObject = sheetDB[rId][cId];
            let { value } = cellObject;
            formula = formula.replace(formulaTokens[i], value);
        }
    }
    // infix evaluation
    let ans = eval(formula);
    return ans;
    // DB-> A1 ,A2-> 10,20
    // [(,10 + ,20, )]
    // eval
    // ( 10 + 20 )
};
