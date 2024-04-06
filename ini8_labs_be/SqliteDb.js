import sqlite3 from "sqlite3";

// Connect to SQLite database
const dbName = "database.db";
const SqliteDb = new sqlite3.Database(dbName);

// Create users table if it doesn't exist
SqliteDb.serialize(() => {
  SqliteDb.run(
    "CREATE TABLE IF NOT EXISTS Registration (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,date_of_birth TEXT NOT NULL)"
  );
});

export default SqliteDb;
