// **************************************** left-column ****************************************
let left_col = document.querySelector(".left-col");
let str = "";
for (let i = 0; i < 100; i++) {
  str += `<div class="left-col-box">${i + 1}</div>`;
}
left_col.innerHTML = str;


// **************************************** top-row ****************************************
let top_row = document.querySelector(".top-row");
str = "";
for (let i = 0; i < 26; i++) {
  str += `<div class="col">${String.fromCharCode(i + 65)}</div>`;
}
top_row.innerHTML = str;


// **************************************** grid **************************************** 
let grid = document.querySelector(".grid");
str = "";
for (let i = 0; i < 100; i++) {
  str += `<div class="row">`;
  for (let j = 0; j < 26; j++) {
    str += `<div class="col" rid="${i}" cid="${j}" contenteditable="true"></div>`;
  }
  str += "</div>";
}
grid.innerHTML = str;
