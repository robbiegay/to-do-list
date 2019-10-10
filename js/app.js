// FUNCTIONS

document.addEventListener('keydown', function(e) {
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

// function makeBtnsVisible() {
//     // Make the buttons visible
// }

function addToList(name, title) {
    let newListEntry = createElementAndClass('div', 'ml-5');
    newListEntry.innerHTML = `<input type="checkbox" name="${name}" value=""> ${title}`;
    newListEntry.addEventListener('change', strike);
    newListEntry.setAttribute('id', `${name}`);
    TO_DO_LIST.appendChild(newListEntry);
}

function strike(e) {
    console.log(e);
    if (e.target.checked) {
        LIST_OBJ_ARRAY[e.target.parentNode.id].done = true;
        document.getElementById(`${e.target.parentNode.id}`).className = 'text-success ml-5';
        // document.querySelector(`input[name="${e.target.parentNode.id}"]`).parentElement.className = 'text-success ml-5';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
    } else {
        LIST_OBJ_ARRAY[e.target.parentNode.id].done = false;
        document.getElementById(`${e.target.parentNode.id}`).className = 'text-dark ml-5';
        // document.querySelector(`input[name="${e.target.parentNode.id}"]`).parentElement.className = 'text-dark ml-5';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
    }
}

function viewTodoFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        if (LIST_OBJ_ARRAY[i].done) {
            document.getElementById(i).setAttribute('style', 'display: none;');
        } else {
            document.getElementById(i).setAttribute('style', 'display: block;');
        }
    }
}

function viewAllFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        document.getElementById(i).setAttribute('style', 'display: block;');
    }
}

function viewDoneFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        if (!(LIST_OBJ_ARRAY[i].done)) {
            document.getElementById(i).setAttribute('style', 'display: none;');
        } else {
            document.getElementById(i).setAttribute('style', 'display: block;');
        }
    }
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
    }
}

function deleteToggled() {
    let j = 0;
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        if (LIST_OBJ_ARRAY[i - j].done) {
            document.getElementById(i).remove();
            LIST_OBJ_ARRAY.splice(`${i - j}`, 1);
            j++;
        } else {
            LIST_OBJ_ARRAY[i -j].id = i -j;
            document.getElementById(i).setAttribute('id', `${i - j}`);
        }
    }
    localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
}

/*

Todo:

---delete button -> e.target...value isn't reseting

Strech:
---Add the total num under each row (on mouse over???)
---clean up code -> lots of WET


*/