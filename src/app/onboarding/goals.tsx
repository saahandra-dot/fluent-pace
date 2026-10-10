import {
    useLocalSearchParams,
    useRouter,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    darkColors,
    lightColors,
    radius,
    spacing,
    typography,
} from '../../constants/theme';
import { LearningGoal } from '../../types/learner';


type GoalOption = {
    value: LearningGoal;
    description: string;
};

const goalOptions: GoalOption[] = [
    {
        value: 'Everyday conversation',
        description:
            'Handle common conversations and understand people around you.',
    },
    {
        value: 'Living locally',
        description:
            'Manage shopping, services, appointments, transport, and everyday errands.',
    },
    {
        value: 'Work',
        description:
            'Communicate with colleagues, clients, and people in professional situations.',
    },
    {
        value: 'Family & parenting',
        description:
            'Use the language with family, children, teachers, and caregivers.',
    },
    {
        value: 'Travel',
        description:
            'Feel more confident at hotels, restaurants, airports, and while exploring.',
    },
    {
        value: 'Social life',
        description:
            'Make friends, join conversations, and communicate more naturally.',
    },
    {
        value: 'School & education',
        description:
            'Communicate in school, classes, courses, and learning environments.',
    },
    {
        value: 'Reading & media',
        description:
            'Understand books, articles, shows, podcasts, and other media.',
    },
];

export default function GoalsScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const {
        nativeLanguage,
        targetLanguage,
        region,
        currentLevel,
    } = useLocalSearchParams<{
        nativeLanguage?: string;
        targetLanguage?: string;
        region?: string;
        currentLevel?: string;
    }>();

    const colors =
        colorScheme === 'dark'
            ? darkColors
            : lightColors;

    const styles = createStyles(colors);

    const [selectedGoals, setSelectedGoals] =
        useState<LearningGoal[]>([]);

    function toggleGoal(goal: LearningGoal) {
        setSelectedGoals((currentGoals) => {
            const isSelected =
                currentGoals.includes(goal);

            if (isSelected) {
                return currentGoals.filter(
                    (item) => item !== goal,
                );
            }

            return [...currentGoals, goal];
        });
    }

    function handleContinue() {
        if (selectedGoals.length === 0) {
            return;
        }

        router.push({
            pathname: '/onboarding/contexts',
            params: {
                nativeLanguage,
                targetLanguage,
                region,
                currentLevel,

                // Route params are strings,
                // so temporarily serialize the array.
                goals: JSON.stringify(selectedGoals),
            },
        });
    }

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                style={
                    colorScheme === 'dark'
                        ? 'light'
                        : 'dark'
                }
            />

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={10}
                >
                    <Text style={styles.backButtonText}>
                        ‹ Back
                    </Text>
                </Pressable>

                <Text style={styles.stepText}>
                    STEP 4 OF 5
                </Text>

                <Text style={styles.title}>
                    What do you want to use {targetLanguage} for?
                </Text>

                <Text style={styles.subtitle}>
                    Choose everything that matters to you.
                    We'll use these goals to make your lessons
                    more relevant.
                </Text>

                <View style={styles.options}>
                    {goalOptions.map((goal) => {
                        const isSelected =
                            selectedGoals.includes(goal.value);

                        return (
                            <Pressable
                                key={goal.value}
                                onPress={() =>
                                    toggleGoal(goal.value)
                                }
                                accessibilityRole="checkbox"
                                accessibilityState={{
                                    checked: isSelected,
                                }}
                                style={({ pressed }) => [
                                    styles.goalCard,

                                    isSelected &&
                                    styles.goalCardSelected,

                                    pressed &&
                                    styles.goalCardPressed,
                                ]}
                            >
                                <View style={styles.goalContent}>
                                    <Text
                                        style={[
                                            styles.goalTitle,

                                            isSelected &&
                                            styles.goalTitleSelected,
                                        ]}
                                    >
                                        {goal.value}
                                    </Text>

                                    <Text
                                        style={styles.goalDescription}
                                    >
                                        {goal.description}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.checkbox,

                                        isSelected &&
                                        styles.checkboxSelected,
                                    ]}
                                >
                                    {isSelected && (
                                        <Text
                                            style={styles.checkmark}
                                        >
                                            ✓
                                        </Text>
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                <Text style={styles.selectionText}>
                    {selectedGoals.length === 0
                        ? 'Select at least one goal.'
                        : `${selectedGoals.length} ${selectedGoals.length === 1
                            ? 'goal'
                            : 'goals'
                        } selected`}
                </Text>

                <Pressable
                    disabled={selectedGoals.length === 0}
                    onPress={handleContinue}
                    style={({ pressed }) => [
                        styles.continueButton,

                        selectedGoals.length === 0 &&
                        styles.continueButtonDisabled,

                        pressed &&
                        selectedGoals.length > 0 &&
                        styles.continueButtonPressed,
                    ]}
                >
                    <Text
                        style={[
                            styles.continueButtonText,

                            selectedGoals.length === 0 &&
                            styles.continueButtonTextDisabled,
                        ]}
                    >
                        Continue
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (
    colors: typeof lightColors,
) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },

        container: {
            flexGrow: 1,
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.sm,
            paddingBottom: spacing.xl,
        },

        backButton: {
            alignSelf: 'flex-start',
            paddingVertical: spacing.sm,
            marginBottom: spacing.lg,
        },

        backButtonText: {
            ...typography.body,
            color: colors.primary,
            fontWeight: '600',
        },

        stepText: {
            ...typography.caption,
            color: colors.primary,
            fontWeight: '700',
            letterSpacing: 0.8,
            marginBottom: spacing.sm,
        },

        title: {
            ...typography.heading,
            color: colors.textPrimary,
        },

        subtitle: {
            ...typography.body,
            color: colors.textSecondary,
            marginTop: spacing.sm,
            marginBottom: spacing.xl,
        },

        options: {
            gap: spacing.sm,
        },

        goalCard: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.lg,
            padding: spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
        },

        goalCardSelected: {
            backgroundColor: colors.surfaceGreen,
            borderColor: colors.primary,
        },

        goalCardPressed: {
            opacity: 0.8,
        },

        goalContent: {
            flex: 1,
            paddingRight: spacing.md,
        },

        goalTitle: {
            ...typography.bodyStrong,
            color: colors.textPrimary,
        },

        goalTitleSelected: {
            color: colors.primaryDark,
        },

        goalDescription: {
            ...typography.caption,
            color: colors.textSecondary,
            marginTop: spacing.xs,
        },

        checkbox: {
            width: 24,
            height: 24,
            borderRadius: 7,
            borderWidth: 2,
            borderColor: colors.borderStrong,
            alignItems: 'center',
            justifyContent: 'center',
        },

        checkboxSelected: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },

        checkmark: {
            color: colors.textOnPrimary,
            fontWeight: '700',
            fontSize: 14,
        },

        selectionText: {
            ...typography.caption,
            color: colors.textMuted,
            marginTop: spacing.md,
            marginBottom: spacing.xl,
        },

        continueButton: {
            minHeight: 54,
            backgroundColor: colors.primary,
            borderRadius: radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'auto',
        },

        continueButtonDisabled: {
            backgroundColor: colors.backgroundMuted,
        },

        continueButtonPressed: {
            opacity: 0.85,
        },

        continueButtonText: {
            ...typography.bodyStrong,
            color: colors.textOnPrimary,
        },

        continueButtonTextDisabled: {
            color: colors.textMuted,
        },
    });