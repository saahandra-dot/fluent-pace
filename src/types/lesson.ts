import {
    ProficiencyLevel,
} from './learner';

export type LessonPhrase = {
    target: string;
    translation: string;
    isNew: boolean;
};

export type LessonStory = {
    title: string;
    targetText: string;
    translation: string;
};

export type ComprehensionQuestion = {
    question: string;
    expectedAnswer: string;
};

export type PersonalPrompt = {
    question: string;
};

export type LessonVocabularyItem = {
    target: string;
    translation: string;
};

export type DailyLesson = {
    lessonTitle: string;
    scenario: string;
    level: ProficiencyLevel;
    estimatedMinutes: number;
    phrases: LessonPhrase[];
    story: LessonStory;
    comprehensionQuestions: ComprehensionQuestion[];
    personalPrompt: PersonalPrompt;
    newVocabulary: LessonVocabularyItem[];
};