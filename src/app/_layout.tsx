import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { initializeDatabase } from "../db/database";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="language-app.db"
      onInit={initializeDatabase}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SQLiteProvider>
  )
}