// JS

// GLOBAL VARIABLES
let LIST_OBJ_ARRAY = [];
let APP = document.getElementById('app');
let INPUT_BOX = createElementAndClass('input', 'm-2 text-dark col-10');
let TO_DO_LIST = createElementAndClass('div', 'm-2 text-dark col-10 text-left');

// OBJECT CONSTRUCTORS
class ListObj {
    constructor(id, title, done) {
        this.id = id;
        this.title = title;
        this.done = done;
    }
}

// Function to render elements
function createElementAndClass(element, classes) {
    let output = document.createElement(element);
    output.className = classes;
    return output;
}

// LOAD APP
function loadApp() {
    // Create Elements
    let container = createElementAndClass('div', 'container-fluid');
    let row = createElementAndClass('div', 'row');

    let leftCol = createElementAndClass('div', 'col-0 col-sm-0 col-md-1 col-lg-2');
    let centerCol = createElementAndClass('div', 'col-12 col-sm-12 col-md-10 col-lg-8 text-center');
    let rightCol = createElementAndClass('div', 'col-0 col-sm-0 col-md-1 col-lg-2');

    // Title
    let title = createElementAndClass('h1', 'mt-5 display-4 text-dark');
    title.innerHTML = 'to-do';

    // Input Box
    INPUT_BOX.autofocus = true;
    INPUT_BOX.setAttribute('type', 'text');
    INPUT_BOX.setAttribute('placeholder', 'What needs to get done?');
    INPUT_BOX.setAttribute('id', 'listItemInputBox');

    let selectionBtns = createElementAndClass('div', 'btn-group p-3');
    selectionBtns.setAttribute('role', 'group');
    selectionBtns.setAttribute('aria-label', 'Selection Buttons');
    selectionBtns.innerHTML = '<button id="viewDone" type="button" class="btn btn-success">&#10004;</button><button id="viewAll" type="button" class="btn btn-secondary">ALL</button><button id="viewTodo" type="button" class="btn btn-danger">&#10006;</button>';

    let toggleBtns = createElementAndClass('div', 'btn-group'); //  btn-group-sm
    toggleBtns.setAttribute('style', 'display: block;');
    toggleBtns.setAttribute('role', 'group');
    toggleBtns.setAttribute('aria-label', 'Selection Buttons');
    toggleBtns.innerHTML = '<button id="toggleAll" type="button" class="btn btn-primary">&#128280;</button><button id="delete" type="button" class="btn btn-primary">&#128163;</button>';

    // To-do List
    // TO_DO_LIST.setAttribute('style', 'display: none;');

    // Append Elements
    centerCol.appendChild(title);
    centerCol.appendChild(INPUT_BOX);
    centerCol.appendChild(TO_DO_LIST);
    centerCol.appendChild(selectionBtns);
    centerCol.appendChild(toggleBtns);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);
    APP.appendChild(container);

    // When the page loads, if there is already values in the object array, populate the array
    if (localStorage.length > 0) {
        for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
            let parsedJSON = JSON.parse(window.localStorage.todoList)[`${i}`];
            LIST_OBJ_ARRAY.push(new ListObj(i, parsedJSON.title, parsedJSON.done));
            addToList(i, JSON.parse(window.localStorage.todoList)[i].title);
            if (LIST_OBJ_ARRAY[i].done) {
                let x = document.querySelector(`input[name="${i}"]`);
                x.parentElement.className = 'text-success ml-5';
                x.checked = true;
            }
        }
    }
    document.getElementById('viewDone').addEventListener('click', viewDoneFunc);
    document.getElementById('viewAll').addEventListener('click', viewAllFunc);
    document.getElementById('viewTodo').addEventListener('click', viewTodoFunc);
    document.getElementById('toggleAll').addEventListener('click', toggleAll);
    document.getElementById('delete').addEventListener('click', deleteToggled);
}

// FUNCTIONS
// INPUT_BOX.addEventListener(onchange, makeBtnsVisible);

document.addEventListener('keydown', function (e) {
    // For testing --> Clears the local storage on key "="
    if (e.keyCode === 187) {
        localStorage.clear();
        LIST_OBJ_ARRAY = [];
        console.log(window.localStorage);
    }
    // For testing --> Displays the local storage and list obj array on "-" key
    if (e.keyCode === 189) {
        console.log('----- Parsed JSON -----');
        console.log(JSON.parse(window.localStorage.todoList));
        console.log('----- LIST_OBJ_ARRAY -----');
        console.log(LIST_OBJ_ARRAY);
        console.log(INPUT_BOX.value);
    }
    // "Enter" key
    if (e.keyCode === 13) {
        if (INPUT_BOX.value.trim() !== '') {
            LIST_OBJ_ARRAY.push(new ListObj(LIST_OBJ_ARRAY.length, `${INPUT_BOX.value}`, false));
            localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
            INPUT_BOX.value = '';
            let todoParsed = JSON.parse(window.localStorage.todoList);
            addToList(todoParsed.length - 1, todoParsed[todoParsed.length - 1].title);
        }
    }
});

function makeBtnsVisible() {
    // Make the buttons visible
}

function addToList(name, title) {
    let newListEntry = createElementAndClass('div', 'ml-5');
    newListEntry.innerHTML = `<input type="checkbox" name="${name}" value=""> ${title}`;
    newListEntry.addEventListener('change', strike);
    newListEntry.setAttribute('id', `${name}`);
    TO_DO_LIST.appendChild(newListEntry);
}

function strike(e) {
    // console.log(e.target.checked);
    if (e.target.checked) {
        LIST_OBJ_ARRAY[e.target.attributes[1].value].done = true;
        document.querySelector(`input[name="${e.target.attributes[1].value}"]`).parentElement.className = 'text-success ml-5';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
        // console.log(LIST_OBJ_ARRAY);
        // console.log(e.target.attributes[1].value);
        // target.attributes[1].value
        // alert('checked');
    } else {
        LIST_OBJ_ARRAY[e.target.attributes[1].value].done = false;
        document.querySelector(`input[name="${e.target.attributes[1].value}"]`).parentElement.className = 'text-dark ml-5';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
        // console.log(LIST_OBJ_ARRAY);
        // alert('unchecked');
    }
}

function viewTodoFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        if (LIST_OBJ_ARRAY[i].done) {
            document.getElementById(i).setAttribute('style', 'display: none;');
            // alert(`Item ${i} is hidden`)
        } else {
            document.getElementById(i).setAttribute('style', 'display: block;');
        }
    }
    // TO_DO_LIST.setAttribute('display', 'none');
    // alert('view done');
}

function viewAllFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        document.getElementById(i).setAttribute('style', 'display: block;');
    }
    // alert('view all');
}

function viewDoneFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        if (!(LIST_OBJ_ARRAY[i].done)) {
            document.getElementById(i).setAttribute('style', 'display: none;');
            // alert(`Item ${i} is NOT hidden`)
        } else {
            document.getElementById(i).setAttribute('style', 'display: block;');
        }
    }
    // alert('view todo');
}

function toggleAll() {
    let checkForToggled = true;
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        // If at any point in the array, there is a task NOT done, make false
        if (!(LIST_OBJ_ARRAY[i].done)) {
            checkForToggled = false;
        }
        LIST_OBJ_ARRAY[i].done = true;
        document.querySelector(`input[name="${i}"]`).parentElement.className = 'text-success ml-5';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
        document.querySelector(`input[name="${i}"]`).checked = true;
    }
    if (checkForToggled) {
        for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
            LIST_OBJ_ARRAY[i].done = false;
            document.querySelector(`input[name="${i}"]`).parentElement.className = 'text-dark ml-5';
            localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
            document.querySelector(`input[name="${i}"]`).checked = false;
        }
        // alert('everything was checked');
    }
}

function deleteToggled() {

}






/*

Todo:

---delete button

Strech:
---Add the total num under each row (on mouse over???)
---clean up code -> lost of WET


*/