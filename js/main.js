// JS

// GLOBAL VARIABLES
let app = document.getElementById('app');

// Function to render elements
function renderElement(element, classes) {
    let output = document.createElement(element);
    output.className = classes;
    return output;
}

// LOAD APP
function loadApp() {
    // Create Elements
    let container = renderElement('div', 'container-fluid');
    let row = renderElement('div', 'row');

    let leftCol = renderElement('div', 'col-0 col-sm-0 col-md-1 col-lg-2');
    let centerCol = renderElement('div', 'col-12 col-sm-12 col-md-10 col-lg-8 text-center');
    let rightCol = renderElement('div', 'col-0 col-sm-0 col-md-1 col-lg-2');

    // Title
    let title = renderElement('h1', 'my-5 display-4 text-white');
    title.innerHTML = 'To-Do List (Coming Soon)';

    // Append Elements
    centerCol.appendChild(title);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);
    app.appendChild(container);
}