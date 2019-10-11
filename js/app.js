// FUNCTIONS

document.addEventListener('keydown', function (e) {
    // // For testing --> Clears the local storage on key "="
    // if (e.keyCode === 187) {
    //     localStorage.clear();
    //     LIST_OBJ_ARRAY = [];
    //     console.log(window.localStorage);
    // }
    // // For testing --> Displays the local storage and list obj array on "-" key
    // if (e.keyCode === 189) {
    //     console.log('----- Parsed JSON -----');
    //     console.log(JSON.parse(window.localStorage.todoList));
    //     console.log('----- LIST_OBJ_ARRAY -----');
    //     console.log(LIST_OBJ_ARRAY);
    //     console.log(INPUT_BOX.value);
    //     console.log(VIEW_STATE);
    // }
    // "Enter" key
    if (e.keyCode === 13) {
        if (INPUT_BOX.value.trim() !== '') {
            LIST_OBJ_ARRAY.push(new ListObj(LIST_OBJ_ARRAY.length, `${INPUT_BOX.value}`, false));
            localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
            INPUT_BOX.value = '';
            let x = JSON.parse(window.localStorage.todoList);
            addToList(x.length - 1, x[x.length - 1].title);
        }
    }
});

function addToList(name, title) {
    let newListEntry = createElementAndClass('div', 'text-left');
    newListEntry.innerHTML = `<input type="checkbox" name="${name}" value=""> ${title}`;
    newListEntry.addEventListener('change', strike);
    newListEntry.setAttribute('id', `${name}`);
    newListEntry.setAttribute('style', 'word-wrap: break-word;');
    TO_DO_LIST.appendChild(newListEntry);
    if (VIEW_STATE === 'done') {
        newListEntry.setAttribute('style', 'display: none; word-wrap: break-word;');
    }
}

function strike(e) {
    // console.log(e);
    if (e.target.checked) {
        LIST_OBJ_ARRAY[e.target.parentNode.id].done = true;
        document.getElementById(`${e.target.parentNode.id}`).className = 'text-success text-left';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
    } else {
        LIST_OBJ_ARRAY[e.target.parentNode.id].done = false;
        document.getElementById(`${e.target.parentNode.id}`).className = 'text-dark text-left';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
    }
    switch (VIEW_STATE) {
        case 'todo':
            viewTodoFunc();
            break;
        case 'done':
            viewDoneFunc();
    }
}
function viewDoneFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        if (!(LIST_OBJ_ARRAY[i].done)) {
            document.getElementById(i).setAttribute('style', 'display: none; word-wrap: break-word;');
        } else {
            document.getElementById(i).setAttribute('style', 'display: block; word-wrap: break-word;');
        }
    }
    VIEW_STATE = 'done';
}

function viewAllFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        document.getElementById(i).setAttribute('style', 'display: block; word-wrap: break-word;');
    }
    VIEW_STATE = 'all';
}

function viewTodoFunc() {
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        if (LIST_OBJ_ARRAY[i].done) {
            document.getElementById(i).setAttribute('style', 'display: none; word-wrap: break-word;');
        } else {
            document.getElementById(i).setAttribute('style', 'display: block; word-wrap: break-word;');
        }
    }
    VIEW_STATE = 'todo';
}

function toggleAll() {
    let checkForToggled = true;
    for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
        // If at any point in the array, there is a task NOT done, make false
        let x = document.getElementById(i);
        if (!(LIST_OBJ_ARRAY[i].done)) {
            checkForToggled = false;
        }
        LIST_OBJ_ARRAY[i].done = true;
        x.className = 'text-success text-left';
        localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
        x.firstChild.checked = true;
    }
    if (checkForToggled) {
        for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
            let x = document.getElementById(i);
            LIST_OBJ_ARRAY[i].done = false;
            x.className = 'text-dark text-left';
            localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
            x.firstChild.checked = false;
        }
    }
    switch (VIEW_STATE) {
        case 'todo':
            console.log('todo was triggered');
            viewTodoFunc();
            break;
        case 'done':
            console.log('done was triggered');
            viewDoneFunc();
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
            LIST_OBJ_ARRAY[i - j].id = i - j;
            document.getElementById(i).setAttribute('id', `${i - j}`);
        }
    }
    localStorage.setItem(`todoList`, JSON.stringify(LIST_OBJ_ARRAY));
}

function showCount() {
    if (localStorage.length > 0) {
        let doneNum = 0, notDoneNum = 0;
        for (let i = 0; i < LIST_OBJ_ARRAY.length; i++) {
            LIST_OBJ_ARRAY[i].done ? doneNum++ : notDoneNum++;
        }
        document.getElementById('viewDone').innerHTML = `${doneNum}`;
        document.getElementById('viewAll').innerHTML = `${LIST_OBJ_ARRAY.length}`;
        document.getElementById('viewTodo').innerHTML = `${notDoneNum}`;
    }
}

function hideCount() {
    if (localStorage.length > 0) {
        document.getElementById('viewDone').innerHTML = `&#10004;`;
        document.getElementById('viewAll').innerHTML = `ALL`;
        document.getElementById('viewTodo').innerHTML = `&#10006;`;
    }
}
/*

Todo:

Stretch:
---clean up code
---Make line-breaks inline with checkbox -> could use bootstrap input-group
---Add README
---soft delete/archive
*/


// function viewToggle(x) {
//     for (let i = 0; i < JSON.parse(window.localStorage.todoList).length; i++) {
//         switch (x) {
//             case true:
//                 document.getElementById(i).setAttribute('style', 'display: block;');
//             case false:
//                 document.getElementById(i).setAttribute('style', 'display: none;');
//         }
//     }
// }