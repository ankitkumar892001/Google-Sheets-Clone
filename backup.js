let workbookDB = [];
let myStorage = window.localStorage;
let workbookBtn = document.querySelector(".workbook");

let loadNewWorkbook = () => {
    console.log("loadNewWorkbook");
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
            row.push(cell);         // 1-D, array of cols, size = 26
        }
        sheetDB.push(row)           // 2-D, array of rows, size = 100 * 26
    }
    workbookDB.push(sheetDB);       // 3-D.,array of sheets, size = (no of sheets) * 100 * 26 
    // workbookDB.push("apple");
    // workbookDB.push("Mango");
};

let loadOldWorkbook = (sheet) => {
    console.log("loadOldWorkbook");
    for (let i = 0; i < sheet.length; i++) {
        for (let j = 0; j < sheet[i].length; j++) {
            let cell = document.querySelector(`[rid="${i}"][cid="${j}"]`);
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
            } = sheet[i][j];

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


// Check to see if a backup exists or not
if (myStorage.getItem('Sheets-Workbook') != null) {
    console.log("WORK BOOK FOUND IN LOCAL STORAGE");

    // get Workbook from local storage
    let oldWorkBook = JSON.parse(myStorage.getItem('Sheets-Workbook'));

    // updating current workbookDB
    workbookDB = oldWorkBook;

    // loading data of sheet 0 in current cells
    loadOldWorkbook(workbookDB[0]);

    // creating sheet buttons for old sheets
    for (let i = 1; i < workbookDB.length; i++) {
        let sheets = document.querySelector(".sheets");
        let newSheet = document.createElement("div");
        newSheet.classList.add("sheet");
        newSheet.setAttribute("sheetIdx", i + 1);
        newSheet.innerText = `Sheet ${i + 1}`;
        sheets.appendChild(newSheet);
    }
}
else {
    loadNewWorkbook();
}

workbookBtn.addEventListener("click", () => {
    console.log("New workbook requested");
    myStorage.removeItem('Sheets-Workbook');
    workbookDB = [];
    loadNewWorkbook();
    // to remove current UI
    location.reload();
})