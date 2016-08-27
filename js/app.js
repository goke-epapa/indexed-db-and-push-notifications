'use strict';

var reg;
var sub;
var isSubscribed = false;
var subscribeButton = document.querySelector('#subscribe');
var addTodoButton = document.querySelector('#addBtn');
var todoInput = document.querySelector('#input');
var todosContainer = document.querySelector("#todos");
var dbName = "gdg-codedlab";
var dbVersion = 1;

if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function (serviceWorkerRegistration) {
        console.log(':^)', serviceWorkerRegistration);
        // TODO Assign serviceWorkerRegistration to reg variable
        // TODO Set subscribe button disabled attribute to false
        reg = serviceWorkerRegistration;
        subscribeButton.disabled = false;
    }).catch(function (err) {
        console.log(':^(', err);
    });
}
subscribeButton.addEventListener('click', function () {
    if (isSubscribed) {
        unsubscribe();
    } else {
        subscribe();
    }
});
// TODO Create subscribe function

// TODO Create unsubscribe function

var indexedDbEngine = new IndexedDBEngine(dbName, dbVersion);

function renderTodos() {
    todosContainer.innerHTML = '';
    indexedDbEngine.getAllTodos(function (todo) {
        var li = document.createElement('li');
        li.innerHTML = todo.text + ' <span data-id="' + todo.id + '" onclick="deleteTodo(this)" class="btn-link pull-right">Delete</span>';
        li.className = 'list-group-item';
        todosContainer.appendChild(li);
    });
}

function addTodo() {
    var todo = todoInput.value.trim();
    if (todo.length > 0) {
        indexedDbEngine.addTodo({
            'text': todo,
            'datetime': new Date().toISOString()
        });
        todoInput.value = '';
    }
    renderTodos();
}

function clearAll() {
    indexedDbEngine.clearAllTodos();
    renderTodos();
}

function deleteTodo() {
    var _this = event.target;
    var id = _this.dataset.id;
    indexedDbEngine.deleteTodo(id, function () {
        renderTodos();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderTodos();
    todoInput.addEventListener('keyup', function (event) {
        if(event.keyCode == 13) {
            addTodoButton.click();
        }
    });
}, false);