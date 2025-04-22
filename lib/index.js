const WebSqlPouchCore = require("pouchdb-adapter-websql-core");

const sqlitePluginStore = {
  sqlitePlugin: null,
};

/* global capacitor, sqlitePlugin, openDatabase */
function createOpenDBFunction(opts) {
  return (name, version, description, size) => {
    const sqlitePluginOpts = Object.assign({}, opts, {
      name: name,
      version: version,
      description: description,
      size: size,
    });
    if (!sqlitePluginStore.sqlitePlugin) {
      throw new Error("Capacitor Sqlite Plugin is required.");
    }
    return new sqlitePluginStore.sqlitePlugin(sqlitePluginOpts);
  };
}

function CapacitorSQLitePouch(opts, callback) {
  const websql = createOpenDBFunction(opts);
  const _opts = Object.assign(
    {
      websql: websql,
    },
    opts,
  );

  if (
    "default" in WebSqlPouchCore &&
    typeof WebSqlPouchCore.default.call === "function"
  ) {
    // @ts-ignore
    WebSqlPouchCore.default.call(this, _opts, callback);
  } else {
    // @ts-ignore
    WebSqlPouchCore.call(this, _opts, callback);
  }
}

CapacitorSQLitePouch.valid = () =>
  // if you're using Capacitor, we assume you know what you're doing because you control the environment
  true;

// no need for a prefix in capacitor (i.e. no need for `_pouch_` prefix
CapacitorSQLitePouch.use_prefix = false;

function capacitorSqlitePlugin(sqlitePlugin) {
  if (!sqlitePlugin) {
    throw new Error("Capacitor Sqlite Plugin is required.");
  }
  sqlitePluginStore.sqlitePlugin = sqlitePlugin;
  return (PouchDB) => {
    PouchDB.adapter("capacitor-sqlite", CapacitorSQLitePouch, true);
  };
}

export { capacitorSqlitePlugin };
