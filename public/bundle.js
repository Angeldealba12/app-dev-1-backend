/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://client/./src/css/style.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\n\nvar apiUrl = '';\nif (location.protocol === 'https:') {\n  apiUrl = 'https://nodejs25.vercel.app/api/todos/';\n} else {\n  apiUrl = 'http://localhost:5000/api/todos/';\n}\nvar itemForm = document.getElementById('item-form');\nvar itemFormBtn = document.querySelector('#item-form button');\nvar itemInput = document.getElementById('item-input');\nvar itemList = document.getElementById('item-list');\nvar clearBtn = document.getElementById('clear');\nvar filter = document.getElementById('filter');\nvar loadSpinner = document.getElementById('spinner-container');\nfunction showBtnSpinner() {\n  itemFormBtn.innerHTML = '<i class=\"fa fa-spinner fa-spin\"></i> Please wait...';\n}\nfunction hideBtnSpinner() {\n  setTimeout(function () {\n    itemFormBtn.innerHTML = '<i class=\"fa-solid fa-plus\"></i> Add Todo';\n  }, 800);\n}\nfunction showSpinner() {}\nfunction hideLoadingSpinner() {\n  setTimeout(function () {\n    loadSpinner.style.opacity = '0'; // This will hide the spinner\n    loadSpinner.style.transition = 'opacity 0.5s'; // Fade out in half of a second\n    setTimeout(function () {\n      loadSpinner.style.display = 'none';\n    }, 500); // 500 milliseconds is 0.5 sec, needed to match the opacity fading\n  }, 1000); // 1000 milliseconds is 1 second, add a short delay so the animation isn't so abrupt\n}\n\n// Start create button functionality\nfunction createButton() {\n  var textColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'black';\n  var iconName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n  var button = document.createElement('button');\n  button.className = \"btn-link text-\".concat(textColor);\n  for (var _len = arguments.length, classes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    classes[_key - 2] = arguments[_key];\n  }\n  classes.forEach(function (c) {\n    return button.classList.add(c);\n  });\n  if (iconName !== '') {\n    var icon = createIcon(iconName);\n    button.appendChild(icon);\n  }\n  return button;\n}\nfunction createIcon(iconName) {\n  var icon = document.createElement('i');\n  icon.className = \"fa-solid fa-\".concat(iconName);\n  return icon;\n}\nfunction createListItem(item) {\n  var listItem = document.createElement('li');\n  listItem.appendChild(document.createTextNode(item[0]));\n  listItem.setAttribute('data-id', item[1]);\n  var button = createButton('red', 'circle-xmark', 'remove-item');\n  listItem.appendChild(button);\n  itemList.appendChild(listItem);\n}\n// End create button functionality\n\n// Start localStorage functionality\nfunction getItemsFromStorage() {\n  var listItemsArr = [];\n  fetch(apiUrl, {\n    method: 'GET'\n  }).then(function (res) {\n    return res.json();\n  }).then(function (json) {\n    var todos = json.data;\n    todos.forEach(function (todo) {\n      var title = todo.title;\n      var id = todo._id;\n      listItemsArr.push([title, id]);\n    });\n  }).then(function () {\n    // listItemsArr is a Two-dimensional array\n    // item is an array\n    listItemsArr.forEach(function (item) {\n      createListItem(item);\n    });\n  }).then(function () {\n    hideLoadingSpinner();\n    hideBtnSpinner();\n  });\n}\nfunction storeListItem(itemName) {\n  if (itemName !== \"\") {\n    fetch(apiUrl, {\n      method: 'POST',\n      body: JSON.stringify({\n        title: itemName\n      }),\n      headers: {\n        'Content-Type': 'application/json; charset=UTF-8'\n      }\n    }).then(function (res) {\n      return res.json();\n    }).then(function (json) {\n      if (json.success) {\n        // Courtesy of Edward\n        var newTodo = json.data;\n        createListItem([newTodo.title, newTodo._id]);\n      }\n    }).then(function () {\n      hideBtnSpinner();\n    });\n  }\n}\nfunction setUp() {\n  itemList.innerHTML = '';\n  getItemsFromStorage();\n}\nfunction clearStorage() {\n  localStorage.removeItem('items');\n}\n// End localStorage functionality\n\n// Start Update/Delete functionality\nfunction updateItem(item) {\n  // Step 1: place the item's text in the form's input field\n  itemInput.value = item.textContent;\n  // Step 2: Change the Add button to an Update button\n  itemFormBtn.innerHTML = '<i class=\"fa-solid fa-pen\"></i> Update Item';\n  itemFormBtn.style.backgroundColor = '#228B22';\n  // Step 3: Change the style of all buttons except the one that was clicked\n  itemList.querySelectorAll('li').forEach(function (i) {\n    return i.classList.remove('edit-mode');\n  });\n  item.classList.add('edit-mode');\n}\nfunction inEditMode() {\n  var editMode = false;\n  var listItems = itemList.querySelectorAll('li');\n  for (var i = 0; i < listItems.length; i++) {\n    if (listItems[i].classList.contains('edit-mode')) {\n      editMode = true;\n      break;\n    }\n  }\n  return editMode;\n}\nfunction updateListItem(itemName) {\n  var listItems = itemList.querySelectorAll('li');\n  var _loop = function _loop() {\n    var currentItem = listItems[i];\n    if (currentItem.classList.contains('edit-mode')) {\n      var id = currentItem.getAttribute('data-id');\n      // Todo: validate the id\n      var toDo = {\n        _id: id,\n        title: itemName,\n        userId: 1,\n        completed: false\n      };\n      fetch(apiUrl + id, {\n        method: 'PUT',\n        body: JSON.stringify(toDo),\n        headers: {\n          'Content-Type': 'application/json; charset=UTF-8'\n        }\n      }).then(function (res) {\n        return res.json();\n      }).then(function (json) {\n        if (json.success) {\n          currentItem.textContent = \"\";\n          currentItem.appendChild(document.createTextNode(itemName));\n          var button = createButton('red', 'circle-xmark', 'remove-item');\n          currentItem.appendChild(button);\n          turnOffEdit(currentItem);\n        }\n      }).then(function () {\n        hideBtnSpinner();\n      });\n      return 1; // break\n    }\n  };\n  for (var i = 0; i < listItems.length; i++) {\n    if (_loop()) break;\n  }\n}\nfunction turnOffEdit(item) {\n  // Step 1: remove the text in the form's input field\n  itemInput.value = \"\";\n  // Step 2: Change the Update button to an Add button\n  itemFormBtn.innerHTML = '<i class=\"fa-solid fa-plus\"></i> Add Item';\n  itemFormBtn.style.backgroundColor = '#333';\n  // Step 3: Change the style of all buttons except the one that was clicked\n  item.classList.remove('edit-mode');\n}\n\n// End Update/Delete functionality\n\n// Start Event Listeners\nwindow.addEventListener('DOMContentLoaded', setUp);\nitemForm.addEventListener('submit', function (event) {\n  event.preventDefault();\n  showBtnSpinner();\n  var editMode = inEditMode();\n  var inputItemValue = itemInput.value;\n  if (inputItemValue !== '') {\n    if (!editMode) {\n      // Adding a new item\n      storeListItem(inputItemValue);\n      itemInput.value = '';\n    } else {\n      // Edit an existing item\n      updateListItem(inputItemValue);\n    }\n  }\n});\nitemList.addEventListener('click', function (event) {\n  if (event.target.tagName === 'LI') {\n    // console.log(\"You clicked the list item\");\n    if (event.target.classList.contains('edit-mode')) {\n      // Turn off edit mode\n      turnOffEdit(event.target);\n    } else {\n      // Turn on edit mode\n      updateItem(event.target);\n    }\n  } else if (event.target.parentElement.classList.contains('remove-item')) {\n    // console.log(\"You clicked the delete button\");\n    // This is your homework\n    // Hint: Target the li, which is the parent of the button, which is the parent of the icon\n  }\n});\nclearBtn.addEventListener('click', function (event) {\n  var confirmClear = confirm('Are you sure you want to clear the list?');\n  if (confirmClear) {\n    itemList.innerHTML = '';\n    clearStorage();\n  }\n});\n// These events didn't work: change, keydown, keypress\nfilter.addEventListener('input', function (event) {\n  var value = event.target.value;\n  var listItemsArr = getItemsFromStorage();\n  var filteredItems = listItemsArr.filter(function (item) {\n    return item.toLowerCase().includes(value.toLowerCase());\n  });\n  itemList.innerHTML = '';\n  filteredItems.forEach(function (item) {\n    createListItem(item);\n  });\n});\n// End Event Listeners\n\n// ****************************************\n// *      Start Code from February 27     *\n// ****************************************\n// listItems[0].style.backgroundColor = 'yellow';\n// listItems[1].style.backgroundColor = 'orange';\n// listItems.forEach((el) => el.style.color = 'red');\n//\n// const mainHeading = document.getElementById('main-heading');\n// mainHeading.textContent = \"Marc's Shopping List\"\n// mainHeading.style.color = 'yellow';\n// mainHeading.style.backgroundColor = 'dodgerblue';\n// mainHeading.style.padding = '0 20px';\n// mainHeading.style.borderRadius = '20px';\n// ****************************************\n// *      End Code from February 27       *\n// ****************************************\n\n//# sourceURL=webpack://client/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;