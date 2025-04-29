import './css/style.css';

let apiUrl = '';
if(location.protocol === 'https:') {
    apiUrl = 'https://app-dev-1-backend.vercel.app/api/todos';
} else {
    apiUrl = 'http://localhost:5000/api/todos/'
}

const itemForm = document.getElementById('item-form');
const itemFormBtn = document.querySelector('#item-form button');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
const loadSpinner = document.getElementById('spinner-container');

function showBtnSpinner() {
    itemFormBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Please wait...';
}

function hideBtnSpinner() {
    setTimeout(() => {
        itemFormBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Todo';
    }, 800);
}

function showSpinner() {

}

function hideLoadingSpinner() {
    setTimeout(() => {
        loadSpinner.style.opacity = '0'; // This will hide the spinner
        loadSpinner.style.transition = 'opacity 0.5s'; // Fade out in half of a second
        setTimeout(() => {
            loadSpinner.style.display = 'none';
        }, 500); // 500 milliseconds is 0.5 sec, needed to match the opacity fading
    }, 1000); // 1000 milliseconds is 1 second, add a short delay so the animation isn't so abrupt
}

// Start create button functionality
function createButton(textColor = 'black', iconName = '', ...classes) {
    const button = document.createElement('button');
    button.className = `btn-link text-${textColor}`;
    classes.forEach(c => button.classList.add(c));
    if(iconName !== '') {
        const icon = createIcon(iconName);
        button.appendChild(icon);
    }
    return button;
}
function createIcon(iconName) {
    const icon = document.createElement('i');
    icon.className = `fa-solid fa-${iconName}`;
    return icon;
}
function createListItem(item) {
    let listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(item[0]));
    listItem.setAttribute('data-id', item[1]);
    const button = createButton('red', 'circle-xmark', 'remove-item');
    listItem.appendChild(button);
    itemList.appendChild(listItem);
}
// End create button functionality

// Start localStorage functionality
function getItemsFromStorage() {
    let listItemsArr = [];
    fetch(apiUrl, {
        method: 'GET'
    }).then(res => res.json())
        .then(json => {
            const todos = json.data;
            todos.forEach(todo => {
                const title = todo.title;
                const id = todo._id;
                listItemsArr.push([title, id]);
            })
        })
        .then(function() {
            // listItemsArr is a Two-dimensional array
            // item is an array
            listItemsArr.forEach(item => {
                createListItem(item);
            });
        })
        .then(function() {
            hideLoadingSpinner();
            hideBtnSpinner();
        });
}

function storeListItem(itemName) {
    if(itemName !== "") {
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({title: itemName}),
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).then(res => {
            return res.json();
        })
            .then(json => {
                if(json.success) {
                    // Courtesy of Edward
                    const newTodo = json.data;
                    createListItem([newTodo.title, newTodo._id]);
                }
            })
            .then(function() {
                hideBtnSpinner();
            });
    }
}
function setUp() {
    itemList.innerHTML = '';
    getItemsFromStorage();
}
function clearStorage() {
    localStorage.removeItem('items');
}
// End localStorage functionality

// Start Update/Delete functionality
function updateItem(item) {
    // Step 1: place the item's text in the form's input field
    itemInput.value = item.textContent;
    // Step 2: Change the Add button to an Update button
    itemFormBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    itemFormBtn.style.backgroundColor = '#228B22';
    // Step 3: Change the style of all buttons except the one that was clicked
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
}
function inEditMode() {
    let editMode = false;
    const listItems = itemList.querySelectorAll('li');
    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].classList.contains('edit-mode')) {
            editMode = true;
            break;
        }
    }
    return editMode;
}
function updateListItem(itemName) {
    const listItems = itemList.querySelectorAll('li');
    for (let i = 0; i < listItems.length; i++) {
        let currentItem = listItems[i];
        if(currentItem.classList.contains('edit-mode')) {
            const id = currentItem.getAttribute('data-id');
            // Todo: validate the id
            const toDo = {_id: id, title: itemName, userId: 1, completed: false};
            fetch(apiUrl + id, {
                method: 'PUT',
                body: JSON.stringify(toDo),
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).then(res => {
                return res.json();
            })
                .then(json => {
                    if(json.success) {
                        currentItem.textContent = "";
                        currentItem.appendChild(document.createTextNode(itemName));
                        const button = createButton('red', 'circle-xmark', 'remove-item');
                        currentItem.appendChild(button);
                        turnOffEdit(currentItem);
                    }
                })
                .then(function() {
                    hideBtnSpinner();
                });
            break;
        }
    }
}
function turnOffEdit(item) {
    // Step 1: remove the text in the form's input field
    itemInput.value = "";
    // Step 2: Change the Update button to an Add button
    itemFormBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    itemFormBtn.style.backgroundColor = '#333';
    // Step 3: Change the style of all buttons except the one that was clicked
    item.classList.remove('edit-mode');
}

// End Update/Delete functionality

// Start Event Listeners
window.addEventListener('DOMContentLoaded', setUp);
itemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showBtnSpinner();
    let editMode = inEditMode();
    let inputItemValue = itemInput.value;
    if(inputItemValue !== '') {
        if (!editMode) {
            // Adding a new item
            storeListItem(inputItemValue);
            itemInput.value = '';
        } else {
            // Edit an existing item
            updateListItem(inputItemValue);
        }
    }
})
itemList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        // console.log("You clicked the list item");
        if(event.target.classList.contains('edit-mode')) {
            // Turn off edit mode
            turnOffEdit(event.target);
        } else {
            // Turn on edit mode
            updateItem(event.target);
        }
    } else if(event.target.parentElement.classList.contains('remove-item')) {
        // console.log("You clicked the delete button");
        // This is your homework
        // Hint: Target the li, which is the parent of the button, which is the parent of the icon
    }
});
clearBtn.addEventListener('click', function(event) {
    let confirmClear = confirm('Are you sure you want to clear the list?');
    if (confirmClear) {
        itemList.innerHTML = '';
        clearStorage();
    }
});
// These events didn't work: change, keydown, keypress
filter.addEventListener('input', (event) => {
    let value = event.target.value;
    const listItemsArr = getItemsFromStorage();
    const filteredItems = listItemsArr.filter(item =>  item.toLowerCase().includes(value.toLowerCase()));
    itemList.innerHTML = '';
    filteredItems.forEach(item => {createListItem(item)});
});
// End Event Listeners

// ****************************************
// *      Start Code from February 27     *
// ****************************************
// listItems[0].style.backgroundColor = 'yellow';
// listItems[1].style.backgroundColor = 'orange';
// listItems.forEach((el) => el.style.color = 'red');
//
// const mainHeading = document.getElementById('main-heading');
// mainHeading.textContent = "Marc's Shopping List"
// mainHeading.style.color = 'yellow';
// mainHeading.style.backgroundColor = 'dodgerblue';
// mainHeading.style.padding = '0 20px';
// mainHeading.style.borderRadius = '20px';
// ****************************************
// *      End Code from February 27       *
// ****************************************

