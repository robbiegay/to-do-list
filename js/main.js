// PAGE RENDER & GLOBAL VARIABLES

// GLOBAL VARIABLES
let LIST_OBJ_ARRAY = [];
let APP = document.getElementById('app');
let INPUT_BOX = createElementAndClass('input', 'm-2 text-dark');
let TO_DO_LIST = createElementAndClass('div', 'm-2 text-dark');

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
    // ---------- CREATE ELEMENTS ----------
    let container = createElementAndClass('div', 'container-fluid');
    let row = createElementAndClass('div', 'row');

    // Columns
    let leftCol = createElementAndClass('div', 'col-0 col-sm-0 col-md-1 col-lg-2');
    let centerCol = createElementAndClass('div', 'col-12 col-sm-12 col-md-10 col-lg-8 text-center');
    let rightCol = createElementAndClass('div', 'col-0 col-sm-0 col-md-1 col-lg-2');

    // Title
    let title = createElementAndClass('h1', 'mt-5 display-4 text-dark');
    title.innerHTML = 'to-do';
    
    // Inner App
    let appRow = createElementAndClass('div', 'row');

    let innerLeftCol = createElementAndClass('div', 'col-0 col-sm-0 col-md-1 col-lg-2');
    let innerCenterCol = createElementAndClass('div', 'col-12 col-sm-12 col-md-10 col-lg-8');
    let innerRightCol = createElementAndClass('div', 'col-0 col-sm-0 col-md-1 col-lg-2');

    // Input Box
    INPUT_BOX.autofocus = true;
    INPUT_BOX.setAttribute('type', 'text');
    INPUT_BOX.setAttribute('style', 'width: 100%;');
    INPUT_BOX.setAttribute('placeholder', 'What needs to get done?');
    INPUT_BOX.setAttribute('id', 'listItemInputBox');

    // Selection Buttons
    let selectionBtns = createElementAndClass('div', 'btn-group pt-2');
    selectionBtns.setAttribute('style', 'min-width: 265px;');
    selectionBtns.setAttribute('role', 'group');
    selectionBtns.setAttribute('aria-label', 'Selection Buttons');
    selectionBtns.innerHTML = '<button id="viewDone" type="button" class="btn btn-success">&#10004;</button><button id="viewAll" type="button" class="btn btn-secondary">ALL</button><button id="viewTodo" type="button" class="btn btn-danger">&#10006;</button>';

    // Toggle and Delete Buttons
    let toggleBtns = createElementAndClass('div', 'btn-group p-1'); //  btn-group-sm
    toggleBtns.setAttribute('style', 'display: block;');
    toggleBtns.setAttribute('role', 'group');
    toggleBtns.setAttribute('aria-label', 'Selection Buttons');
    toggleBtns.innerHTML = '<button id="toggleAll" type="button" class="btn btn-primary">&#128280;</button><button id="delete" type="button" class="btn btn-primary">&#128163;</button>';

    // ---------- APPEND ELEMENTS ----------
    // centerCol.appendChild(title);
    // centerCol.appendChild(INPUT_BOX);
    // centerCol.appendChild(TO_DO_LIST);
    // centerCol.appendChild(selectionBtns);
    // centerCol.appendChild(toggleBtns);
    
    innerCenterCol.appendChild(INPUT_BOX);
    innerCenterCol.appendChild(TO_DO_LIST);

    // appRow.appendChild(title);
    appRow.appendChild(innerLeftCol);
    appRow.appendChild(innerCenterCol);
    appRow.appendChild(innerRightCol);
    // appRow.appendChild(selectionBtns);
    // appRow.appendChild(toggleBtns);

    centerCol.appendChild(title);
    // centerCol.appendChild(INPUT_BOX);
    centerCol.appendChild(appRow);
    centerCol.appendChild(selectionBtns);
    centerCol.appendChild(toggleBtns);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);
    APP.appendChild(container);

    // On page load --> If there is data in local storage, populate array
    if (localStorage.length > 0) {
        for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
            let parsedJSON = JSON.parse(window.localStorage.todoList)[`${i}`];
            LIST_OBJ_ARRAY.push(new ListObj(i, parsedJSON.title, parsedJSON.done));
            addToList(i, JSON.parse(window.localStorage.todoList)[i].title);
            if (LIST_OBJ_ARRAY[i].done) {
                let x = document.querySelector(`input[name="${i}"]`);
                x.parentElement.className = 'text-success text-left';
                x.checked = true;
            }
        }
    }

    // Add Event Listeners
    document.getElementById('viewDone').addEventListener('click', viewDoneFunc);
    document.getElementById('viewAll').addEventListener('click', viewAllFunc);
    document.getElementById('viewTodo').addEventListener('click', viewTodoFunc);
    document.getElementById('toggleAll').addEventListener('click', toggleAll);
    document.getElementById('delete').addEventListener('click', deleteToggled);
    selectionBtns.addEventListener('mouseover', showCount);
    selectionBtns.addEventListener('mouseout', hideCount);
}