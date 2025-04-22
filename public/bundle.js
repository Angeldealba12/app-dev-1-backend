/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("var todoForm = document.getElementById('todo-form');\nvar todosList = document.getElementById('todos');\nfunction showTodos() {\n  fetch('http://localhost:5000/api/todos', {\n    // fetch('https://nodejs25.vercel.app/api/todos', {\n    method: 'GET'\n  }).then(function (res) {\n    return res.json();\n  }).then(function (json) {\n    var todos = json.data;\n    todos.forEach(function (todo) {\n      var tr = document.createElement('tr');\n      var col1 = document.createElement('td');\n      col1.textContent = todo.title;\n      tr.appendChild(col1);\n      var col2 = document.createElement('td');\n      col2.textContent = todo.completed;\n      tr.appendChild(col2);\n      var col3 = document.createElement('td');\n      col3.innerHTML = \"<button data-id=\\\"\".concat(todo.id, \"\\\">Mark Completed</button>\");\n      tr.appendChild(col3);\n      todosList.appendChild(tr);\n    });\n  });\n}\ntodoForm.addEventListener('submit', function (event) {\n  event.preventDefault();\n  var newToDo = event.target.firstElementChild.value;\n  var toDo;\n  if (newToDo !== '') {\n    toDo = {\n      title: newToDo\n    };\n    fetch('http://localhost:5000/api/todos', {\n      method: 'POST',\n      body: JSON.stringify(toDo),\n      headers: {\n        'Content-Type': 'application/json; charset=UTF-8'\n      }\n    }).then(function (res) {\n      return console.log(res.json());\n    });\n  }\n});\nwindow.addEventListener('DOMContentLoaded', showTodos);\n\n//# sourceURL=webpack://client/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;