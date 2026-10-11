import {
    useRouter,
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

import {
    LearnerProfile,
} from '../../types/learner';

import {
    getLearnerProfile,
} from '../../services/learnerProfileService';

export default function OnboardingCompleteScreen() {
    const colorScheme =
        useColorScheme();

    const router =
        useRouter();

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
    ] = useState<LearnerProfile | null>(
        null,
    );

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

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
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, [db]);

    function handleGoHome() {
        router.replace('/home');
    }

    if (isLoading) {
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

                <View style={styles.center}>
                    <Text
                        style={styles.loadingText}
                    >
                        Loading your profile...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!learnerProfile) {
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

                <View style={styles.center}>
                    <Text style={styles.title}>
                        Profile not found.
                    </Text>

                    <Text
                        style={styles.subtitle}
                    >
                        Complete onboarding before
                        continuing.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

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
                <View
                    style={styles.successBadge}
                >
                    <Text
                        style={styles.successText}
                    >
                        SETUP COMPLETE
                    </Text>
                </View>

                <Text style={styles.title}>
                    Your learning experience is ready.
                </Text>

                <Text
                    style={styles.subtitle}
                >
                    Your profile is saved on this
                    device and will be used to
                    personalize your learning.
                </Text>

                <View
                    style={styles.summaryCard}
                >
                    <Text style={styles.label}>
                        I SPEAK
                    </Text>

                    <Text style={styles.value}>
                        {
                            learnerProfile
                                .nativeLanguage
                        }
                    </Text>

                    <Text style={styles.label}>
                        I'M LEARNING
                    </Text>

                    <Text style={styles.value}>
                        {
                            learnerProfile
                                .targetLanguage
                        }
                    </Text>

                    <Text style={styles.label}>
                        REGIONAL PREFERENCE
                    </Text>

                    <Text style={styles.value}>
                        {learnerProfile.region}
                    </Text>

                    <Text style={styles.label}>
                        STARTING LEVEL
                    </Text>

                    <Text style={styles.value}>
                        {
                            learnerProfile
                                .currentLevel
                        }
                    </Text>

                    <Text style={styles.label}>
                        GOALS
                    </Text>

                    {learnerProfile.goals.map(
                        (goal) => (
                            <Text
                                key={goal}
                                style={styles.listItem}
                            >
                                • {goal}
                            </Text>
                        ),
                    )}

                    <Text style={styles.label}>
                        REAL-LIFE SITUATIONS
                    </Text>

                    {learnerProfile.contexts.map(
                        (context) => (
                            <Text
                                key={context}
                                style={styles.listItem}
                            >
                                • {context}
                            </Text>
                        ),
                    )}
                </View>

                <Pressable
                    onPress={handleGoHome}
                    style={({ pressed }) => [
                        styles.homeButton,

                        pressed &&
                        styles.homeButtonPressed,
                    ]}
                >
                    <Text
                        style={styles.homeButtonText}
                    >
                        Go to Home
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
            backgroundColor:
                colors.background,
        },

        container: {
            flexGrow: 1,
            padding: spacing.lg,
            paddingBottom: spacing.xl,
        },

        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.lg,
        },

        loadingText: {
            ...typography.body,
            color: colors.textSecondary,
        },

        successBadge: {
            alignSelf: 'flex-start',
            backgroundColor:
                colors.backgroundMuted,
            borderRadius: radius.xl,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            marginTop: spacing.lg,
            marginBottom: spacing.lg,
        },

        successText: {
            ...typography.caption,
            color: colors.primaryDark,
            fontWeight: '700',
            letterSpacing: 0.8,
        },

        title: {
            ...typography.heading,
            color: colors.textPrimary,
        },

        subtitle: {
            ...typography.body,
            color: colors.textSecondary,
            marginTop: spacing.sm,
        },

        summaryCard: {
            backgroundColor:
                colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius.lg,
            padding: spacing.lg,
            marginTop: spacing.xl,
        },

        label: {
            ...typography.caption,
            color: colors.textMuted,
            fontWeight: '700',
            letterSpacing: 0.7,
            marginTop: spacing.md,
        },

        value: {
            ...typography.bodyStrong,
            color: colors.textPrimary,
            marginTop: spacing.xs,
        },

        listItem: {
            ...typography.body,
            color: colors.textPrimary,
            marginTop: spacing.xs,
        },

        homeButton: {
            minHeight: 54,
            backgroundColor:
                colors.primary,
            borderRadius: radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: spacing.xl,
        },

        homeButtonPressed: {
            opacity: 0.85,
        },

        homeButtonText: {
            ...typography.bodyStrong,
            color: colors.textOnPrimary,
        },
    });