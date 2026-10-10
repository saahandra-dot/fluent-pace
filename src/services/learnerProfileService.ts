import {
  type SQLiteDatabase,
} from 'expo-sqlite';

import {
  LearnerProfile,
  LearningGoal,
  ProficiencyLevel,
} from '../types/learner';

type LearnerProfileRow = {
  native_language: string;
  target_language: string;
  region: string;
  current_level: string;
  goals: string;
  contexts: string;
};

function parseStringArray(
  value: string,
): string[] {
  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

export async function saveLearnerProfile(
  db: SQLiteDatabase,
  profile: LearnerProfile,
): Promise<void> {
  const now =
    new Date().toISOString();

  await db.runAsync(
    `
    INSERT INTO learner_profile (
      id,
      native_language,
      target_language,
      region,
      current_level,
      goals,
      contexts,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

    ON CONFLICT(id) DO UPDATE SET
      native_language =
        excluded.native_language,

      target_language =
        excluded.target_language,

      region =
        excluded.region,

      current_level =
        excluded.current_level,

      goals =
        excluded.goals,

      contexts =
        excluded.contexts,

      updated_at =
        excluded.updated_at;
    `,
    [
      1,
      profile.nativeLanguage,
      profile.targetLanguage,
      profile.region,
      profile.currentLevel,
      JSON.stringify(profile.goals),
      JSON.stringify(profile.contexts),
      now,
      now,
    ],
  );
}

export async function getLearnerProfile(
  db: SQLiteDatabase,
): Promise<LearnerProfile | null> {
  const row =
    await db.getFirstAsync<LearnerProfileRow>(
      `
      SELECT
        native_language,
        target_language,
        region,
        current_level,
        goals,
        contexts
      FROM learner_profile
      WHERE id = 1;
      `,
    );

  if (!row) {
    return null;
  }

  return {
    nativeLanguage:
      row.native_language,

    targetLanguage:
      row.target_language,

    region:
      row.region,

    currentLevel:
      row.current_level as ProficiencyLevel,

    goals:
      parseStringArray(
        row.goals,
      ) as LearningGoal[],

    contexts:
      parseStringArray(
        row.contexts,
      ),
  };
}