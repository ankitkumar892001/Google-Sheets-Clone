let workbookDB = [];
let myStorage = window.localStorage;
// let sheet = document.querySelector(".sheet");
let workbookBtn = document.querySelector(".workbook");

let loadNewWorkbook = ()=>{
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
        textColor : "black",
        children: [],
        formula : "",
        value: "",
      };
      row.push(cell);
    }
    sheetDB.push(row);
  }
  workbookDB.push(sheetDB);
};

let loadOldWorkbook = (sheet) => {
  // 2d array
  for (let i = 0; i < sheet.length; i++) {
    for (let j = 0; j < sheet[i].length; j++) {
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
      } = sheet[i][j];

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


// Check to see if a backup exists or not
if(myStorage.getItem('Sheets-Workbook')!=null){
  let oldWorkBook = JSON.parse(myStorage.getItem('Sheets-Workbook'));
  
  console.log("WORK BOOK FOUND IN LOCAL");
  // updating current workbookDB
  workbookDB = oldWorkBook;

  // loading data of sheet 0 in current cells
  loadOldWorkbook(oldWorkBook[0]);

  // // creating sheet buttons for old sheets
  for(let i=1;i<oldWorkBook.length;i++){
//     console.log(oldWorkBook[i]);
    let sheets = document.querySelector(".sheets");
    let newSheet = document.createElement("div");
    newSheet.classList.add("sheet");
    newSheet.setAttribute("sheetIdx", i+1);
    newSheet.innerText = `Sheet ${i+1}`;
    sheets.appendChild(newSheet);
    //newSheet.addEventListener("click", sheetSelect);
  }
  
}
else{
  loadNewWorkbook();
}

workbookBtn.addEventListener("click", ()=>{
       console.log("New workbook requested");
       myStorage.removeItem('Sheets-Workbook');
       workbookDB = [];
       loadNewWorkbook();
       location.reload();
})