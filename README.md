pouchdb-adapter-capacitor-sqlite
======

PouchDB adapter using native Capacitor SQLite as its backing store. It works with any one of the following co plugins:

- [Capacitor-Sqlite-Storage](https://github.com/jpike88/capacitor-sqlite-storage)

This adapter must be passed the SQLite object from the capacitor-sqlite-storage, and then can be passed in as a plugin.

### Usage

#### Via npm/Browserify/Webpack/etc.

Install from npm:

```bash
npm install pouchdb-adapter-capacitor-sqlite
```

Then import it, notify PouchDB of the plugin, and initialize a database using the `capacitor-sqlite` adapter name:

```js
import { SQLite } from 'capacitor-sqlite-storage';
import { capacitorSqlitePlugin } from './pouchdb-adapter-capacitor-sqlite';
PouchDB.plugin(capacitorSqlitePlugin(SQLite));
var db = new PouchDB('mydb.db', {adapter: 'capacitor-sqlite'});
```

Note this requires a module bundler.

**Note that you will need to do this within the `deviceready` Capacitor event**.
