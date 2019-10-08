// JS

// GLOBAL VARIABLES
let LIST_OBJ_ARRAY = [];
let APP = document.getElementById('app');
let INPUT_BOX = createElementAndClass('input', 'm-2 text-dark col-10');

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
    title.innerHTML = 'to-dos';

    // Input Box
    INPUT_BOX.autofocus = true;
    INPUT_BOX.setAttribute('type', 'text');
    INPUT_BOX.setAttribute('placeholder', 'What needs to get done?');
    INPUT_BOX.setAttribute('id', 'listItemInputBox');
    // INPUT_BOX.type('text');
    // INPUT_BOX.value('What needs to get done?');

    // Append Elements
    centerCol.appendChild(title);
    centerCol.appendChild(INPUT_BOX);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);
    APP.appendChild(container);

    // When the page loads, if there is already values in the object array, populate the array
    if (localStorage.length > 0) {
        populateObjArray();
    }
}

// FUNCTIONS
// INPUT_BOX.addEventListener(onchange, makeBtnsVisible);

document.addEventListener('keydown', function(e) {
    // For testing --> Clears the local storage on key "="
    if (e.keyCode === 187) {
        localStorage.clear();
        console.log(window.localStorage);
    }
    if (e.keyCode === 13) {
        localStorage.setItem(`listItem${localStorage.length}`, `${INPUT_BOX.value}`);
        console.log(window.localStorage);
        addToObjArray();
        console.log(LIST_OBJ_ARRAY);
    }
});

function makeBtnsVisible() {
    // Make the buttons visible
}

function populateObjArray() {
    for (let i = 0; i < localStorage.length; i++) {
        LIST_OBJ_ARRAY.push(new ListObj (i, localStorage.getItem(`listItem${i}`), false));
    }
}

function addToObjArray() {
    LIST_OBJ_ARRAY.push(new ListObj ((localStorage.length - 1), `${INPUT_BOX.value}`, false));
}