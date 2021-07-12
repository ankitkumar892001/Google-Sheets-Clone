let plusBtn = document.querySelector(".fa-plus");
let preSheets = document.querySelectorAll(".sheet");
let cells = document.querySelectorAll(".row>.col");
let addressBox = document.querySelector("#address-box");
let formulaInput = document.querySelector(".formula-box");

let alignStyler = document.querySelector("#styler-align");
let fontResizer = document.querySelector("#font-size");
let fontStyler = document.querySelector("#font-family");
let boldBtn = document.querySelector("#bold");
let italicBtn = document.querySelector("#italic");
let underlineBtn = document.querySelector("#underline");

let sheetId = 0;
let sheetDB = workbookDB[0];

// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````eventListener for every cell ```````````````````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
let cellsHandler = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", (e) => {
      let rId = Number(cells[i].getAttribute("rid"));
      let cId = Number(cells[i].getAttribute("cid"));
      let address = `${String.fromCharCode(cId + 65)}${rId + 1}`;
      addressBox.value = address;

      // Set styles
      let cellObject = sheetDB[rId][cId];
      setStyles(cellObject);
      setFormula(cellObject);
    });
  }
};

cellsHandler();
// ``````` SETTING STYLES `````````````````````````

let setStyles = (cellObject) => {
  setBUI(cellObject);
  setAlign(cellObject);
  setFontStyle(cellObject);
  setFontSize(cellObject);
  setColor(cellObject);
};

let setBUI = (cellObject) => {
  // boldness
  if (cellObject.bold == true) {
    boldBtn.classList.add("active-styler");
  } else {
    boldBtn.classList.remove("active-styler");
  }

  // italics
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
  } else if (cellObject.fontFamily == "Georgia") {
    fontStyler.value = "Georgia";
  } else if (cellObject.fontFamily == "monospace") {
    fontStyler.value = "monospace";
  } else if (cellObject.fontFamily == "sans-serif") {
    fontStyler.value = "sans-serif";
  } else if (cellObject.fontFamily == "fantasy") {
    fontStyler.value = "fantasy";
  }
};

let setColor = (cellObject) => {
  let bgSelector = document.querySelector("#bg-color");
  bgSelector.value = cellObject.bgColor;
  let textColorSelector = document.querySelector("#color");
  textColorSelector.value = cellObject.textColor;
};

let setFormula = (cellObject) => {
  formulaInput.value = cellObject.formula;
};

// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// ````````Formatting functions , eventListeners for tools in Menu ``````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
alignStyler.addEventListener("change", (e) => {
  let alignVal = e.currentTarget.value;
  let address = addressBox.value;
  let { rId, cId } = getAdress(address);
  cells[rId * 26 + cId].style.textAlign = alignVal;
  sheetDB[rId][cId].halign = alignVal;
});

fontResizer.addEventListener("change", (e) => {
  let size = e.currentTarget.value;
  let address = addressBox.value;
  let { rId, cId } = getAdress(address);
  cells[rId * 26 + cId].style.fontSize = size + "px";
  sheetDB[rId][cId].fontSize = size;
});

fontStyler.addEventListener("change", (e) => {
  let style = e.currentTarget.value;
  let address = addressBox.value;
  let { rId, cId } = getAdress(address);
  cells[rId * 26 + cId].style.fontFamily = style;
  sheetDB[rId][cId].fontFamily = style;
});

boldBtn.addEventListener("click", (e) => {
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

italicBtn.addEventListener("click", (e) => {
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

underlineBtn.addEventListener("click", (e) => {
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

document.querySelector("#color").addEventListener("change", (e) => {
  let color = e.target.value;
  let address = addressBox.value;
  let { rId, cId } = getAdress(address);
  cells[rId * 26 + cId].style.color = color;

  sheetDB[rId][cId].textColor = color;
});
document.querySelector("#bg-color").addEventListener("change", (e) => {
  let color = e.target.value;
  let address = addressBox.value;
  let { rId, cId } = getAdress(address);
  cells[rId * 26 + cId].style.backgroundColor = color;

  sheetDB[rId][cId].bgColor = color;
});

// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// ````````Helper function to derive rId and cId from address(A1->0,0)```````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
let getAdress = (address) => {
  let cId = address.charCodeAt(0) - 65;
  let rId = Number(address.slice(1)) - 1;
  return { rId, cId };
};

// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// `````````````Plus Button eventListener to add a new sheet`````````````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
plusBtn.addEventListener("click", (e) => {
  let sheetArr = document.querySelectorAll(".sheet");
  // console.log(sheetArr[sheetArr.length - 1].attributes);
  let newSheetId = sheetArr[sheetArr.length - 1].attributes[1].value;
  newSheetId++;
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

// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// `````````````Function triggered when a sheet is selected``````````````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
let sheetSelect = (e) => {
  let currentTarget = e.target;
  let sheetArr = document.querySelectorAll(".sheet");
  for (let i = 0; i < sheetArr.length; i++) {
    if (sheetArr[i].classList.contains("active-sheet")) {
      sheetArr[i].classList.remove("active-sheet");
      break;
    }
  }
  currentTarget.classList.add("active-sheet");
  sheetId = Number(currentTarget.getAttribute("sheetIdx")) - 1;
  console.log(sheetId);
  sheetDB = workbookDB[sheetId];
  loadUI(sheetDB);
};

for (let i = 0; i < preSheets.length; i++) {
  preSheets[i].addEventListener("click", sheetSelect);
}
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// `````````Creates new sheetDB(blank) and adds it to workbookDB (plusBtn)```
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
let newSheetCreate = () => {
  let sheetDB = [];
  for (let i = 0; i < 100; i++) {
    let row = [];
    for (let j = 0; j < 26; j++) {
      let cell = {
        bold: false,
        italic: false,
        underline: false,
        fontFamily: "sans-serif",
        fontSize: "16",
        halign: "center",
        bgColor: "white",
        textColor: "black",
        children: [],
        formula: "",
        value: "",
      };
      row.push(cell);
    }
    sheetDB.push(row);
  }
  workbookDB.push(sheetDB);
  console.log(workbookDB);

  myStorage.setItem("Sheets-Workbook", JSON.stringify(workbookDB));
};

// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
// `````````````Loads UI for the Selected Sheet (sheetSelect())``````````````
// ``````````````````````````````````````````````````````````````````````````
// ``````````````````````````````````````````````````````````````````````````
let loadUI = (sheetDB) => {
  // 2d array
  for (let i = 0; i < sheetDB.length; i++) {
    for (let j = 0; j < sheetDB[i].length; j++) {
      let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
      let {
        bold,
        italic,
        underline,
        fontFamily,
        fontSize,
        halign,
        bgColor,
        textColor,
        value,
      } = sheetDB[i][j];

      cell.style.fontWeight = bold == true ? "bold" : "normal";
      cell.style.fontStyle = italic == true ? "italic" : "normal";
      cell.style.textDecoration = underline == true ? "underline" : "none";
      cell.style.fontFamily = fontFamily;
      cell.style.fontSize = fontSize + "px";
      cell.style.textAlign = halign;
      cell.style.backgroundColor = bgColor;
      cell.style.color = textColor;

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
formulaInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && formulaInput.value != "") {
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
