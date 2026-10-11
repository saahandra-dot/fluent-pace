import {
    DailyLesson,
} from '../types/lesson';

import {
    dailyLessonSchema,
} from '../schemas/lessonSchema';

export type LessonValidationResult =
    | {
        success: true;
        lesson: DailyLesson;
    }
    | {
        success: false;
        errors: string[];
    };

export function validateDailyLesson(
    data: unknown,
): LessonValidationResult {
    const result =
        dailyLessonSchema.safeParse(data);

    if (result.success) {
        return {
            success: true,
            lesson: result.data,
        };
    }

    const errors =
        result.error.issues.map(
            (issue) => {
                const path =
                    issue.path.length > 0
                        ? issue.path.join('.')
                        : 'lesson';

                return `${path}: ${issue.message}`;
            },
        );

    return {
        success: false,
        errors,
    };
}