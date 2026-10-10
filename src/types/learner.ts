export type ProficiencyLevel =
    | 'A1'
    | 'A2'
    | 'B1'
    | 'B2'
    | 'C1';

export type LearningGoal =
    | 'Everyday conversation'
    | 'Living locally'
    | 'Work'
    | 'Family & parenting'
    | 'Travel'
    | 'Social life'
    | 'School & education'
    | 'Reading & media';

export type LearnerProfile = {
    nativeLanguage: string;
    targetLanguage: string;
    region: string;
    currentLevel: ProficiencyLevel;
    goals: LearningGoal[];
    contexts: string[];
};