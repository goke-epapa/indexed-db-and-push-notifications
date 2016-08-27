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
    var engine = indexedDB.open(dbName, dbVersion);
    engine.onupgradeneeded = function (event) {
        var db = event.target.result;
        var version = db.version;
        switch (version) {
            case 1:
                var objectStore = db.createObjectStore(TODO_STORE, {keyPath: "id", autoIncrement: true});
        }
    };
    this.dbName = dbName;
    this.dbVersion = dbVersion;
};

IndexedDBEngine.prototype.addTodo = function (todo) {
    // TODO Add coded to add todo
    var engine = indexedDB.open(dbName, dbVersion);
    engine.onsuccess = function (event) {
        var db = event.target.result;

        var transaction = db.transaction([TODO_STORE], "readwrite");
        var store = transaction.objectStore(TODO_STORE);
        var request = store.add(todo);
        request.onsuccess = function (e) {
            log('TODO inserted >> ', e.target.result);
        };
        request.error = function (e) {
            error('An error occurred');
        };
    };
    engine.onerror = function (error) {
        error('An error occured ', error);
    };
};

IndexedDBEngine.prototype.clearAllTodos = function (todo) {
    // TODO Add code to clear all todos
    var engine = indexedDB.open(dbName, dbVersion);
    engine.onsuccess = function (event) {
        var db = event.target.result;

        var transaction = db.transaction([TODO_STORE], "readwrite");
        var store = transaction.objectStore(TODO_STORE);
        var request = store.clear();
        request.onsuccess = function (e) {
            log('All todos deleted');
        };
        request.error = function (e) {
            error('An error occurred');
        };
    };
    engine.onerror = function (error) {
        error('An error occured ', error);
    };
};

IndexedDBEngine.prototype.deleteTodo = function (id, callback) {
    // TODO Add code to delete todo by id
    var engine = indexedDB.open(dbName, dbVersion);
    engine.onsuccess = function (event) {
        var db = event.target.result;

        var transaction = db.transaction([TODO_STORE], "readwrite");
        var store = transaction.objectStore(TODO_STORE);
        var request = store.delete(Number(id));
        request.onsuccess = function (e) {
            log('Todo ' + id + 'deleted');
            if (typeof callback != 'undefined') {
                callback();
            }
        };
        request.error = function (e) {
            error('An error occurred');
        };
    };
    engine.onerror = function (error) {
        error('An error occurred ', error);
    };
};

IndexedDBEngine.prototype.getAllTodos = function (renderTodocallback) {
    // TODO Add code to get all todos
    var engine = indexedDB.open(dbName, dbVersion);
    engine.onsuccess = function (event) {
        var db = event.target.result;

        var transaction = db.transaction([TODO_STORE]);
        var store = transaction.objectStore(TODO_STORE);
        store.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                // Renders todo
                log(cursor.value);
                renderTodocallback(cursor.value);
                cursor.continue();
            } else {
                log('All todos fetched');
            }
        };
    };
    engine.onerror = function (error) {
        error('An error occured ', error);
    };
};