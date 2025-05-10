import './css/style.css';

const apiUrl = 'https://app-dev-1-backend.onrender.com/api/todos/';

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

function hideLoadingSpinner() {
    setTimeout(() => {
        loadSpinner.style.opacity = '0';
        loadSpinner.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            loadSpinner.style.display = 'none';
        }, 500);
    }, 1000);
}

// Button and Icon
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

// Add Item to DOM
function createListItem(item) {
    let listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(item[0]));
    listItem.setAttribute('data-id', item[1]);
    const button = createButton('red', 'circle-xmark', 'remove-item');
    listItem.appendChild(button);
    itemList.appendChild(listItem);
}

// Load from DB
function getItemsFromStorage() {
    let listItemsArr = [];
    fetch(apiUrl, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => {
            const todos = json.data;
            todos.forEach(todo => {
                listItemsArr.push([todo.title, todo._id]);
            });
        })
        .then(() => {
            listItemsArr.forEach(item => {
                createListItem(item);
            });
        })
        .then(() => {
            hideLoadingSpinner();
            hideBtnSpinner();
        });
}

// Add item to DB + DOM
function storeListItem(itemName) {
    if (itemName !== "") {
        // ✅ Prevent duplicate
        const existingItems = document.querySelectorAll('#item-list li');
        const lowerCaseNew = itemName.trim().toLowerCase();
        for (let item of existingItems) {
            const text = item.childNodes[0]?.textContent?.trim().toLowerCase();
            if (text === lowerCaseNew) {
                alert("This item already exists!");
                return;
            }
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ title: itemName })
        })
            .then(res => res.json())
            .then(json => {
                console.log("Added Todo:", json);
                if (json.success) {
                    const newTodo = json.data;
                    createListItem([newTodo.title, newTodo._id]);
                } else {
                    alert(json.message || "Failed to add todo.");
                }
            })
            .catch(err => {
                console.error("Error while adding todo:", err);
                alert("Something went wrong.");
            })
            .finally(() => {
                hideBtnSpinner();
            });
    }
}

function setUp() {
    itemList.innerHTML = '';
    getItemsFromStorage();
}


function updateItem(item) {
    itemInput.value = item.textContent;
    itemFormBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    itemFormBtn.style.backgroundColor = '#228B22';
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
}

function inEditMode() {
    return [...itemList.querySelectorAll('li')].some(i => i.classList.contains('edit-mode'));
}

function updateListItem(itemName) {
    const listItems = itemList.querySelectorAll('li');
    for (let currentItem of listItems) {
        if (currentItem.classList.contains('edit-mode')) {
            const id = currentItem.getAttribute('data-id');
            const toDo = { _id: id, title: itemName, userId: 1, completed: false };

            fetch(apiUrl + id, {
                method: 'PUT',
                body: JSON.stringify(toDo),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        currentItem.textContent = "";
                        currentItem.appendChild(document.createTextNode(itemName));
                        const button = createButton('red', 'circle-xmark', 'remove-item');
                        currentItem.appendChild(button);
                        turnOffEdit(currentItem);
                    }
                })
                .finally(() => hideBtnSpinner());

            break;
        }
    }
}

function turnOffEdit(item) {
    itemInput.value = "";
    itemFormBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    itemFormBtn.style.backgroundColor = '#333';
    item.classList.remove('edit-mode');
}

// === EVENT LISTENERS ===
window.addEventListener('DOMContentLoaded', setUp);

itemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showBtnSpinner();
    const inputItemValue = itemInput.value.trim();
    if (inputItemValue !== '') {
        if (!inEditMode()) {
            storeListItem(inputItemValue);
        } else {
            updateListItem(inputItemValue);
        }
        itemInput.value = '';
    }
});

itemList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        if (event.target.classList.contains('edit-mode')) {
            turnOffEdit(event.target);
        } else {
            updateItem(event.target);
        }
    } else if (event.target.parentElement.classList.contains('remove-item')) {
        const li = event.target.closest('li');
        const id = li.getAttribute('data-id');

        fetch(apiUrl + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    li.remove();
                } else {
                    alert("Failed to delete item.");
                }
            })
            .catch(err => {
                console.error("Delete error:", err);
            });
    }
});


clearBtn.addEventListener('click', function(event) {
    let confirmClear = confirm('Are you sure you want to clear the list?');
    if (confirmClear) {
        fetch(apiUrl, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    itemList.innerHTML = '';
                } else {
                    alert("Failed to clear items.");
                }
            })
            .catch(err => {
                console.error("Clear all error:", err);
                alert("Something went wrong while clearing.");
            });
    }
});

// 🔍 FILTER
filter.addEventListener('input', (event) => {
    let value = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll('#item-list li');
    listItems.forEach(item => {
        const text = item.childNodes[0]?.textContent?.toLowerCase();
        if (text.includes(value)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
