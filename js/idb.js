// Log helpers
var log = console.log.bind(console);
var error = console.error.bind(console);
var TODO_STORE = "todos";
var IndexedDBEngine = function (dbName, dbVersion) {
    // Checks if indexedDB is supported
    if (!window.indexedDB) {
        error("Oops, does not support indexedDB");
        return;
    }

    // TODO Create IndexedDB database
    // TODO Create object store
    this.dbName = dbName;
    this.dbVersion = dbVersion;
};

IndexedDBEngine.prototype.addTodo = function (todo) {
    // TODO Add coded to add todo
};

IndexedDBEngine.prototype.clearAllTodos = function (todo) {
    // TODO Add code to clear all todos
};

IndexedDBEngine.prototype.deleteTodo = function (id, callback) {
    // TODO Add code to delete todo by id
};

IndexedDBEngine.prototype.getAllTodos = function (renderTodocallback) {
    // TODO Add code to get all todos
};