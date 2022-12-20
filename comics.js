class ComicBox {
    constructor(id,label){
        this.id = id; this.label = label; this.contents = [];
    }
    addComic(comic){
        this.contents.push(comic);
    }
    deleteComic(comic){
        let index = this.contents.indexOf(comic);
        this.contents.splice(index,1);
    }
}

class Comic {
    constructor(id,name,issue,year,pub){
        this.id = id; this.name = name; this.issue = issue; this.year = year; this.pub = pub;
    }
}

let comicBoxes = [];
console.log(comicBoxes[0]);
let comicBoxId = 0;
let comicId = 0;

function onClick(id, action){
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(element){
    return document.getElementById(element).value;
 }

onClick('new-comic-box',()=>{
    comicBoxes.push(new ComicBox(comicBoxId++,getValue('new-comic-box-label')));
    console.log(comicBoxes);
    drawDOM();
    document.getElementById('new-comic-box-label').value = '';
 });

function drawDOM(){
    let comicDiv = document.getElementById('comics');
    clearElement(comicDiv);
    for (let i = 0; i < comicBoxes.length; i++){
        console.log(comicBoxes[i].label);
        console.log(comicBoxes[i].id);
        let table = createComicBoxTable(comicBoxes[i]);
        let title = document.createElement('h2');
        title.innerHTML = comicBoxes[i].label;
        title.appendChild(deleteComicBoxButton(comicBoxes[i].label));
        comicDiv.appendChild(title);
        comicDiv.appendChild(table);
        for(let j = 0; j < comicBoxes[i].contents.length; j++){
            createComicRow(comicBoxes[i], table, comicBoxes[i].contents[j]);
        }
    }
}

function createComicRow(comicBox, table, comic){
    let row = table.insertRow(-1);
    row.insertCell(0).innerHTML = comic.name;
    row.insertCell(1).innerHTML = comic.issue;
    row.insertCell(2).innerHTML = comic.year;
    row.insertCell(3).innerHTML = comic.pub;
    row.insertCell(4).appendChild(deleteComicButton(comicBox, comic));
}

function deleteComicButton(comicBox, comic){
    let btn = document.createElement('button'); 
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = ()=>{
        let index = comicBox.contents.indexOf(comic);
        comicBox.contents.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function deleteComicBoxButton(comicBox){
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = ()=>{
        let index = comicBox.indexOf(comicBox);
        comicBoxes.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewComicButton(comicBox){
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = ()=>{
        comicBox.contents.push(new Comic(comicId++,getValue(`name-input-${comicBox.contents.id}`),
            getValue(`issue-input-${comicBox.contents.id}`),
            getValue(`year-input-${comicBox.contents.id}`),
            getValue(`pub-input-${comicBox.contents.id}`)));
        drawDOM();
    }
    return btn;
}

function createComicBoxTable(comicBox){
    console.log(comicBox.contents);
    let table = document.createElement('table');
    table.setAttribute('class','table table-dark');
    let row = table.insertRow(0);
    let nameCol = document.createElement('th');
    let issueCol = document.createElement('th');
    let yearCol = document.createElement('th');
    let pubCol = document.createElement('th');
    nameCol.innerHTML = 'Name';
    issueCol.innerHTML = 'Issue #';
    yearCol.innerHTML = 'Year';
    pubCol.innerHTML = 'Publisher';
    row.appendChild(nameCol);
    row.appendChild(issueCol);
    row.appendChild(yearCol);
    row.appendChild(pubCol);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let issueTh = document.createElement('th');
    let yearTh  = document.createElement('th');
    let pubTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id',`name-input-${comicBox.contents.id}`);
    nameInput.setAttribute('type','text');
    nameInput.setAttribute('class','form-control');
    let issueInput = document.createElement('input');
    issueInput.setAttribute('id',`issue-input-${comicBox.contents.id}`);
    issueInput.setAttribute('type','text');
    issueInput.setAttribute('class','form-control');
    let yearInput = document.createElement('input');
    yearInput.setAttribute('id',`year-input-${comicBox.contents.id}`);
    yearInput.setAttribute('type','text');
    yearInput.setAttribute('class','form-control');
    let pubInput = document.createElement('input');
    pubInput.setAttribute('id',`pub-input-${comicBox.contents.id}`);
    pubInput.setAttribute('type','text');
    pubInput.setAttribute('class','form-control');
    let newComicButton = createNewComicButton(comicBox);
    nameTh.appendChild(nameInput);
    issueTh.appendChild(issueInput);
    yearTh.appendChild(yearInput);
    pubTh.appendChild(pubInput);
    createTh.appendChild(newComicButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(issueTh);
    formRow.appendChild(yearTh);
    formRow.appendChild(pubTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}