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

    // To-do List
    // TO_DO_LIST.setAttribute('style', 'display: none;');

    // Append Elements
    centerCol.appendChild(title);
    centerCol.appendChild(INPUT_BOX);
    centerCol.appendChild(TO_DO_LIST);

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
                document.querySelector(`input[name="${i}"]`).parentElement.className = 'text-danger';
            }
        }
    }
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
    }
    // "Enter" key
    if (e.keyCode === 13) {
        LIST_OBJ_ARRAY.push(new ListObj(LIST_OBJ_ARRAY.length, `${INPUT_BOX.value}`, false));
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
        INPUT_BOX.value = '';
        let todoParsed = JSON.parse(window.localStorage.todoList);
        addToList(todoParsed.length - 1, todoParsed[todoParsed.length - 1].title);
    }
});

function makeBtnsVisible() {
    // Make the buttons visible
}

function addToList(name, title) {
    let newListEntry = createElementAndClass('div', '');
    newListEntry.innerHTML = `<input type="checkbox" name="${name}" value=""> ${title}`;
    newListEntry.addEventListener('change', strike);
    TO_DO_LIST.appendChild(newListEntry);
}

function strike(e) {
    // console.log(e.target.checked);
    if (e.target.checked) {
        LIST_OBJ_ARRAY[e.target.attributes[1].value].done = true;
        document.querySelector(`input[name="${e.target.attributes[1].value}"]`).parentElement.className = 'text-danger';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
        // console.log(LIST_OBJ_ARRAY);
        // console.log(e.target.attributes[1].value);
        // target.attributes[1].value
        // alert('checked');
    } else {
        LIST_OBJ_ARRAY[e.target.attributes[1].value].done = false;
        document.querySelector(`input[name="${e.target.attributes[1].value}"]`).parentElement.className = 'text-dark';
        // console.log(LIST_OBJ_ARRAY);
        // alert('unchecked');
    }
}