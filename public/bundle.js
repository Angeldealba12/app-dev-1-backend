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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t[\"return\"] || t[\"return\"](); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n\nvar apiUrl = '';\nif (location.protocol === 'https:') {\n  apiUrl = 'https://app-dev-1-backend.vercel.app/api/todos/';\n} else {\n  apiUrl = 'http://localhost:5000/api/todos/';\n}\nvar itemForm = document.getElementById('item-form');\nvar itemFormBtn = document.querySelector('#item-form button');\nvar itemInput = document.getElementById('item-input');\nvar itemList = document.getElementById('item-list');\nvar clearBtn = document.getElementById('clear');\nvar filter = document.getElementById('filter');\nvar loadSpinner = document.getElementById('spinner-container');\nfunction showBtnSpinner() {\n  itemFormBtn.innerHTML = '<i class=\"fa fa-spinner fa-spin\"></i> Please wait...';\n}\nfunction hideBtnSpinner() {\n  setTimeout(function () {\n    itemFormBtn.innerHTML = '<i class=\"fa-solid fa-plus\"></i> Add Todo';\n  }, 800);\n}\nfunction hideLoadingSpinner() {\n  setTimeout(function () {\n    loadSpinner.style.opacity = '0';\n    loadSpinner.style.transition = 'opacity 0.5s';\n    setTimeout(function () {\n      loadSpinner.style.display = 'none';\n    }, 500);\n  }, 1000);\n}\n\n// Button and Icon\nfunction createButton() {\n  var textColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'black';\n  var iconName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n  var button = document.createElement('button');\n  button.className = \"btn-link text-\".concat(textColor);\n  for (var _len = arguments.length, classes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    classes[_key - 2] = arguments[_key];\n  }\n  classes.forEach(function (c) {\n    return button.classList.add(c);\n  });\n  if (iconName !== '') {\n    var icon = createIcon(iconName);\n    button.appendChild(icon);\n  }\n  return button;\n}\nfunction createIcon(iconName) {\n  var icon = document.createElement('i');\n  icon.className = \"fa-solid fa-\".concat(iconName);\n  return icon;\n}\n\n// Add Item to DOM\nfunction createListItem(item) {\n  var listItem = document.createElement('li');\n  listItem.appendChild(document.createTextNode(item[0]));\n  listItem.setAttribute('data-id', item[1]);\n  var button = createButton('red', 'circle-xmark', 'remove-item');\n  listItem.appendChild(button);\n  itemList.appendChild(listItem);\n}\n\n// Load from DB\nfunction getItemsFromStorage() {\n  var listItemsArr = [];\n  fetch(apiUrl, {\n    method: 'GET'\n  }).then(function (res) {\n    return res.json();\n  }).then(function (json) {\n    var todos = json.data;\n    todos.forEach(function (todo) {\n      listItemsArr.push([todo.title, todo._id]);\n    });\n  }).then(function () {\n    listItemsArr.forEach(function (item) {\n      createListItem(item);\n    });\n  }).then(function () {\n    hideLoadingSpinner();\n    hideBtnSpinner();\n  });\n}\n\n// Add item to DB + DOM\nfunction storeListItem(itemName) {\n  if (itemName !== \"\") {\n    // ✅ Prevent duplicate\n    var existingItems = document.querySelectorAll('#item-list li');\n    var lowerCaseNew = itemName.trim().toLowerCase();\n    var _iterator = _createForOfIteratorHelper(existingItems),\n      _step;\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var _item$childNodes$;\n        var item = _step.value;\n        var text = (_item$childNodes$ = item.childNodes[0]) === null || _item$childNodes$ === void 0 || (_item$childNodes$ = _item$childNodes$.textContent) === null || _item$childNodes$ === void 0 ? void 0 : _item$childNodes$.trim().toLowerCase();\n        if (text === lowerCaseNew) {\n          alert(\"This item already exists!\");\n          return;\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n    fetch(apiUrl, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json; charset=UTF-8'\n      },\n      body: JSON.stringify({\n        title: itemName\n      })\n    }).then(function (res) {\n      return res.json();\n    }).then(function (json) {\n      console.log(\"Added Todo:\", json);\n      if (json.success) {\n        var newTodo = json.data;\n        createListItem([newTodo.title, newTodo._id]);\n      } else {\n        alert(json.message || \"Failed to add todo.\");\n      }\n    })[\"catch\"](function (err) {\n      console.error(\"Error while adding todo:\", err);\n      alert(\"Something went wrong.\");\n    })[\"finally\"](function () {\n      hideBtnSpinner();\n    });\n  }\n}\nfunction setUp() {\n  itemList.innerHTML = '';\n  getItemsFromStorage();\n}\nfunction updateItem(item) {\n  itemInput.value = item.textContent;\n  itemFormBtn.innerHTML = '<i class=\"fa-solid fa-pen\"></i> Update Item';\n  itemFormBtn.style.backgroundColor = '#228B22';\n  itemList.querySelectorAll('li').forEach(function (i) {\n    return i.classList.remove('edit-mode');\n  });\n  item.classList.add('edit-mode');\n}\nfunction inEditMode() {\n  return _toConsumableArray(itemList.querySelectorAll('li')).some(function (i) {\n    return i.classList.contains('edit-mode');\n  });\n}\nfunction updateListItem(itemName) {\n  var listItems = itemList.querySelectorAll('li');\n  var _iterator2 = _createForOfIteratorHelper(listItems),\n    _step2;\n  try {\n    var _loop = function _loop() {\n      var currentItem = _step2.value;\n      if (currentItem.classList.contains('edit-mode')) {\n        var id = currentItem.getAttribute('data-id');\n        var toDo = {\n          _id: id,\n          title: itemName,\n          userId: 1,\n          completed: false\n        };\n        fetch(apiUrl + id, {\n          method: 'PUT',\n          body: JSON.stringify(toDo),\n          headers: {\n            'Content-Type': 'application/json; charset=UTF-8'\n          }\n        }).then(function (res) {\n          return res.json();\n        }).then(function (json) {\n          if (json.success) {\n            currentItem.textContent = \"\";\n            currentItem.appendChild(document.createTextNode(itemName));\n            var button = createButton('red', 'circle-xmark', 'remove-item');\n            currentItem.appendChild(button);\n            turnOffEdit(currentItem);\n          }\n        })[\"finally\"](function () {\n          return hideBtnSpinner();\n        });\n        return 1; // break\n      }\n    };\n    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n      if (_loop()) break;\n    }\n  } catch (err) {\n    _iterator2.e(err);\n  } finally {\n    _iterator2.f();\n  }\n}\nfunction turnOffEdit(item) {\n  itemInput.value = \"\";\n  itemFormBtn.innerHTML = '<i class=\"fa-solid fa-plus\"></i> Add Item';\n  itemFormBtn.style.backgroundColor = '#333';\n  item.classList.remove('edit-mode');\n}\n\n// === EVENT LISTENERS ===\nwindow.addEventListener('DOMContentLoaded', setUp);\nitemForm.addEventListener('submit', function (event) {\n  event.preventDefault();\n  showBtnSpinner();\n  var inputItemValue = itemInput.value.trim();\n  if (inputItemValue !== '') {\n    if (!inEditMode()) {\n      storeListItem(inputItemValue);\n    } else {\n      updateListItem(inputItemValue);\n    }\n    itemInput.value = '';\n  }\n});\nitemList.addEventListener('click', function (event) {\n  if (event.target.tagName === 'LI') {\n    if (event.target.classList.contains('edit-mode')) {\n      turnOffEdit(event.target);\n    } else {\n      updateItem(event.target);\n    }\n  } else if (event.target.parentElement.classList.contains('remove-item')) {\n    var li = event.target.closest('li');\n    var id = li.getAttribute('data-id');\n    fetch(apiUrl + id, {\n      method: 'DELETE'\n    }).then(function (res) {\n      return res.json();\n    }).then(function (json) {\n      if (json.success) {\n        li.remove();\n      } else {\n        alert(\"Failed to delete item.\");\n      }\n    })[\"catch\"](function (err) {\n      console.error(\"Delete error:\", err);\n    });\n  }\n});\nclearBtn.addEventListener('click', function (event) {\n  var confirmClear = confirm('Are you sure you want to clear the list?');\n  if (confirmClear) {\n    fetch(apiUrl, {\n      method: 'DELETE'\n    }).then(function (res) {\n      return res.json();\n    }).then(function (json) {\n      if (json.success) {\n        itemList.innerHTML = '';\n      } else {\n        alert(\"Failed to clear items.\");\n      }\n    })[\"catch\"](function (err) {\n      console.error(\"Clear all error:\", err);\n      alert(\"Something went wrong while clearing.\");\n    });\n  }\n});\n\n// 🔍 FILTER\nfilter.addEventListener('input', function (event) {\n  var value = event.target.value.toLowerCase();\n  var listItems = document.querySelectorAll('#item-list li');\n  listItems.forEach(function (item) {\n    var _item$childNodes$2;\n    var text = (_item$childNodes$2 = item.childNodes[0]) === null || _item$childNodes$2 === void 0 || (_item$childNodes$2 = _item$childNodes$2.textContent) === null || _item$childNodes$2 === void 0 ? void 0 : _item$childNodes$2.toLowerCase();\n    if (text.includes(value)) {\n      item.style.display = '';\n    } else {\n      item.style.display = 'none';\n    }\n  });\n});\n\n//# sourceURL=webpack://client/./src/index.js?");

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