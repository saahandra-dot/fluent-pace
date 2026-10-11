import { z } from 'zod';

import {
    DailyLesson,
} from '../types/lesson';

const proficiencyLevelSchema = z.enum([
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
]);

export const lessonPhraseSchema = z.object({
    target: z
        .string()
        .min(1),

    translation: z
        .string()
        .min(1),

    isNew: z.boolean(),
});

export const lessonStorySchema = z.object({
    title: z
        .string()
        .min(1),

    targetText: z
        .string()
        .min(1),

    translation: z
        .string()
        .min(1),
});

export const comprehensionQuestionSchema =
    z.object({
        question: z
            .string()
            .min(1),

        expectedAnswer: z
            .string()
            .min(1),
    });

export const personalPromptSchema =
    z.object({
        question: z
            .string()
            .min(1),
    });

export const lessonVocabularyItemSchema =
    z.object({
        target: z
            .string()
            .min(1),

        translation: z
            .string()
            .min(1),
    });

export const dailyLessonSchema:
    z.ZodType<DailyLesson> =
    z.object({
        lessonTitle: z
            .string()
            .min(1),

        scenario: z
            .string()
            .min(1),

        level:
            proficiencyLevelSchema,

        estimatedMinutes: z
            .number()
            .int()
            .min(1)
            .max(30),

        phrases: z
            .array(lessonPhraseSchema)
            .min(1)
            .max(5),

        story:
            lessonStorySchema,

        comprehensionQuestions: z
            .array(
                comprehensionQuestionSchema,
            )
            .min(1)
            .max(5),

        personalPrompt:
            personalPromptSchema,

        newVocabulary: z
            .array(
                lessonVocabularyItemSchema,
            )
            .max(5),
    });