import {
    validateDailyLesson,
} from '../services/lessonValidationService';

const testLesson = {
    lessonTitle:
        'School pickup',

    scenario:
        'School pickup',

    level:
        'A2',

    estimatedMinutes:
        8,

    phrases: [
        {
            target:
                'Vengo a recoger a mi hija.',

            translation:
                "I'm here to pick up my daughter.",

            isNew:
                false,
        },
    ],

    story: {
        title:
            'Una tarde en la escuela',

        targetText:
            'Ana va a la escuela para recoger a su hija.',

        translation:
            'Ana goes to the school to pick up her daughter.',
    },

    comprehensionQuestions: [
        {
            question:
                '¿Adónde va Ana?',

            expectedAnswer:
                'A la escuela.',
        },
    ],

    personalPrompt: {
        question:
            '¿A qué hora vas normalmente a la escuela?',
    },

    newVocabulary: [
        {
            target:
                'recoger',

            translation:
                'to pick up',
        },
    ],
};

const result =
    validateDailyLesson(testLesson);

console.log(
    'Valid lesson result:',
    result,
);