import {
    Redirect,
} from 'expo-router';
import {
    useSQLiteContext,
} from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import {
    useEffect,
    useState,
} from 'react';
import {
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
} from '../constants/theme';

import {
    LearnerProfile,
} from '../types/learner';

import {
    getLearnerProfile,
} from '../services/learnerProfileService';


export default function HomeScreen() {
    const colorScheme =
        useColorScheme();

    const db =
        useSQLiteContext();

    const colors =
        colorScheme === 'dark'
            ? darkColors
            : lightColors;

    const styles =
        createStyles(colors);

    const [
        learnerProfile,
        setLearnerProfile,
    ] = useState<
        LearnerProfile | null | undefined
    >(undefined);

    useEffect(() => {
        let isMounted = true;

        async function loadProfile() {
            try {
                const profile =
                    await getLearnerProfile(db);

                if (isMounted) {
                    setLearnerProfile(profile);
                }
            } catch (error) {
                console.error(
                    'Failed to load learner profile:',
                    error,
                );

                if (isMounted) {
                    setLearnerProfile(null);
                }
            }
        }

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, [db]);

    if (learnerProfile === undefined) {
        return (
            <SafeAreaView
                style={styles.screen}
            >
                <StatusBar
                    style={
                        colorScheme === 'dark'
                            ? 'light'
                            : 'dark'
                    }
                />

                <View
                    style={styles.loadingContainer}
                >
                    <Text
                        style={styles.loadingText}
                    >
                        Loading your learning space...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    if (learnerProfile === null) {
        return (
            <Redirect href="/" />
        );
    }

    const primaryContext =
        learnerProfile.contexts[0] ??
        'Everyday conversation';

    const visibleGoals =
        learnerProfile.goals.slice(
            0,
            3,
        );

    const remainingGoals =
        learnerProfile.goals.length -
        visibleGoals.length;

    const languageSummary =
        learnerProfile.region ===
            'General'
            ? `${learnerProfile.targetLanguage} · ${learnerProfile.currentLevel}`
            : `${learnerProfile.targetLanguage} · ${learnerProfile.currentLevel} · ${learnerProfile.region}`;

    return (
        <SafeAreaView
            style={styles.screen}
        >
            <StatusBar
                style={
                    colorScheme === 'dark'
                        ? 'light'
                        : 'dark'
                }
            />

            <ScrollView
                contentContainerStyle={
                    styles.container
                }
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text
                        style={styles.eyebrow}
                    >
                        WELCOME BACK
                    </Text>

                    <Text style={styles.title}>
                        What should I learn today?
                    </Text>

                    <View
                        style={styles.languageBadge}
                    >
                        <Text
                            style={
                                styles.languageBadgeText
                            }
                        >
                            {languageSummary}
                        </Text>
                    </View>
                </View>

                <View
                    style={styles.lessonCard}
                >
                    <View
                        style={
                            styles.lessonTopRow
                        }
                    >
                        <Text
                            style={styles.cardLabel}
                        >
                            TODAY'S LESSON
                        </Text>

                        <Text
                            style={styles.lessonTime}
                        >
                            5–10 min
                        </Text>
                    </View>

                    <Text
                        style={styles.lessonTitle}
                    >
                        {primaryContext}
                    </Text>

                    <Text
                        style={styles.lessonDescription}
                    >
                        Your personalized daily
                        lesson will appear here.
                    </Text>

                    <View
                        style={
                            styles.unavailableButton
                        }
                    >
                        <Text
                            style={
                                styles.unavailableButtonText
                            }
                        >
                            Start lesson
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text
                        style={styles.sectionTitle}
                    >
                        Your focus
                    </Text>

                    <Text
                        style={
                            styles.sectionDescription
                        }
                    >
                        We'll use these goals to
                        personalize what you learn.
                    </Text>

                    <View
                        style={styles.goalContainer}
                    >
                        {visibleGoals.map(
                            (goal) => (
                                <View
                                    key={goal}
                                    style={styles.goalChip}
                                >
                                    <Text
                                        style={
                                            styles.goalText
                                        }
                                    >
                                        {goal}
                                    </Text>
                                </View>
                            ),
                        )}

                        {remainingGoals > 0 && (
                            <View
                                style={
                                    styles.moreGoalChip
                                }
                            >
                                <Text
                                    style={
                                        styles.moreGoalText
                                    }
                                >
                                    +{remainingGoals} more
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text
                        style={styles.sectionTitle}
                    >
                        Continue learning
                    </Text>

                    <View
                        style={
                            styles.secondaryCard
                        }
                    >
                        <Text
                            style={styles.cardLabel}
                        >
                            REVIEW
                        </Text>

                        <Text
                            style={
                                styles.secondaryTitle
                            }
                        >
                            Vocabulary review
                        </Text>

                        <Text
                            style={
                                styles.secondaryDescription
                            }
                        >
                            Words and phrases that need
                            another look will appear here
                            as you complete lessons.
                        </Text>
                    </View>

                    <View
                        style={
                            styles.secondaryCard
                        }
                    >
                        <Text
                            style={styles.cardLabel}
                        >
                            YOUR DAY
                        </Text>

                        <Text
                            style={
                                styles.secondaryTitle
                            }
                        >
                            Tell me what happened today
                        </Text>

                        <Text
                            style={
                                styles.secondaryDescription
                            }
                        >
                            Your daily check-in will
                            eventually turn real moments
                            from your life into useful
                            language practice.
                        </Text>
                    </View>

                    <View
                        style={
                            styles.secondaryCard
                        }
                    >
                        <Text
                            style={styles.cardLabel}
                        >
                            QUICK PRACTICE
                        </Text>

                        <Text
                            style={
                                styles.secondaryTitle
                            }
                        >
                            Start a conversation
                        </Text>

                        <Text
                            style={
                                styles.secondaryDescription
                            }
                        >
                            Practice realistic scenarios
                            connected to your life and
                            learning goals.
                        </Text>
                    </View>
                </View>

                <View style={styles.contextCard}>
                    <Text
                        style={styles.cardLabel}
                    >
                        PERSONALIZATION
                    </Text>

                    <Text
                        style={styles.contextTitle}
                    >
                        Your lessons will begin with
                        situations that matter to you.
                    </Text>

                    <View
                        style={styles.contextList}
                    >
                        {learnerProfile.contexts
                            .slice(0, 4)
                            .map((context) => (
                                <Text
                                    key={context}
                                    style={
                                        styles.contextItem
                                    }
                                >
                                    • {context}
                                </Text>
                            ))}
                    </View>
                </View>
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
            backgroundColor:
                colors.background,
        },

        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.lg,
        },

        loadingText: {
            ...typography.body,
            color: colors.textSecondary,
        },

        container: {
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing.xxl,
        },

        header: {
            marginBottom: spacing.xl,
        },

        eyebrow: {
            ...typography.caption,
            color: colors.primary,
            fontWeight: '700',
            letterSpacing: 0.8,
            marginBottom: spacing.sm,
        },

        title: {
            ...typography.title,
            color: colors.textPrimary,
        },

        languageBadge: {
            alignSelf: 'flex-start',
            backgroundColor:
                colors.backgroundMuted,
            borderRadius: radius.xl,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            marginTop: spacing.md,
        },

        languageBadgeText: {
            ...typography.caption,
            color: colors.primaryDark,
            fontWeight: '600',
        },

        lessonCard: {
            backgroundColor:
                colors.surfaceGreen,
            borderWidth: 1,
            borderColor:
                colors.borderStrong,
            borderRadius: radius.xl,
            padding: spacing.lg,
        },

        lessonTopRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:
                'space-between',
        },

        cardLabel: {
            ...typography.caption,
            color: colors.primary,
            fontWeight: '700',
            letterSpacing: 0.7,
        },

        lessonTime: {
            ...typography.caption,
            color: colors.textMuted,
        },

        lessonTitle: {
            ...typography.heading,
            color: colors.textPrimary,
            marginTop: spacing.md,
        },

        lessonDescription: {
            ...typography.body,
            color: colors.textSecondary,
            marginTop: spacing.sm,
        },

        unavailableButton: {
            minHeight: 52,
            backgroundColor:
                colors.backgroundMuted,
            borderRadius: radius.md,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing.lg,
            opacity: 0.7,
        },

        unavailableButtonText: {
            ...typography.bodyStrong,
            color: colors.textMuted,
        },

        section: {
            marginTop: spacing.xl,
        },

        sectionTitle: {
            ...typography.subheading,
            color: colors.textPrimary,
        },

        sectionDescription: {
            ...typography.body,
            color: colors.textSecondary,
            marginTop: spacing.xs,
        },

        goalContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.sm,
            marginTop: spacing.md,
        },

        goalChip: {
            backgroundColor:
                colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.xl,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
        },

        goalText: {
            ...typography.caption,
            color: colors.textPrimary,
            fontWeight: '600',
        },

        moreGoalChip: {
            backgroundColor:
                colors.backgroundSoft,
            borderRadius: radius.xl,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
        },

        moreGoalText: {
            ...typography.caption,
            color: colors.textSecondary,
        },

        secondaryCard: {
            backgroundColor:
                colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.lg,
            padding: spacing.lg,
            marginTop: spacing.md,
        },

        secondaryTitle: {
            ...typography.subheading,
            color: colors.textPrimary,
            marginTop: spacing.sm,
        },

        secondaryDescription: {
            ...typography.body,
            color: colors.textSecondary,
            marginTop: spacing.sm,
        },

        contextCard: {
            backgroundColor:
                colors.backgroundSoft,
            borderRadius: radius.lg,
            padding: spacing.lg,
            marginTop: spacing.xl,
        },

        contextTitle: {
            ...typography.bodyStrong,
            color: colors.textPrimary,
            marginTop: spacing.sm,
        },

        contextList: {
            marginTop: spacing.md,
            gap: spacing.xs,
        },

        contextItem: {
            ...typography.body,
            color: colors.textSecondary,
        },
    });