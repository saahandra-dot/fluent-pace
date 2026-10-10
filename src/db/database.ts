// src/db/database.ts

import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(
    db: SQLiteDatabase,
) {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS learner_profile (
      id INTEGER PRIMARY KEY NOT NULL,
      native_language TEXT NOT NULL,
      target_language TEXT NOT NULL,
      region TEXT NOT NULL,
      current_level TEXT NOT NULL,
      goals TEXT NOT NULL,
      contexts TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

}